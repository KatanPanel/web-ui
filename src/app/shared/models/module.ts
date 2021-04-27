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

import { interfaces } from "inversify";
import { VuexModule } from "vuex-module-decorators";
import {
	NavigationGuard,
	NavigationGuardNext,
	Route,
	RouteConfig
} from "vue-router";
import {
	cleanParameter,
	getContainer,
	getOrSetIdFromCache
} from "inversify-props";
import { lazyView } from "@/app/shared/utils/builtin";
import BindingWhenOnSyntax = interfaces.BindingWhenOnSyntax;
import FactoryCreator = interfaces.FactoryCreator;

export type Constructor<T = any> = { new (...args: any[]): T } | any;
export type Instantiable<T> = new (...args: any[]) => T;

export type KatanRouteConfig = { root?: boolean } & RouteConfig;
export type KatanRouting = KatanRouteConfig | KatanRouteConfig[] | undefined;

export abstract class KatanModule implements KatanContainer {
	protected readonly moduleName!: string;
	private readonly container!: KatanContainer;

	abstract init(): void;

	afterInit(): void {
		return;
	}

	routes(): KatanRouting {
		return undefined;
	}

	stateManagement(): Constructor<VuexModule>[] {
		return [];
	}

	dependsOn<T extends KatanModule>(): Constructor<T>[] {
		return [];
	}

	navigationGuard<T extends KatanNavigationGuard = any>(
		guard: Instantiable<T>
	): NavigationGuard {
		return (to: Route, from: Route, next: NavigationGuardNext) => {
			this.get(guard).handle(to, from, next);
		};
	}

	bind<T>(constructor: Instantiable<T>): interfaces.BindingWhenOnSyntax<T> {
		return this.container.bind(constructor);
	}

	bindAll(constructors: Instantiable<any>[]): void {
		return this.container.bindAll(constructors);
	}

	bindStoreLazy<T extends VuexModule>(
		constructor: Constructor<T>
	): interfaces.BindingWhenOnSyntax<T> {
		return this.container.bindStoreLazy(constructor);
	}

	bindFactory<T>(
		constructor: Instantiable<T>,
		factory: interfaces.FactoryCreator<T>
	): interfaces.BindingWhenOnSyntax<T> {
		return this.container.bindFactory(constructor, factory);
	}

	get<T = any>(constructor: Constructor<T>): T {
		return this.container.get(constructor);
	}

	resolve(path: string): () => Promise<any> {
		return lazyView(path, this.moduleName);
	}
}

export interface KatanContainer {
	get<T = any>(constructor: Constructor<T>): T;

	bind<T>(constructor: Instantiable<T>): BindingWhenOnSyntax<T>;

	bindAll(constructors: Instantiable<any>[]): void;

	bindStoreLazy<T extends VuexModule>(
		constructor: Constructor<T>
	): interfaces.BindingWhenOnSyntax<T>;

	bindFactory<T>(
		constructor: Instantiable<T>,
		factory: FactoryCreator<T>
	): BindingWhenOnSyntax<T>;
}

export interface KatanNavigationGuard {
	handle(to: Route, from: Route, next: NavigationGuardNext): void;
}

export function LazyInject(): PropertyDecorator {
	return (target: any, key: PropertyKey): any => {
		if (typeof key !== "string")
			throw new Error("Only string type supported");

		const id = getOrSetIdFromCache(cleanParameter(key));
		const descriptor: PropertyDescriptor = {
			get(this: any) {
				return getContainer().get(id);
			},
			enumerable: true,
			configurable: true
		};

		Object.defineProperty(target, key, descriptor);
	};
}
