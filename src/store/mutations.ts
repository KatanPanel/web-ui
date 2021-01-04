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

import { MutationTree } from "vuex";
import { Language, RootState, Window } from "@/store/state";
import Vue from "vue";
import { getWindow, LANGUAGE_CACHE_KEY } from "@/store";
import { debug } from "@/utils/log";
import { WEB_SOCKET_LOG_TAG, WINDOWS_LOG_TAG } from "@/logging";

export const ON_SOCKET_OPEN = "onSocketConnect";
export const ON_SOCKET_CLOSE = "onSocketDisconnect";
export const ON_SOCKET_ERROR = "onSocketError";
export const ON_SOCKET_MESSAGE = "onSocketMessage";
export const ON_SOCKET_LISTENER_ADD = "onSocketListenerAdd";
export const SET_LANGUAGE = "setLanguage";
export const SET_THEME = "setTheme";
export const ON_JOIN = "onJoin";
export const ON_WINDOW_OPEN = "onWindowOpen";
export const ON_WINDOW_CLOSE = "onWindowClose";
export const ON_WINDOW_REMOVE = "onWindowRemove";
export const ON_WINDOW_ROUTE_UPDATE = "onWindowRouteUpdate";
export const ON_WINDOW_TITLE_UPDATE = "onWindowTitleUpdate";
export const ON_WINDOW_VISIBILITY_UPDATE = "onWindowVisibilityUpdate";
export const ON_BACKEND_INFO_UPDATE = "onBackendInfoUpdate";

const vm: Vue = Vue.prototype;

function updateDocumentTheme(theme: string): void {
	document.querySelector("body")!.setAttribute("data-theme", theme);
}

export default {
	[ON_SOCKET_OPEN](state: RootState, event: Event) {
		const client = event.currentTarget as WebSocket;
		if (state.socket.isConnected) return;

		state.socket.native = client;
		state.socket.isConnected = true;
		vm.$consola.log({
			tag: WEB_SOCKET_LOG_TAG,
			message: "Connected successfully.",
		});

		state.socket.callListeners("connect");
	},
	[ON_SOCKET_CLOSE](state: RootState) {
		state.socket!.isConnected = false;
		state.socket.callListeners("disconnect");
	},
	[ON_SOCKET_ERROR](state: RootState, event: Event) {
		console.error(state, event);
		state.socket.callListeners("error");
	},
	[ON_SOCKET_MESSAGE](state: RootState, message) {
		/* vm.$consola.info({
			tag: WS_LOG_TAG,
			message: message,
		}); */

		state.socket.callListeners("message", message);
	},
	[ON_SOCKET_LISTENER_ADD](
		state: RootState,
		payload: { event: string; listener: Function }
	) {
		const listeners = state.socket.listeners;
		if (listeners.has(payload.event)) {
			listeners.get(payload.event)?.push(payload.listener);
			return;
		}

		listeners.set(payload.event, [payload.listener]);
	},
	[SET_LANGUAGE](state: RootState, payload: { language: Language }) {
		state.language = payload.language;
		vm.$storage.set(LANGUAGE_CACHE_KEY, payload.language.tag);
	},
	[SET_THEME](
		state: RootState,
		payload: {
			theme: string;
		}
	) {
		state.theme = payload.theme;
		updateDocumentTheme(payload.theme);
	},
	[ON_JOIN](state: RootState, payload: { serverList: any[] | null }) {
		state.serverList = payload.serverList;
	},
	[ON_WINDOW_OPEN](state: RootState, payload: { window: Window }) {
		const openWindows = state.allWindows;
		if (
			openWindows.findIndex(
				(window) => window.data.id == payload.window.data.id
			) === -1
		)
			openWindows.push(payload.window);

		payload.window.isOpen = true;
		vm.$consola.success({
			tag: WINDOWS_LOG_TAG,
			message: `Window ${payload.window.windowId} opened`,
		});
	},
	[ON_WINDOW_CLOSE](state: RootState, payload: { window: number }) {
		const window = getWindow(payload.window);
		if (!window) {
			vm.$consola.info({
				tag: WINDOWS_LOG_TAG,
				message: `Window ${payload.window} not found`,
			});
			return;
		}

		window.isOpen = false;

		/* const remaining = state.allWindows.filter(
			(window: Window) => window.isOpen
		);

		if (remaining.length === 0) router.push("/");
		else {
			const fallback = remaining[remaining.length - 1];
			if (!fallback.matchesLocation(router.currentRoute))
				router.push(fallback.getLocation());
		} */
	},
	[ON_WINDOW_REMOVE](state: RootState, payload: { windowId: number }) {
		debug(`Closing window ${payload.windowId}...`);
		/* const openWindows = state.allWindows;
		if (
			openWindows.splice(
				openWindows.findIndex(
					(window: Window) => window.windowId === payload.windowId
				)!,
				1
			).length === 0
		) {
			warn(`Couldn't delete window ${payload.windowId}.`);
			return;
		}

		const currentWindow = state.currentOpenWindow;
		if (!currentWindow) return;

		debug(`Updating current window`);
		if (currentWindow.windowId !== payload.windowId) return;

		state.currentOpenWindow = null;
		if (openWindows.length === 0) {
			debug("No windows are open, closing.");
			// router.push({ name: PANEL_ROUTE });
			return;
		}

		debug("Trying to switch from closed window.");
		router.push(openWindows[openWindows.length - 1].route, () => {
			debug("Switched from closed window.");
		}); */
	},
	[ON_WINDOW_ROUTE_UPDATE](
		state: RootState,
		payload: { window: number; route: string }
	) {
		const window = getWindow(payload.window);
		if (!window) {
			vm.$consola.info({
				tag: WINDOWS_LOG_TAG,
				message: `Window ${payload.window} not found`,
			});
			return;
		}

		window.route = payload.route;
		vm.$consola.info({
			tag: WINDOWS_LOG_TAG,
			message: `Window ${payload.window} route changed: ${payload.route}`,
		});
	},
	[ON_WINDOW_TITLE_UPDATE](
		state: RootState,
		payload: { window: number; title: string }
	) {
		const window = getWindow(payload.window);
		if (!window) {
			vm.$consola.info({
				tag: WINDOWS_LOG_TAG,
				message: `Window ${payload.window} not found`,
			});
			return;
		}

		window.title = payload.title;
		vm.$consola.info({
			tag: WINDOWS_LOG_TAG,
			message: `Window ${payload.window} title changed: ${payload.title}`,
		});
	},
	[ON_WINDOW_VISIBILITY_UPDATE](
		state: RootState,
		payload: {
			window: Window;
			isOpen: boolean;
		}
	) {
		payload.window.isOpen = payload.isOpen;
		vm.$consola.info({
			tag: WINDOWS_LOG_TAG,
			message: `Window ${payload.window.windowId} visibility changed: ${payload.isOpen}`,
		});
	},
	[ON_BACKEND_INFO_UPDATE](state: RootState, payload: any) {
		state.serverInfo = payload;
	},
} as MutationTree<RootState>;
