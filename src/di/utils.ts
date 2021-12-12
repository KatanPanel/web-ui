import { KatanModule } from ".";
import AppModule from "@/app/app.module";
import { isUndefined } from "@/app/shared/utils";
import { lazyView } from "@/app/shared/utils/builtin";
import { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import {
	RouteConfigSingleView,
	RouteConfigMultipleViews
} from "vue-router/types/router";
import { DiContainer, ModuleRouteConfig, ModuleRouteNavigationGuard } from ".";

export type Constructor<T = any> = { new (...args: any[]): T } | any;
export type Instantiable<T> = new (...args: any[]) => T;

/**
 * Remove the specified suffix from the target constructor name,
 * or "Module" if no suffix is specified, returning the constructor name in kebab-case.
 *
 * @param {Constructor} constructor The constructor instance.
 * @param {string?} [suffix=Module] The constructor name suffix.
 * @returns {string} The
 */
export function fixConstructorNaming(
	constructor: Constructor,
	suffix?: string
): string {
	let name = constructor.name;
	const moduleSuffix = name.indexOf(suffix || "Module");
	if (moduleSuffix !== -1) name = name.substr(0, moduleSuffix);

	// kebab-case
	return name.replace(
		/[A-Z]+(?![a-z])|[A-Z]/g,
		($: string, ofs: any) => (ofs ? "-" : "") + $.toLowerCase()
	);
}

/**
 * Defines a property to a object.
 *
 * @param {*} target The target object on which the property will be set.
 * @param {PropertyKey} key The property key.
 * @param {*} value The property value.
 */
export function defineProp(target: any, key: PropertyKey, value: any) {
	Object.defineProperty(target, key, {
		value,
		writable: false,
		enumerable: true,
		configurable: true
	});
}

/**
 * Transforms a ModuleRouteConfig to a RouteConfig.
 *
 * @param {ModuleRouteConfig} route The ModuleRouteConfig definitions.
 * @param {KatanModule} module The context module.
 * @returns A {@link RouteConfig} from the specified route.
 */
export function moduleRouteConfigToVueRouteConfig(
	route: ModuleRouteConfig,
	module: KatanModule | undefined
): RouteConfig {
	const value: RouteConfig = {
		path: route.path
	};

	if (route.redirect) value.redirect = route.redirect;
	if (route.name) value.name = route.name;
	if (route.meta) value.meta = route.meta;
	if (route.props) value.props = route.props;

	if (route.component) {
		const targetRootName = isUndefined(module)
			? undefined
			: module instanceof AppModule
			? undefined
			: module.moduleName;
		if (typeof route.component === "string") {
			(value as RouteConfigSingleView).component = lazyView(
				route.component,
				targetRootName
			);
		} else if (!isUndefined(route.component.name)) {
			(value as RouteConfigSingleView).component = lazyView(
				route.component.name,
				targetRootName
			);
		} else {
			const map: { [key: string]: any } = {};
			for (const key of Object.keys(route.component)) {
				map[key] = lazyView(route.component[key], targetRootName);
			}

			(value as RouteConfigMultipleViews).components = map;
		}
	}

	const beforeEnter = route.beforeEnter;
	if (!isUndefined(module) && !isUndefined(module.container) && beforeEnter) {
		value.beforeEnter = (
			to: Route,
			from: Route,
			next: NavigationGuardNext
		) => {
			module.container
				.get<ModuleRouteNavigationGuard>(beforeEnter)
				.handle(to, from, next);
		};
	}

	if (!isUndefined(route.children) && route.children.length > 0) {
		const children = [];
		for (const child of route.children)
			children.push(moduleRouteConfigToVueRouteConfig(child, module));

		value.children = children;
	}

	return value;
}
