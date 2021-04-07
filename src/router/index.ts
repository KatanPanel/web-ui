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
import VueRouter, { NavigationGuardNext, Route, RouteRecord } from "vue-router";
import { loadLanguage } from "@/i18n";
import Server from "@/views/server/Server.vue";
import { ROOT_MODULE } from "@/store";
import {
	getOpenWindows,
	MinimizedWindowState,
	safeResolveWindow,
	updateWindowLocation,
	updateWindowState,
	Window,
} from "@/common/navigation/window";
import { commit } from "@/utils/vuex";
import { getClientSettings } from "@/common/client-settings";
import { isUndefined } from "@/utils/any";
import { UPDATE_NAVIGATION_HISTORY } from "@/store/mutations";
import routes from "@/router/routes";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
	const lang = getClientSettings().language?.tag || navigator.language;

	loadLanguage(lang, navigator.languages).then(() => {
		const isServerRoute =
			to.matched.findIndex(
				(route: RouteRecord) => route.components["default"] === Server
			) !== -1;

		const openWindows = getOpenWindows();
		if (isServerRoute) {
			if (to.params.serverId === from.params.serverId) {
				updateWindowLocation(
					openWindows.find(
						(window: Window) =>
							window.data.id === parseInt(from.params.serverId)
					)!,
					to
				);
				return next();
			} else {
				if (openWindows.length == 0)
					return next(() =>
						safeResolveWindow(to.params.serverId, to)
					);
				else {
					return safeResolveWindow(to.params.serverId, to).then(() =>
						next()
					);
				}
			}
		}

		// ensure that all windows are no longer visible when exiting the server route.
		for (const window of openWindows)
			updateWindowState(window, MinimizedWindowState);

		return next();
	});
});

router.afterEach((to: Route) => {
	// don't handle unknown routes
	if (isUndefined(to.name)) return;

	commit(ROOT_MODULE, UPDATE_NAVIGATION_HISTORY, { to });
});

export default router;
