import { KatanModule } from ".";
import Vue from "vue";
import { ModuleContainerModuleProp } from "./module";
import {
	Constructor,
	defineProp,
	fixConstructorNaming,
	Instantiable
} from "@/di/utils";
import { ModuleMetadataKey, ModuleNameProp, ModuleOptions } from "@/di/module";
import { isUndefined } from "@/app/shared/utils";
import { DiContainer } from "@/di";
import KatanRouter from "@/router";
import { Store } from "vuex";
import AppModule from "@/app/app.module";
import { createContainerModule } from "./container-factory";

const LoadedModules: { [name: string]: KatanModule } = {};

export function isModuleLoaded(moduleName: string): boolean {
	return !isUndefined(LoadedModules[moduleName]);
}

export function loadModule(
	container: DiContainer,
	module: Constructor,
	store: Store<any>,
	router: KatanRouter
): KatanModule {
	if (!Reflect.hasMetadata(ModuleMetadataKey, module))
		throw new Error(
			`${module.name} is not a module (metadata key not found)`
		);

	const moduleName = fixConstructorNaming(module);
	if (isModuleLoaded(moduleName))
		throw new Error(
			`Module ${moduleName} already loaded (cannot be loaded twice)`
		);

	const options: ModuleOptions =
		Reflect.getMetadata(ModuleMetadataKey, module) || {};

	// all dependencies must be loaded before the module
	const dependencies = options.children || [];
	if (!isUndefined(dependencies)) {
		for (const dependency of dependencies) {
			loadModule(container, dependency, store, router);
		}
	}

	const moduleInstance: KatanModule = new module();
	defineProp(moduleInstance, ModuleNameProp, moduleName);

	// container setup
	const baseContainer = container.container;
	const containerModule = createContainerModule(
		baseContainer,
		store,
		router,
		options,
		moduleInstance
	);
	defineProp(moduleInstance, ModuleContainerModuleProp, containerModule);

	// apply module directives to Vue, globally
	const directives = options.directives;
	if (!isUndefined(directives)) {
		for (const id of Object.keys(directives))
			Vue.directive(id, directives[id]);
	}

	baseContainer.load(containerModule);

	// add the newly loaded module to list of loaded modules
	LoadedModules[moduleName] = moduleInstance;
	return moduleInstance;
}

export function loadAllModules(
	container: DiContainer,
	store: Store<any>,
	router: KatanRouter,
	autoLoad?: Constructor[]
): void {
	// load the root module first
	const root = loadModule(container, AppModule, store, router);
	let modules = [];

	if (isUndefined(autoLoad)) {
		// accepts *.module.(ts|js) pattern
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

	// then load other modules
	for (const module of modules) {
		loadModule(container, module, store, router);
	}

	root.afterInit();

	// run all other modules (except AppModule) after init handlers
	for (const key of Object.keys(LoadedModules)) {
		const module = LoadedModules[key];

		// ignore AppModule, it's the root, already initialized
		if (module instanceof AppModule) continue;
		if (module.afterInit) module.afterInit();
	}
}
