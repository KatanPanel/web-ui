import { KatanModule } from ".";
import Vue from "vue";
import { ModuleContainerModuleProp, ModuleLoggerProp } from "./module";
import { Constructor, defineProp, fixConstructorNaming } from "@/di/utils";
import { ModuleMetadataKey, ModuleNameProp, ModuleOptions } from "@/di/module";
import { isUndefined } from "@/app/shared/utils";
import KatanRouter from "@/app/app.router";
import { Store } from "vuex";
import AppModule from "@/app/app.module";
import { configureRouter, createContainerModule } from "./container-factory";
import { LogLevel, default as ConsolaInstance } from "consola";
import { Container } from "inversify";

const PreLoadedModules: { [name: string]: KatanModule } = {};
const LoadedModules: { [name: string]: KatanModule } = {};
let Router: KatanRouter | undefined = undefined;

export function isModuleLoaded(moduleName: string): boolean {
	return !isUndefined(LoadedModules[moduleName]);
}

export function preloadModule(module: Constructor, router: KatanRouter): void {
	if (!Reflect.hasMetadata(ModuleMetadataKey, module))
		throw new Error(
			`${module.name} is not a module (metadata key not found)`
		);

	const moduleName = fixConstructorNaming(module);
	const options: ModuleOptions =
		Reflect.getMetadata(ModuleMetadataKey, module) || {};

	const moduleInstance: KatanModule = new module();
	defineProp(moduleInstance, ModuleNameProp, moduleName);
	defineProp(
		moduleInstance,
		ModuleLoggerProp,
		ConsolaInstance.create({
			level:
				process.env.NODE_ENV !== "production"
					? LogLevel.Debug
					: LogLevel.Info
		}).withTag(moduleName)
	);
	configureRouter(router, options.router, moduleInstance);
	PreLoadedModules[moduleName] = moduleInstance;
}

export function loadModule(
	root: Container,
	module: Constructor,
	store: Store<any>,
	router: KatanRouter | undefined
): KatanModule {
	if (isUndefined(Router) && isUndefined(router))
		throw new Error("Both global and parameter router is undefined");
	else if (!isUndefined(router)) Router = router;
	else router = Router!;

	if (!Reflect.hasMetadata(ModuleMetadataKey, module))
		throw new Error(
			`${module.name} is not a module (metadata key not found)`
		);

	const moduleName = fixConstructorNaming(module);

	// already loaded, just return the loaded module instance
	if (isModuleLoaded(moduleName)) return LoadedModules[moduleName];

	const options: ModuleOptions =
		Reflect.getMetadata(ModuleMetadataKey, module) || {};

	// if it is the root module it must inject the dependencies into the root container so that they are available globally
	let scopedContainer =
		module.name === AppModule.name ? root : root.createChild();

	const startTime = performance.now();
	const preLoaded = !isUndefined(PreLoadedModules[moduleName]);
	let moduleInstance: KatanModule;
	if (!preLoaded) {
		moduleInstance = new module();
		defineProp(moduleInstance, ModuleNameProp, moduleName);
		defineProp(
			moduleInstance,
			ModuleLoggerProp,
			ConsolaInstance.create({
				level:
					process.env.NODE_ENV !== "production"
						? LogLevel.Debug
						: LogLevel.Info
			}).withTag(moduleName)
		);
	} else {
		moduleInstance = PreLoadedModules[moduleName];
		delete PreLoadedModules[moduleName];
	}

	// add imports to context
	const imports = options.imports;
	if (!isUndefined(imports)) {
		for (const import0 of imports) {
			// ensure imported module is loaded
			const importedModule = loadModule(root, import0, store, router);

			moduleInstance.logger.debug(
				`now depends on "${importedModule.moduleName}" module`
			);
			scopedContainer = importedModule.container.container.createChild();
		}
	}

	// load childs before the module
	const childs = options.children;
	if (!isUndefined(childs)) {
		for (const child of childs) {
			loadModule(scopedContainer.createChild(), child, store, router);
		}
	}

	// container module setup
	const containerModule = createContainerModule(
		scopedContainer,
		store,
		router,
		options,
		moduleInstance,
		preLoaded
	);
	defineProp(moduleInstance, ModuleContainerModuleProp, containerModule);

	// apply module directives to Vue, globally
	const directives = options.directives;
	if (!isUndefined(directives)) {
		for (const id of Object.keys(directives))
			Vue.directive(id, directives[id]);
	}

	scopedContainer.load(containerModule);

	// add the newly loaded module to list of loaded modules
	LoadedModules[moduleName] = moduleInstance;

	const endTime = performance.now();
	moduleInstance.logger.debug(
		"loaded took",
		Math.round((endTime - startTime + Number.EPSILON) * 100) / 100 + "ms"
	);
	return moduleInstance;
}

export function loadAllModules(
	container: Container,
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
	} else modules = autoLoad;

	// then load other modules
	for (const module of modules) {
		preloadModule(module, router);
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
