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
import Plugins from "@/views/plugins/Plugins.vue";
import { AuthenticatedOnlyGuard } from "@/guards/authenticated-only";
import Nodes from "@/views/nodes/Nodes.vue";
import Settings from "@/views/settings/Settings.vue";
import ServerConsole from "@/views/server/ServerConsole.vue";
import ServerInfo from "@/views/server/ServerInfo.vue";
import ServerFS from "@/views/server/ServerFS.vue";
import {
	closeWindow,
	getOpenWindows,
	LANGUAGE_CACHE_KEY,
	resolveWindowWithFastPath,
	updateWindowRoute,
	updateWindowVisibility,
} from "@/store";
import { Window } from "@/store/state";
import { verifyAuth } from "@/store/auth";
import Auth from "@/views/Auth.vue";

export const HOME_ROUTE = "home";
export const LOGIN_ROUTE = "login";
export const PANEL_ROUTE = "panel";
export const PANEL_ACCOUNT_ROUTE = "panel.account";
export const PANEL_SERVER_ROUTE = "panel.server";
export const PANEL_SERVER_CONSOLE_ROUTE = "panel.server.console";
export const PANEL_SERVER_FS_ROUTE = "panel.server.fs";
export const PANEL_PLUGINS_ROUTE = "panel.plugins";
export const PANEL_NODES_ROUTE = "panel.nodes";
export const PANEL_SETTINGS_ROUTE = "panel.settings";

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
				name: PANEL_ROUTE,
				component: Home,
			},
			{
				path: "account",
				name: PANEL_ACCOUNT_ROUTE,
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
						name: PANEL_SERVER_ROUTE,
					},
					{
						path: "console",
						name: PANEL_SERVER_CONSOLE_ROUTE,
						component: ServerConsole,
					},
					{
						path: "fs",
						name: PANEL_SERVER_FS_ROUTE,
						component: ServerFS,
					},
				],
			},
			{
				path: "plugins",
				name: PANEL_PLUGINS_ROUTE,
				component: Plugins,
			},
			{
				path: "nodes",
				name: PANEL_NODES_ROUTE,
				component: Nodes,
			},
			{
				path: "settings",
				name: PANEL_SETTINGS_ROUTE,
				component: Settings,
			},
		],
	},
];

VueRouter.prototype.redirect = function (to: string) {
	// avoid arrow-function to be able to use explicit `this`
	window.location.href = this.resolve({ name: to }).href;
};

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

		vm.$consola.debug("Matched", to.matched);
		vm.$consola.debug("Server route?", isServerRoute);
		if (isServerRoute) {
			const openWindows = getOpenWindows();
			if (to.params.serverId === from.params.serverId) {
				const window = openWindows.find(
					(window: Window) =>
						window.data.id === parseInt(from.params.serverId)
				)!;

				updateWindowRoute(window.windowId, to.name as string);
				return next();
			} else {
				if (openWindows.length == 0)
					return next(() =>
						resolveWindowWithFastPath(
							to.params.serverId,
							to.name as string
						)
					);
				else
					return resolveWindowWithFastPath(
						to.params.serverId,
						to.name as string
					).then(() => next());
			}
		}

		// ensure that all windows are no longer visible when exiting the server route.
		for (const window of getOpenWindows())
			updateWindowVisibility(window, false);

		return next();
	});
});

export default router;
