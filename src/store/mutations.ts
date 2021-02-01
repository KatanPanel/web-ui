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
import { Language, RootState } from "@/store/state";
import Vue from "vue";
import { LANGUAGE_CACHE_KEY } from "@/store";
import {
	ROUTER_NAVIGATION_LOG_TAG,
	WEB_SOCKET_LOG_TAG,
	WINDOWS_LOG_TAG,
} from "@/logging";
import {
	getWindow,
	getWindows,
	MinimizedWindowState,
	OpenWindowState,
	updateWindow,
	updateWindowState,
	Window,
} from "@/common/navigation/window";
import { Route } from "vue-router";

export const ON_SOCKET_OPEN = "onSocketConnect";
export const ON_SOCKET_CLOSE = "onSocketDisconnect";
export const ON_SOCKET_ERROR = "onSocketError";
export const ON_SOCKET_MESSAGE = "onSocketMessage";
export const ON_SOCKET_LISTENER_ADD = "onSocketListenerAdd";
export const SET_LANGUAGE = "setLanguage";
export const SET_THEME = "setTheme";
export const OPEN_WINDOW = "openWindow";
export const MINIMIZE_WINDOW = "minimizeWIndow";
export const UPDATE_WINDOW = "updateWindow";
export const UPDATE_BACKEND_INFO = "updateBackendInfo";
export const UPDATE_NAVIGATION_HISTORY = "updateNavigationHistory";

const vm: Vue = Vue.prototype;

function catchWindowNotFound(window: any): void {
	vm.$consola.info({
		tag: WINDOWS_LOG_TAG,
		message: `Window ${window} not found`,
	});
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
		console.log("message:", message);
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
		document
			.querySelector("body")!
			.setAttribute("data-theme", payload.theme);
	},
	[OPEN_WINDOW](state: RootState, payload: { window: Window }) {
		const openWindows = state.allWindows;
		if (
			openWindows.findIndex(
				(window) => window.data.id == payload.window.data.id
			) === -1
		)
			openWindows.push(payload.window);

		updateWindowState(payload.window, OpenWindowState);
		vm.$consola.success({
			tag: WINDOWS_LOG_TAG,
			message: `Window ${payload.window.id} opened`,
		});
	},
	[MINIMIZE_WINDOW](state: RootState, payload: { window?: number }) {
		if (!payload || !payload.window) {
			for (const window of getWindows())
				updateWindowState(window, MinimizedWindowState);
			return;
		}

		const window = getWindow(payload.window);
		if (!window) return catchWindowNotFound(payload.window);

		updateWindowState(window, MinimizedWindowState);

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
	[UPDATE_WINDOW](
		state: RootState,
		payload: { window: Window; payload: any }
	) {
		Object.assign(payload.window, payload.payload);
		vm.$consola.info({
			tag: WINDOWS_LOG_TAG,
			message: `Window "${payload.window.name}" updated.`,
			args: [payload.payload],
		});
	},
	[UPDATE_BACKEND_INFO](state: RootState, payload: any) {
		state.serverInfo = payload;
	},
	[UPDATE_NAVIGATION_HISTORY](state: RootState, { to }: { to: Route }) {
		const history = state.navigationHistory;

		// page reload
		if (history.length > 0 && history[history.length - 1].name == to.name) {
			history.pop();
			history.push(to);
			vm.$consola.info({
				message: "[~] Route page reloaded.",
				tag: ROUTER_NAVIGATION_LOG_TAG,
				args: [to],
			});
			return;
		}

		// page update (previous)
		if (history.length > 1 && history[history.length - 2].name == to.name) {
			vm.$consola.info({
				message: "[<] Route switched to previous page.",
				tag: ROUTER_NAVIGATION_LOG_TAG,
				args: [to],
			});
			history.pop();
			return;
		}

		// page update (next)
		history.push(to);
		vm.$consola.info({
			message: "[>] Route switched to next page.",
			tag: ROUTER_NAVIGATION_LOG_TAG,
			args: [to],
		});
	},
} as MutationTree<RootState>;
