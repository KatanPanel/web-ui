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
import state, { RootState } from "@/store/state";
import { dispatch, get } from "@/utils/vuex";
import getters, { GET_SOCKET } from "@/store/getters";
import actions, { LOAD_SERVER } from "@/store/actions";
import mutations from "@/store/mutations";
import { RawWebSocket } from "@/common/websocket/websocket";
import auth from "@/store/modules/auth";

Vue.use(Vuex);

export const ROOT_MODULE = "";
export const AUTH_MODULE = "auth";

export const CLIENT_SETTINGS_CACHE_KEY = "client-settings";

export function getWebSocket(): RawWebSocket {
	return get(ROOT_MODULE, GET_SOCKET);
}

export async function loadServer(serverId: string): Promise<any> {
	return dispatch(ROOT_MODULE, LOAD_SERVER, { serverId });
}

export default new Vuex.Store<RootState>({
	actions,
	mutations,
	state,
	getters,
	modules: {
		[AUTH_MODULE]: auth,
	},
	strict: process.env.NODE_ENV !== "production",
});
