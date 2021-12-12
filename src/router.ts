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

import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import { lazyInject } from "@/di";
import Vue from "vue";
import { I18nService } from "@/app/shared/services/i18n.service";

Vue.use(VueRouter);

export default class KatanRouter {
	public readonly routes: RouteConfig[] = [];

	@lazyInject() private readonly i18nService!: I18nService;

	constructor(private readonly router: VueRouter) {}

	public setup(): void {
		this.router.beforeEach(
			(to: Route, from: Route, next: NavigationGuardNext) => {
				this.beforeEach(to, from, next);
			}
		);
		this.router.addRoutes(this.routes);
	}

	private beforeEach(
		to: Route,
		from: Route,
		next: NavigationGuardNext
	): void {
		this.i18nService
			.loadLanguage(navigator.language.toLowerCase(), navigator.languages)
			.then(() => {
				// const isServerRoute = false;
				// to.matched.findIndex(
				// 	(route: RouteRecord) =>
				// 		route.components["default"] === Server
				// ) !== -1;
				// const serverIdValue = parseInt(from.params.serverId);
				// const openWindows = this.appNavigationStore.getOpenWindows;
				// if (isServerRoute) {
				// const dataFactory = async () => await
				// this.serversService.findServer(serverIdValue);
				// 	const dataFactory = async () => undefined;
				// 	if (to.params.serverId === from.params.serverId) {
				// 		const window = this.appNavigationStore.getWindowByData(
				// 			serverIdValue
				// 		) as Window;
				// 		this.appNavigationStore.updateWindow(window.id, {
				// 			location: routeToLocation(to)
				// 		});
				// 		return next();
				// 	} else {
				// 		if (openWindows.length == 0)
				// 			return next(() =>
				// 				this.appNavigationStore.resolveWindowThenUpdate(
				// 					to.params.serverId,
				// 					to,
				// 					dataFactory
				// 				)
				// 			);
				// 		else {
				// 			return this.appNavigationStore
				// 				.resolveWindowThenUpdate(
				// 					to.params.serverId,
				// 					to,
				// 					dataFactory
				// 				)
				// 				.then(() => next());
				// 		}
				// 	}
				// }
				// ensure that all windows are no longer visible when exiting the server route.
				// for (const window of openWindows) {
				// 	this.appNavigationStore.updateWindow(window.id, {
				// 		state: MinimizedWindowState
				// 	});
				// }
			})
			.finally(() => next());
	}
}
