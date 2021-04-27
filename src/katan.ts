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
	Container,
	generateIdAndAddToCache,
	generateIdNameOfDependency,
	getOrSetIdFromCache,
	setContainer
} from "inversify-props";
import { I18nService } from "@/app/shared/services/i18n";
import KatanRouter from "@/router";
import {
	KatanContainer,
	KatanModule,
	KatanRouteConfig
} from "@/app/shared/models/module";
import { decorate, injectable, interfaces } from "inversify";
import VueI18n from "vue-i18n";
import VueRouter, { RouteConfig } from "vue-router";
import { Constructor } from "inversify-props/dist/lib/inversify.types";
import { isUndefined } from "@/app/shared/utils/any";
import AppModule from "@/app/app.module";
import { getModule, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import Newable = interfaces.Newable;

Vue.use(VueRouter);

function decorateCatchable(
	decorator: ClassDecorator | ParameterDecorator | MethodDecorator,
	constructor: any
): void {
	try {
		decorate(decorator, constructor);
	} catch (e) {
		if (
			e.message !== "Cannot apply @injectable decorator multiple times."
		) {
			throw e;
		}
	}
}

function buildContainerPrototype(source: Container): KatanContainer {
	return {
		bind<T>(constructor: Newable<T>): interfaces.BindingWhenOnSyntax<T> {
			const id = generateIdAndAddToCache(constructor);
			decorateCatchable(injectable(), constructor);

			console.log("[bind]", id);
			return source.bind<T>(id).to(constructor).inSingletonScope();
		},
		bindAll(constructors: Newable<any>[]): void {
			for (const constructor of constructors) {
				this.bind(constructor);
			}
		},
		bindFactory<T>(
			constructor: Newable<T>,
			factory: interfaces.FactoryCreator<T>
		): interfaces.BindingWhenOnSyntax<T> {
			const id = generateIdAndAddToCache(constructor);
			decorateCatchable(injectable(), constructor);

			return source.bind<T>(id).toFactory(factory);
		},
		bindStoreLazy<T extends VuexModule>(
			constructor: Constructor<T>
		): interfaces.BindingWhenOnSyntax<T> {
			const id = generateIdAndAddToCache(constructor);
			decorateCatchable(injectable(), constructor);

			console.log("[store inject]", id);
			return source
				.bind<T>(id)
				.toDynamicValue(() => getModule(constructor, store))
				.inSingletonScope();
		},
		get<T>(constructor: Constructor<T>): T {
			return source.get(
				getOrSetIdFromCache(generateIdNameOfDependency(constructor))
			);
		}
	};
}

const loadedModules: string[] = [];

function loadModule<T extends KatanModule>(
	scope: KatanContainer,
	module: KatanModule,
	router: KatanRouter
): void {
	let name = module.constructor.name;
	const moduleSuffix = name.indexOf("Module");
	if (moduleSuffix !== -1) {
		name = name.substr(0, moduleSuffix);
	}

	name = name.toLowerCase();

	console.log("[module] loading module", name);
	if (loadedModules.includes(name)) {
		console.warn(`Module ${name} already loaded.`);
		return;
	}

	const depends = module.dependsOn();
	if (depends.length !== 0) {
		for (const depend of depends) loadModule(scope, depend, router);
	}

	if (!(module instanceof AppModule)) {
		Object.defineProperty(module, "moduleName", {
			value: name,
			writable: false,
			enumerable: true,
			configurable: true
		});
	}

	Object.defineProperty(module, "container", {
		value: scope,
		writable: false,
		enumerable: true,
		configurable: true
	});

	for (const state of module.stateManagement()) scope.bindStoreLazy(state);

	module.init();

	const routes = module.routes();
	if (!isUndefined(routes)) {
		const rootConfig = router.routes.find(
			(config) => config.path === "/"
		) as RouteConfig;

		if (!isUndefined(rootConfig) && isUndefined(rootConfig.children))
			rootConfig.children = [];

		if (Array.isArray(routes)) {
			const arr = routes as KatanRouteConfig[];
			for (const conf of arr) {
				if (!conf.root) rootConfig.children.push(conf);
				else router.routes.push(conf);
			}
		} else {
			const conf = routes as KatanRouteConfig;
			if (!conf.root) rootConfig.children.push(conf);
			else router.routes.push(conf);
		}
	}

	loadedModules.push(name);
}

function loadModules(scope: KatanContainer, router: KatanRouter): void {
	const ctx = require.context(
		"@/app",
		true,
		/(?!app)^.*\.module.ts$/,
		"sync"
	);
	const modules = ctx
		.keys()
		.map((name: string) => {
			return new (ctx(name).default)() as KatanModule;
		})
		.filter((module) => !(module instanceof AppModule));

	// load root moduel first
	const root = new AppModule();
	loadModule(scope, root, router);

	// then other modules
	for (const module of modules) loadModule(scope, module, router);

	root.afterInit();
	for (const module of modules) module.afterInit();
}

function createApp(): { i18n: VueI18n; router: VueRouter } {
	const container = setContainer({
		autoBindInjectable: false,
		skipBaseClassChecks: true,
		defaultScope: "Singleton"
	});

	const scope = buildContainerPrototype(container);
	const router = new KatanRouter();
	loadModules(scope, router);

	return {
		i18n: scope.get<I18nService>(I18nService).getI18n(),
		router: router.createRouter()
	};
}

export default createApp;
