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

import { NavigationGuardNext, RedirectOption, Route } from "vue-router";
import { Constructor } from "@/ioc/utils";
import { DirectiveFunction, DirectiveOptions } from "vue/types/options";
import { VuexModule } from "vuex-module-decorators";
import { RoutePropsFunction } from "vue-router/types/router";

export type KatanRouteConfig = {
	path: string;
	name?: string;
	root?: boolean;
	beforeEnter?: Constructor<KatanNavigationGuard>;
	component?:
		| {
				[name: string]: string;
		  }
		| string;
	redirect?: RedirectOption;
	children?: KatanRouteConfig[];
	props?: boolean | Record<string, any> | RoutePropsFunction;
	meta?: any;
};

export type KatanDirectives = {
	[id: string]: DirectiveOptions | DirectiveFunction;
};

export type KatanRouting = KatanRouteConfig | KatanRouteConfig[] | undefined;

export interface KatanNavigationGuard {
	handle(to: Route, from: Route, next: NavigationGuardNext): void;
}

export interface KatanStore {
	module: Constructor<VuexModule>;
	children?: Constructor<VuexModule>[];
}
