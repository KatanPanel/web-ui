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
import VueRouter, {
	NavigationGuardNext,
	Route,
	RouteConfig,
	RouteRecord,
} from "vue-router";
import Panel from "@/views/Panel.vue";
import { loadLanguage } from "@/i18n";
import { Dictionary } from "vue-router/types/router";
import { LOGIN_LAYOUT, PANEL_LAYOUT } from "@/layouts";
import Home from "@/views/Home.vue";
import Account from "@/views/account/Account.vue";
import Server from "@/views/server/Server.vue";
import { AuthenticatedOnlyGuard } from "@/common/internal/guards/authenticated-only";
import ServerConsole from "@/views/server/ServerConsole.vue";
import ServerInfo from "@/views/server/ServerInfo.vue";
import ServerFS from "@/views/server/ServerFS.vue";
import { verifyAuth } from "@/store/auth";
import Auth from "@/views/Auth.vue";
import ServerFSDisk from "@/views/server/fs/ServerFSDisk.vue";
import { LANGUAGE_CACHE_KEY, ROOT_MODULE } from "@/store";
import {
	getOpenWindows,
	MinimizedWindowState,
	safeResolveWindow,
	updateWindowLocation,
	updateWindowState,
	Window,
} from "@/common/navigation/window";
import { dispatch } from "@/common/utils/vuex";
import { RECORD_NAVIGATION } from "@/store/actions";
import { ROUTER_NAVIGATION_LOG_TAG } from "@/logging";

export const HOME_ROUTE = "home";
export const LOGIN_ROUTE = "login";
export const MY_ACCOUNT_ROUTE = "my-account";
export const SERVER_ROUTE = "server";
export const SERVER_CONSOLE_ROUTE = "server.console";
export const SERVER_FS_ROUTE = "server.fs";
export const SERVER_FS_DISK_ROUTE = "server.fs.disk";
export const SYSTEM_GAMES_ROUTE = "system.games";
export const ADVANCED_SETTINGS_ROUTE = "advanced.settings";

Vue.use(VueRouter);

const vm: Vue = Vue.prototype;
const routes: Array<RouteConfig> = [
	{
		path: "/login",
		name: LOGIN_ROUTE,
		component: Auth,
		meta: { layout: LOGIN_LAYOUT },
		beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
			return verifyAuth().finally(() => next());
		},
	},
	{
		path: "/",
		component: Panel,
		meta: { layout: PANEL_LAYOUT },
		beforeEnter: AuthenticatedOnlyGuard,
		children: [
			{
				path: "",
				name: HOME_ROUTE,
				component: Home,
			},
			{
				path: "account",
				name: MY_ACCOUNT_ROUTE,
				component: Account,
			},
			{
				path: "server/:serverId",
				component: Server,
				props: true,
				children: [
					{
						path: "",
						component: ServerInfo,
						name: SERVER_ROUTE,
					},
					{
						path: "console",
						name: SERVER_CONSOLE_ROUTE,
						component: ServerConsole,
					},
					{
						path: "fs",
						name: SERVER_FS_ROUTE,
						component: ServerFS,
						children: [
							{
								path: "disk/:disk",
								name: SERVER_FS_DISK_ROUTE,
								component: ServerFSDisk,
							},
						],
					},
				],
			},
			{
				path: "system/games",
				name: SYSTEM_GAMES_ROUTE,
				component: () => import("@/views/system/SystemGames.vue"),
			},
			{
				path: "advanced/settings",
				name: ADVANCED_SETTINGS_ROUTE,
				component: () =>
					import("@/views/advanced/AdvancedSettings.vue"),
			},
		],
	},
	{
		path: "*",
		component: Home,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
	loadLanguage(
		vm.$storage.get(LANGUAGE_CACHE_KEY) ||
			(to.query as Dictionary<string>).lang ||
			navigator.language,
		navigator.languages
	).then(() => {
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

router.afterEach((to: Route, from: Route) => {
	dispatch(ROOT_MODULE, RECORD_NAVIGATION, { to }).then(() => {
		vm.$log.debug({
			message: "Route switch.",
			tag: ROUTER_NAVIGATION_LOG_TAG,
			args: [from, to],
		});
	});
});

export default router;
