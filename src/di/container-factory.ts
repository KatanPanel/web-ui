import { isUndefined } from "@/app/shared/utils";
import KatanRouter from "@/app/app.router";
import { Container, interfaces, ContainerModule } from "inversify";
import { Store } from "vuex";
import { VuexModule } from "vuex-module-decorators";
import {
	DiContainer,
	ModuleState,
	Constructor,
	ModuleRouting,
	KatanModule,
	ModuleRouteConfig,
	moduleRouteConfigToVueRouteConfig,
	defineProp,
	ModuleContainerProp,
	DefaultDiContainer,
	ModuleOptions
} from ".";
import { RouteConfig } from "vue-router";

/**
 * @private
 */
function hookStateManagement(
	container: DiContainer,
	state: ModuleState | undefined
) {
	if (isUndefined(state)) return;

	if (Array.isArray(state)) {
		for (const store of state) container.bindStoreLazy(store);
	} else {
		const module = state.module;
		if (isUndefined(module)) {
			container.bindStoreLazy(state);
			return;
		}

		const children: Constructor<VuexModule>[] | undefined = state.children;
		if (isUndefined(children)) return;

		for (const child of children) {
			container.bindStoreLazy(child, module);
		}
	}
}

function applyRouteMetaModule(route: RouteConfig, module: Constructor): void {
	if (isUndefined(route.meta)) route.meta = {};
	route.meta.module = module;

	if (!isUndefined(route.children)) {
		for (const children of route.children) {
			applyRouteMetaModule(children, module);
		}
	}
}

/**
 * @private
 */
export function configureRouter(
	router: KatanRouter,
	routing: ModuleRouting | undefined,
	module: KatanModule
) {
	if (isUndefined(routing)) return;

	const root = router.routes.find((config) => config.path === "/");
	const current = router.router.currentRoute;

	const resolveRoute: (route: ModuleRouteConfig) => void = (route) => {
		const resolved = moduleRouteConfigToVueRouteConfig(route, module);
		applyRouteMetaModule(resolved, module.constructor);

		if (
			(!isUndefined(route.root) &&
				typeof route.root === "boolean" &&
				route.root) ||
			isUndefined(root)
		) {
			router.routes.push(resolved);
			if (module.logger)
				module.logger.debug(`route "${resolved.path}" registered`);
		} else {
			root.children?.push(resolved);
			if (module.logger)
				module.logger.debug(`route "${resolved.path}" added to root`);
		}
	};

	if (Array.isArray(routing)) {
		for (const route of routing) resolveRoute(route);
	} else resolveRoute(routing);
}

export function createContainer(
	container: Container,
	module: KatanModule,
	store: Store<any>
): DiContainer {
	return new DefaultDiContainer(
		container,
		module,
		container.bind,
		container.rebind,
		store
	);
}

export function createContainerModule(
	base: Container,
	store: Store<any>,
	router: KatanRouter,
	options: ModuleOptions,
	module: KatanModule,
	preLoaded: boolean
): ContainerModule {
	return new ContainerModule(
		(
			bind: interfaces.Bind,
			_unbind: interfaces.Unbind,
			_isBound: interfaces.IsBound,
			rebind: interfaces.Rebind
		) => {
			const container = new DefaultDiContainer(
				base,
				module,
				bind,
				rebind,
				store
			);

			// inject services into module context
			const services = options.services;
			if (!isUndefined(services)) container.bindAll(services);

			hookStateManagement(container, options.stateManagement);
			if (!preLoaded) configureRouter(router, options.router, module);

			defineProp(module, ModuleContainerProp, container);
			if (!isUndefined(module.init)) module.init();
		}
	);
}
