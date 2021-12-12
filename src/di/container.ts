import { KatanModule } from ".";
import { fixConstructorNaming, Instantiable } from "@/di/utils";
import { Constructor } from "inversify-props/dist/lib/inversify.types";
import { Container, interfaces } from "inversify";
import { Store } from "vuex";
import { getModule, VuexModule } from "vuex-module-decorators";
import {
	addIdToCache,
	generateIdAndAddToCache,
	generateIdNameOfDependency,
	getOrSetIdFromCache
} from "inversify-props";

export interface DiContainer {
	readonly container: Container;

	get<T>(constructor: Constructor<T>): T;

	bind<T>(constructor: Constructor<T>): interfaces.BindingWhenOnSyntax<T>;

	bindValue<T>(constructor: Constructor<T> | symbol, value: T): void;

	bindAll(constructors: Constructor[]): void;

	bindStoreLazy<T extends VuexModule>(
		constructor: Constructor<T>,
		root?: Constructor<T>
	): interfaces.BindingWhenOnSyntax<T>;

	bindDynamic<T>(
		constructor: Constructor<T> | symbol,
		value: (context: interfaces.Context) => T
	): interfaces.BindingWhenOnSyntax<T>;

	bindFactory<T>(
		constructor: Instantiable<T>,
		factory: interfaces.FactoryCreator<T>
	): interfaces.BindingWhenOnSyntax<T>;
}

/**
 * @private
 */
export class DefaultDiContainer implements DiContainer {
	constructor(
		readonly container: Container,
		private readonly module: KatanModule,
		private readonly _bind: interfaces.Bind,
		private readonly _rebind: interfaces.Rebind,
		private readonly store: Store<any>
	) {}

	get<T>(constructor: Constructor<T>): T {
		const name = generateIdNameOfDependency(constructor);
		const identifier = getOrSetIdFromCache(name);
		if (!this.container.isBound(identifier)) {
			const error = new Error(
				`Could not find instance for dependency "${name}" in "${this.module.moduleName}" module context, it must be exported as a service of the module or its imports`
			);
			this.module.logger.error(error);
			throw error;
		}

		return this.container.get(identifier);
	}

	bind<T>(constructor: Constructor<T>): interfaces.BindingWhenOnSyntax<T> {
		this.module.logger.debug(`[service] injected "${constructor.name}"`);
		return this._bind<T>(generateIdAndAddToCache(constructor))
			.to(constructor)
			.inSingletonScope();
	}

	bindValue<T>(constructor: Constructor<T> | symbol, value: T): void {
		this._bind(
			typeof constructor === "symbol"
				? addIdToCache(constructor, constructor.toString())
				: generateIdAndAddToCache(constructor)
		).toConstantValue(value);
	}

	bindAll(constructors: Constructor[]): void {
		for (const constructor of constructors) this.bind(constructor);
	}

	bindStoreLazy<T extends VuexModule>(
		constructor: Constructor<T>,
		root?: Constructor<T>
	): interfaces.BindingWhenOnSyntax<T> {
		this.module.logger.debug(
			`[store] injected "${constructor._vmdModuleName}"`
		);
		const id = generateIdAndAddToCache(constructor);

		return this._bind<T>(id)
			.toDynamicValue(() => {
				if (root) {
					const rootPath = root._vmdModuleName.split("/");
					if (!this.store.hasModule(rootPath)) {
						this.store.registerModule(rootPath, root);
						this.bindValue(root, getModule(root, this.store));
					}
				}

				const path = constructor._vmdModuleName.split("/");
				this.store.registerModule(path, constructor);
				const value = getModule(constructor, this.store);
				this._rebind(id).toConstantValue(value);
				return value as T;
			})
			.inSingletonScope();
	}

	bindDynamic<T>(
		constructor: Constructor<T> | symbol,
		value: (context: interfaces.Context) => T
	): interfaces.BindingWhenOnSyntax<T> {
		if (typeof constructor === "symbol") {
			const name = constructor.toString();
			return this._bind<T>(
				addIdToCache(constructor, name)
			).toDynamicValue(value);
		} else {
			return this._bind<T>(
				generateIdAndAddToCache(constructor)
			).toDynamicValue(value);
		}
	}

	bindFactory<T>(
		constructor: Instantiable<T>,
		factory: interfaces.FactoryCreator<T>
	): interfaces.BindingWhenOnSyntax<T> {
		return this._bind<T>(generateIdAndAddToCache(constructor)).toFactory(
			factory
		);
	}
}
