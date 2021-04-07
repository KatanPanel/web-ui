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

import {MutationTree} from "vuex";
import {RootState} from "@/store/state";
import Vue from "vue";
import {CLIENT_SETTINGS_CACHE_KEY} from "@/store";
import {
	ROUTER_NAVIGATION_LOG_TAG,
	VUEX_LOG_TAG,
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
import {Route} from "vue-router";
import {
	WEBSOCKET_CLOSE,
	WEBSOCKET_ERROR,
	WEBSOCKET_MESSAGE,
	WEBSOCKET_OPEN,
} from "@/common/websocket/websocket";
import {INVALID_OP} from "@/common/websocket/operation-codes";
import {ClientSettings, DARK_THEME, LIGHT_THEME,} from "@/common/client-settings";
import {isUndefined} from "@/utils/any";

/* start: vue raw web socket */
export const ON_SOCKET_OPEN = "onSocketConnect";
export const ON_SOCKET_CLOSE = "onSocketDisconnect";
export const ON_SOCKET_ERROR = "onSocketError";
export const ON_SOCKET_MESSAGE = "onSocketMessage";
/* end: vue raw web socket */

export const UPDATE_CLIENT_SETTINGS = "updateClientSettings";
export const SAVE_CLIENT_SETTINGS = "saveClientSettings";

export const SET_LANGUAGE = "setLanguage";
export const SET_THEME = "setTheme";
export const OPEN_WINDOW = "openWindow";
export const MINIMIZE_WINDOW = "minimizeWIndow";
export const UPDATE_WINDOW = "updateWindow";
export const UPDATE_BACKEND_INFO = "updateBackendInfo";
export const UPDATE_NAVIGATION_HISTORY = "updateNavigationHistory";
export const UPDATE_SERVER_LIST = "updateServerList";

const vm: Vue = Vue.prototype;

function catchWindowNotFound(window: any): void {
	vm.$log.info({
		tag: WINDOWS_LOG_TAG,
		message: `Window ${window} not found`,
	});
}

export default {
	/**
	 * Updates the client settings.
	 * @param {RootState} state
	 * @param payload
	 */
	[UPDATE_CLIENT_SETTINGS](
		state: RootState,
		payload: {
			clientSettings: Partial<ClientSettings>;
			applyChanges: boolean;
		}
	): void {
		if (!isUndefined(payload.clientSettings.theme)) {
			// set to machine default
			if (payload.clientSettings.theme == null) {
				document
					.querySelector("body")!
					.setAttribute(
						"data-theme",
						window.matchMedia &&
							window.matchMedia("(prefers-color-scheme: dark)")
								.matches
							? DARK_THEME
							: LIGHT_THEME
					);
			} else if (
				state.clientSettings.theme !== payload.clientSettings.theme
			) {
				document
					.querySelector("body")!
					.setAttribute(
						"data-theme",
						payload.clientSettings.theme as string
					);
			}
		}

		if (payload.applyChanges) {
			state.clientSettings = Object.assign(
				state.clientSettings,
				payload.clientSettings
			);

			vm.$log.log({
				tag: VUEX_LOG_TAG,
				message: "Client settings updated.",
				args: [payload.clientSettings],
			});
		}
	},
	[SAVE_CLIENT_SETTINGS](state: RootState): void {
		vm.$storage.set(CLIENT_SETTINGS_CACHE_KEY, state.clientSettings);
	},
	[ON_SOCKET_OPEN](state: RootState, event: Event) {
		state.socket.native = event.currentTarget as WebSocket;
		vm.$log.log({
			tag: WEB_SOCKET_LOG_TAG,
			message: "Connected successfully.",
		});

		state.socket.on(INVALID_OP, (message: any) => {
			vm.$log.error({
				tag: WEB_SOCKET_LOG_TAG,
				message: "Invalid operation code",
				args: [message.code],
			});
		});

		state.socket.call(WEBSOCKET_OPEN);
	},
	[ON_SOCKET_CLOSE](state: RootState) {
		state.socket.call(WEBSOCKET_CLOSE);
	},
	[ON_SOCKET_ERROR](state: RootState) {
		state.socket.call(WEBSOCKET_ERROR);
	},
	[ON_SOCKET_MESSAGE](state: RootState, message) {
		state.socket.call(WEBSOCKET_MESSAGE, message);
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
		vm.$log.success({
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
	},
	[UPDATE_WINDOW](
		state: RootState,
		payload: { window: Window; payload: any }
	) {
		Object.assign(payload.window, payload.payload);
		vm.$log.info({
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
			vm.$log.info({
				message: "[~] Route page reloaded.",
				tag: ROUTER_NAVIGATION_LOG_TAG,
				args: [to],
			});
			return;
		}

		// page update (previous)
		if (history.length > 1 && history[history.length - 2].name == to.name) {
			vm.$log.info({
				message: "[<] Route switched to previous page.",
				tag: ROUTER_NAVIGATION_LOG_TAG,
				args: [to],
			});
			history.pop();
			return;
		}

		// page update (next)
		history.push(to);
		vm.$log.info({
			message: "[>] Route switched to next page.",
			tag: ROUTER_NAVIGATION_LOG_TAG,
			args: [to],
		});
	},
	[UPDATE_SERVER_LIST](state: RootState, payload: { serverList: any[] }) {
		state.serverList = payload.serverList;
	},
} as MutationTree<RootState>;
