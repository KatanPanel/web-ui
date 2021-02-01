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
import { Language, RootState } from "@/store/state";
import {
	SET_LANGUAGE,
	SET_THEME,
	UPDATE_NAVIGATION_HISTORY,
} from "@/store/mutations";
import { AxiosError, AxiosResponse } from "axios";
import Vue from "vue";
import { Route } from "vue-router";

export const UPDATE_THEME = "updateTheme";
export const UPDATE_LANGUAGE = "updateLanguage";
export const LOAD_SERVER = "loadServer";
export const RECORD_NAVIGATION = "recordNavigation";

const vm: Vue = Vue.prototype;

export default {
	/**
	 * Send an HTTP request to the server requesting information
	 * from the server with the id specified by the {@param payload}.
	 * @param {ActionContext} ctx
	 * @param payload
	 */
	async [LOAD_SERVER](
		ctx: ActionContext<RootState, RootState>,
		payload: { serverId: string }
	): Promise<any> {
		return vm
			.$http({
				url: `/servers/${payload.serverId}`,
				method: "get",
				withCredentials: true,
			})
			.then((res: AxiosResponse) => {
				return res.data.data.server;
			})
			.catch((err: AxiosError) => {
				console.log(err.response);
				throw err;
			});
	},
	[UPDATE_THEME](
		ctx: ActionContext<RootState, RootState>,
		payload: {
			theme: string;
		}
	): void {
		ctx.commit(SET_THEME, { theme: payload.theme });
	},
	[UPDATE_LANGUAGE](
		ctx: ActionContext<RootState, RootState>,
		payload: {
			language: Language;
		}
	): void {
		ctx.commit(SET_LANGUAGE, { language: payload.language });
	},
	[RECORD_NAVIGATION](
		ctx: ActionContext<RootState, RootState>,
		payload: {
			to: Route;
		}
	): void {
		ctx.commit(UPDATE_NAVIGATION_HISTORY, { to: payload.to });
	},
} as ActionTree<RootState, RootState>;
