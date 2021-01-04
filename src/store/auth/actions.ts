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
import { AuthState } from "@/store/auth/state";
import { AxiosError, AxiosResponse } from "axios";
import {
	ADD_STORED_ACCOUNT,
	UPDATE_ACCOUNT,
	UPDATE_TOKEN,
} from "@/store/auth/mutations";
import { AUTH_LOG_TAG } from "@/logging";
import { vm } from "@/main";
import { AUTH_TOKEN_KEY } from "@/store/auth/index";

export const AUTH_LOGIN = "login";
export const AUTH_VERIFY = "verify";
export const AUTH_LOGOUT = "logout";

export default {
	[AUTH_LOGIN](
		ctx: ActionContext<AuthState, never>,
		payload: {
			username: string;
			password: string;
		}
	): Promise<{ token: string }> {
		vm.$consola.info({
			tag: AUTH_LOG_TAG,
			message: "Logging in...",
		});
		return vm
			.$http({
				url: "/auth/login",
				method: "post",
				withCredentials: true,
				data: payload,
			})
			.then((res: AxiosResponse) => {
				const token = res.data.data.token;
				ctx.commit(UPDATE_TOKEN, { token });
				return token;
			})
			.catch((err: AxiosError) => {
				// undefined response, it can happen in case of CORS
				if (typeof err.response === "undefined") return;

				throw err;
			});
	},
	[AUTH_VERIFY](
		ctx: ActionContext<AuthState, never>,
		payload: {
			token: string;
		}
	): Promise<void> {
		vm.$consola.log({
			tag: AUTH_LOG_TAG,
			message: "Identifying...",
		});

		return vm
			.$http({
				url: "/auth/verify",
				method: "get",
				headers: {
					Authorization: `Bearer ${payload.token}`,
				},
			})
			.then((res: AxiosResponse) => {
				vm.$http.defaults.headers["Authorization"] =
					"Bearer " + payload.token;

				const account = res.data.data.account;
				ctx.commit(ADD_STORED_ACCOUNT, { account: account.id });
				ctx.commit(UPDATE_ACCOUNT, { account });
			})
			.catch((res: AxiosError) => {
				vm.$consola.log({
					tag: AUTH_LOG_TAG,
					message: "Invalid token.",
				});

				throw res;
			});
	},
	async [AUTH_LOGOUT](ctx: ActionContext<AuthState, never>): Promise<void> {
		delete vm.$http.defaults.headers["Authorization"];
		vm.$storage.remove(AUTH_TOKEN_KEY);
		ctx.commit(UPDATE_ACCOUNT, { account: null });
		ctx.commit(UPDATE_TOKEN, { token: null });
	},
} as ActionTree<AuthState, never>;
