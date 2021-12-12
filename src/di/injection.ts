import {
	cleanParameter,
	getContainer,
	getOrSetIdFromCache
} from "inversify-props";
import { loadModule } from "./module-loader";
import Vue from "vue";
import { isUndefined } from "@/app/shared/utils";
import { ModuleContainerProp, ModuleNameProp } from "./module";

export function lazyInject(): PropertyDecorator {
	return (target: any, key: PropertyKey): any => {
		if (typeof key !== "string")
			throw new Error('Only "string" is supported');

		const typeName = Reflect.getMetadata("design:type", target, key).name;
		const parameter = cleanParameter(typeName);
		const id = getOrSetIdFromCache(parameter);

		Object.defineProperty(target, key, {
			get(this: any) {
				const lazyInjected = this["__lazy_injected_" + parameter];
				if (!isUndefined(lazyInjected)) return lazyInjected;

				if (isUndefined(this.$route.meta.module)) {
					console.error(
						"Unable to retrieve module",
						target,
						key,
						parameter
					);
					return undefined;
				}

				// ensure module is loaded
				const contextModule = loadModule(
					getContainer(),
					this.$route.meta.module,
					this.$store,
					undefined
				);
				const value = contextModule[ModuleContainerProp].getById(id);

				Object.defineProperty(this, "__lazy_injected_" + parameter, {
					value,
					enumerable: true,
					configurable: true,
					writable: false
				});

				return value;
			},
			enumerable: true,
			configurable: true
		});
	};
}
