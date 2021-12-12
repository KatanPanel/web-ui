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

/**
 * @private
 */
function configureRouter(
	router: KatanRouter,
	routing: ModuleRouting | undefined,
	module: KatanModule
) {
	if (isUndefined(routing)) return;

	const root = router.routes.find((config) => config.path === "/");
	const resolveRoute: (route: ModuleRouteConfig) => void = (route) => {
		const resolved = moduleRouteConfigToVueRouteConfig(route, module);
		if (route.root || isUndefined(root)) router.routes.push(resolved);
		else root.children?.push(resolved);
	};

	if (Array.isArray(routing)) {
		for (const route of routing) resolveRoute(route);
	} else resolveRoute(routing);
}

export function createContainer(
	container: Container,
	store: Store<any>
): DiContainer {
	return new DefaultDiContainer(
		container,
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
	module: KatanModule
): ContainerModule {
	return new ContainerModule(
		(
			bind: interfaces.Bind,
			_unbind: interfaces.Unbind,
			_isBound: interfaces.IsBound,
			rebind: interfaces.Rebind
		) => {
			const container = new DefaultDiContainer(base, bind, rebind, store);
			hookStateManagement(container, options.stateManagement);
			configureRouter(router, options.router, module);

			defineProp(module, ModuleContainerProp, container);
			if (!isUndefined(module.init)) module.init();
		}
	);
}
