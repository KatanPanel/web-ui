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

import { GetterTree } from "vuex";
import { RootState } from "@/store/state";
import { Window } from "@/common/navigation/window";
import { Route } from "vue-router";
import { RawWebSocket } from "@/common/websocket/websocket";
import { ClientSettings } from "@/common/client-settings";

export const GET_SOCKET = "getSocket";
export const GET_BACKEND_INFO = "getBackendInfo";
export const GET_WINDOW = "getWindow";
export const GET_ALL_WINDOWS = "getAllWindows";
export const GET_NAVIGATION_HISTORY = "getNavigationHistory";
export const GET_SERVER_LIST = "getServerList";
export const GET_CLIENT_SETTINGS = "getClientSettings";

export default {
	[GET_SOCKET](state: RootState): RawWebSocket {
		return state.socket!;
	},
	[GET_BACKEND_INFO](state: RootState): any | null {
		return state.serverInfo;
	},
	[GET_ALL_WINDOWS](state: RootState): Array<Window> {
		return state.allWindows;
	},
	[GET_WINDOW](state: RootState): (windowId: number) => Window | null {
		return (windowId: number) => {
			return (
				state.allWindows.find(
					(window: Window) => window.id === windowId
				) || null
			);
		};
	},
	[GET_NAVIGATION_HISTORY](state: RootState): Array<Route> {
		return state.navigationHistory;
	},
	[GET_SERVER_LIST](state: RootState): any[] {
		return state.serverList;
	},
	[GET_CLIENT_SETTINGS](state: RootState): ClientSettings {
		return state.clientSettings;
	},
} as GetterTree<RootState, RootState>;
