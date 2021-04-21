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

import { ActionContext, ActionTree } from "vuex";
import { RootState } from "@/store/state";
import { UPDATE_SERVER_LIST } from "@/store/mutations";
import { vm } from "@/main";

export const LOAD_SERVER = "loadServer";
export const LOAD_SERVER_LIST = "loadServerList";

export default {
	async [LOAD_SERVER](
		ctx: ActionContext<RootState, RootState>,
		payload: { serverId: string }
	): Promise<any> {
		return vm.$api.servers.getServer(payload.serverId);
	},
	async [LOAD_SERVER_LIST](
		ctx: ActionContext<RootState, RootState>
	): Promise<any[]> {
		return vm.$api.servers.getAllServers().then((serverList) => {
			ctx.commit(UPDATE_SERVER_LIST, { serverList });
			return serverList;
		});
	},
} as ActionTree<RootState, RootState>;
