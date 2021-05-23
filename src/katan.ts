/*
 * Copyright (c) 2020-present Katan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import Vue from "vue";
import {
	addIdToCache,
	generateIdAndAddToCache,
	generateIdNameOfDependency,
	getOrSetIdFromCache,
	setContainer
} from "inversify-props";
import KatanRouter from "@/router";
import {
	Instantiable,
	KatanContainer,
	KatanModule,
	KatanNavigationGuard,
	KatanRouteConfig,
	ModuleMetadataKey,
	ModuleOptions
} from "@/ioc";
import { Container, ContainerModule, interfaces } from "inversify";
import { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import { Constructor } from "inversify-props/dist/lib/inversify.types";
import { isUndefined } from "@/app/shared/utils/any";
import AppModule from "@/app/app.module";
import { getModule, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { lazyView } from "@/app/shared/utils/builtin";
import {
	RouteConfigMultipleViews,
	RouteConfigSingleView
} from "vue-router/types/router";

const loadedModules: { [name: string]: KatanModule } = {};

function buildContainerPrototype(
	container: Container,
	bind: interfaces.Bind,
	rebind: interfaces.Rebind
): KatanContainer {
	return {
		container,
		bind<T>(
			constructor: Constructor<T>
		): interfaces.BindingWhenOnSyntax<T> {
			return bind<T>(generateIdAndAddToCache(constructor))
				.to(constructor)
				.inSingletonScope();
		},
		bindAll(constructors: Constructor[]): void {
			for (const constructor of constructors) {
				this.bind(constructor);
			}
		},
		bindValue<T>(constructor: Constructor<T> | symbol, value: T) {
			bind(
				typeof constructor === "symbol"
					? addIdToCache(constructor, constructor.toString())
					: generateIdAndAddToCache(constructor)
			).toConstantValue(value);
		},
		bindFactory<T>(
			constructor: Constructor<T>,
			factory: interfaces.FactoryCreator<T>
		): interfaces.BindingWhenOnSyntax<T> {
			return bind<T>(generateIdAndAddToCache(constructor)).toFactory(
				factory
			);
		},
		bindDynamic<T>(
			constructor: Constructor<T> | symbol,
			value: (context: interfaces.Context) => T
		): interfaces.BindingWhenOnSyntax<T> {
			if (typeof constructor === "symbol") {
				const name = constructor.toString();
				return bind<T>(addIdToCache(constructor, name)).toDynamicValue(
					value
				);
			} else {
				return bind<T>(
					generateIdAndAddToCache(constructor)
				).toDynamicValue(value);
			}
		},
		bindStoreLazy<T extends VuexModule>(
			constructor: Constructor<T>,
			root?: Constructor<T>
		): interfaces.BindingWhenOnSyntax<T> {
			const id = generateIdAndAddToCache(constructor);

			return bind<T>(id)
				.toDynamicValue(() => {
					if (root) {
						const rpath = root._vmdModuleName.split("/");
						if (!store.hasModule(rpath)) {
							store.registerModule(rpath, root);
							this.bindValue(root, getModule(root, store));
						}
					}

					const path = constructor._vmdModuleName.split("/");
					store.registerModule(path, constructor);
					const value = getModule(constructor, store);
					rebind(id).toConstantValue(value);
					return value as T;
				})
				.inSingletonScope();
		},
		get<T>(constructor: Constructor<T>): T {
			return this.container.get(
				getOrSetIdFromCache(generateIdNameOfDependency(constructor))
			);
		}
	};
}

function fixNaming(constructor: Constructor, suffix?: string): string {
	let name = constructor.name;
	const moduleSuffix = name.indexOf(suffix || "Module");
	if (moduleSuffix !== -1) name = name.substr(0, moduleSuffix);

	// kebab-case
	return name.replace(
		/[A-Z]+(?![a-z])|[A-Z]/g,
		($: string, ofs: any) => (ofs ? "-" : "") + $.toLowerCase()
	);
}

function define(obj: any, key: PropertyKey, value: any) {
	Object.defineProperty(obj, key, {
		value,
		writable: false,
		enumerable: true,
		configurable: true
	});
}

function loadModule(
	container: KatanContainer,
	module: Instantiable<any>,
	router: KatanRouter
): any {
	if (!Reflect.hasMetadata(ModuleMetadataKey, module))
		throw new Error(`${module.name} is not a Module`);

	const moduleName = fixNaming(module);
	if (!isUndefined(loadedModules[moduleName]))
		throw new Error(`Module ${moduleName} already loaded`);

	const options: ModuleOptions =
		Reflect.getMetadata(ModuleMetadataKey, module) || {};

	const depends = options.children;
	if (!isUndefined(depends)) {
		for (const depend of depends) loadModule(container, depend, router);
	}

	const instance = new module();
	define(instance, "moduleName", moduleName);

	const containerModule = new ContainerModule(
		(
			bind: interfaces.Bind,
			unbind: interfaces.Unbind,
			isBound: interfaces.IsBound,
			rebind: interfaces.Rebind
		) => {
			const proto = buildContainerPrototype(
				container.container,
				bind,
				rebind
			);
			const services = options.services;
			if (!isUndefined(services)) proto.bindAll(services);

			const state = options.stateManagement;
			if (!isUndefined(state)) {
				if (Array.isArray(state)) {
					for (const store of state) proto.bindStoreLazy(store);
				} else {
					const module = state.module;
					if (module) {
						const children: Constructor<VuexModule>[] | undefined =
							state.children;
						if (children) {
							for (const child of children) {
								proto.bindStoreLazy(child, module);
							}
						}
					} else proto.bindStoreLazy(state);
				}
			}

			const routes = options.router;
			if (!isUndefined(routes)) {
				const root = router.routes.find(
					(config) => config.path === "/"
				);

				const routeToVue: (route: KatanRouteConfig) => RouteConfig = (
					route
				) => {
					const value: RouteConfig = {
						path: route.path
					};

					if (route.redirect) value.redirect = route.redirect;
					if (route.name) value.name = route.name;
					if (route.meta) value.meta = route.meta;

					if (route.component) {
						if (typeof route.component === "string") {
							(value as RouteConfigSingleView).component = lazyView(
								route.component,
								instance instanceof AppModule
									? undefined
									: moduleName
							);
						} else {
							const map: { [key: string]: any } = {};
							for (const key of Object.keys(route.component)) {
								map[key] = lazyView(
									route.component[key],
									instance instanceof AppModule
										? undefined
										: moduleName
								);
							}

							(value as RouteConfigMultipleViews).components = map;
						}
					}

					const beforeEnter = route.beforeEnter;
					if (beforeEnter) {
						value.beforeEnter = (
							to: Route,
							from: Route,
							next: NavigationGuardNext
						) => {
							proto
								.get<KatanNavigationGuard>(beforeEnter)
								.handle(to, from, next);
						};
					}

					if (
						!isUndefined(route.children) &&
						route.children.length > 0
					) {
						const children = [];
						for (const child of route.children)
							children.push(routeToVue(child));

						value.children = children;
					}
					return value;
				};

				const resolveRoute: (route: KatanRouteConfig) => void = (
					route
				) => {
					const resolved = routeToVue(route);
					if (route.root || isUndefined(root))
						router.routes.push(resolved);
					else root.children?.push(resolved);
				};

				if (Array.isArray(routes)) {
					for (const route of routes) resolveRoute(route);
				} else resolveRoute(routes);
			}

			define(instance, "container", proto);
			if (instance.init) instance.init();
		}
	);

	define(instance, "containerModule", containerModule);
	const directives = options.directives;
	if (!isUndefined(directives)) {
		for (const id of Object.keys(directives))
			Vue.directive(id, directives[id]);
	}

	container.container.load(containerModule);
	loadedModules[moduleName] = instance;
	return instance;
}

function loadModules(
	container: KatanContainer,
	router: KatanRouter,
	autoLoad?: Constructor[]
): void {
	// load root module first
	const root = loadModule(container, AppModule, router);
	let modules = [];

	if (isUndefined(autoLoad)) {
		const ctx = require.context(
			"@/app",
			true,
			/(?!app)^.*\.module.(ts|js)$/m,
			"sync"
		);
		modules = ctx
			.keys()
			.filter((name: string) => {
				return name !== "./app.module.ts";
			})
			.map((name: string) => {
				return ctx(name).default;
			});
	}

	// then other modules
	for (const module of modules) {
		loadModule(container, module, router);
	}

	root.afterInit();
	for (const key of Object.keys(loadedModules)) {
		const module = loadedModules[key];
		if (module instanceof AppModule) continue;

		if (module.afterInit) module.afterInit();
	}
}

function createApp(vm: Vue, onLoad: () => void): void {
	const container = setContainer({
		autoBindInjectable: false,
		skipBaseClassChecks: true,
		defaultScope: "Singleton"
	});

	container.bind(generateIdAndAddToCache(Vue)).toConstantValue(vm);
	const proto = buildContainerPrototype(
		container,
		container.bind,
		container.rebind
	);

	const router = new KatanRouter(vm.$router);
	loadModules(proto, router, undefined);
	router.setup();
	onLoad();
}

export default createApp;
