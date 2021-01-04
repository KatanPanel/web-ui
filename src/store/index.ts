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
import Vuex from "vuex";
import AuthModule from "@/store/auth";
import state, { RootState, RootWebSocketState, Window } from "@/store/state";
import { commit, dispatch, get } from "@/utils/vuex";
import getters, {
	GET_ALL_WINDOWS,
	GET_PANEL_SERVER_LIST,
	GET_SOCKET,
} from "@/store/getters";
import { Location, Route } from "vue-router";
import { debug } from "@/utils/log";
import actions, { LOAD_SERVER } from "@/store/actions";
import mutations, {
	ON_WINDOW_CLOSE,
	ON_WINDOW_OPEN,
	ON_WINDOW_ROUTE_UPDATE,
	ON_WINDOW_TITLE_UPDATE,
	ON_WINDOW_VISIBILITY_UPDATE,
} from "@/store/mutations";
import router from "@/router";

Vue.use(Vuex);

export const ROOT_MODULE = "";
export const AUTH_MODULE = "auth";

export const LANGUAGE_CACHE_KEY = "language";
export const THEME_CACHE_KEY = "theme";

const vm: Vue = Vue.prototype;

export function getWebSocket(): RootWebSocketState {
	return get(ROOT_MODULE, GET_SOCKET);
}

export function getServerList(): Array<any> {
	return get<any[]>(ROOT_MODULE, GET_PANEL_SERVER_LIST);
}

export async function loadServer(serverId: string): Promise<any> {
	return dispatch(ROOT_MODULE, LOAD_SERVER, { serverId });
}

export function listWindows(): Array<Window> {
	return get<Window[]>(ROOT_MODULE, GET_ALL_WINDOWS);
}

/**
 * Returns all open windows in natural order.
 */
export function getOpenWindows(): Array<Window> {
	return get<Window[]>(ROOT_MODULE, GET_ALL_WINDOWS)?.filter(
		(window: Window) => window.isOpen
	);
}

export function getWindow(window: number): Window | null {
	return (
		get<Window[]>(ROOT_MODULE, GET_ALL_WINDOWS).find(
			(value: Window) => value.windowId === window
		) || null
	);
}

export function createWindow(
	others: Array<Window>,
	server: any,
	route: string
): Window {
	return {
		windowId: others.length + 1,
		windowName: server.name,
		data: server,
		route,
		title: "",
		tasks: [],
		isOpen: false,
		getLocation(): Location {
			return {
				name: this.route,
				params: {
					serverId: this.data.id,
				},
			};
		},
		matchesLocation(route: Route) {
			return (
				route.name === this.route &&
				parseInt(route.params.serverId) === this.data.id
			);
		},
	};
}

export function openWindow(window: Window): void {
	commit(ROOT_MODULE, ON_WINDOW_OPEN, { window });
}

export function closeWindow(window: number): void {
	commit(ROOT_MODULE, ON_WINDOW_CLOSE, { window });
}

export function updateWindowRoute(window: number, route: string): void {
	commit(ROOT_MODULE, ON_WINDOW_ROUTE_UPDATE, { window, route });
}

export function updateWindowTitle(window: number, title: string): void {
	commit(ROOT_MODULE, ON_WINDOW_TITLE_UPDATE, { window, title });
}

export function updateWindowVisibility(window: Window, isOpen: boolean): void {
	commit(ROOT_MODULE, ON_WINDOW_VISIBILITY_UPDATE, { window, isOpen });
}

export async function resolveWindow(
	serverId: string,
	route: string
): Promise<Window> {
	const allWindows: Array<Window> = get(ROOT_MODULE, GET_ALL_WINDOWS);

	const resolvedWindow: Window | undefined = allWindows.find(
		(window: Window) => window.data.id === parseInt(serverId)
	);

	if (resolvedWindow) {
		// for some reason are you trying to access a route other than
		// a window that is already active from the outside, maybe a bug?
		if (
			router.currentRoute.name !== resolvedWindow.route &&
			route !== resolvedWindow.route
		) {
			router.push(resolvedWindow.getLocation()).then(() => {
				updateWindowVisibility(resolvedWindow, true);
			});
			return resolvedWindow;
		}

		updateWindowVisibility(resolvedWindow, true);
		return resolvedWindow;
	}

	const server = await loadServer(serverId);
	const window = createWindow(allWindows, server, route);

	openWindow(window);
	return window;
}

export async function resolveWindowWithFastPath(
	serverId: string,
	route: string
): Promise<Window> {
	const window = await resolveWindow(serverId, route);

	if (window.route != route) {
		// fast path
		updateWindowRoute(window.windowId, route);
	}

	return window;
}

export default new Vuex.Store<RootState>({
	actions,
	mutations,
	state,
	getters,
	modules: {
		[AUTH_MODULE]: AuthModule,
	},
	strict: process.env.NODE_ENV !== "production",
});
