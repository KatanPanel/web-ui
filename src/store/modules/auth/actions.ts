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

import {ActionContext, ActionTree} from "vuex";
import {AuthState} from "@/store/modules/auth/state";
import {UPDATE_ACCOUNT, UPDATE_TOKEN} from "@/store/modules/auth/mutations";
import {vm} from "@/main";
import {AUTH_TOKEN_KEY} from "@/api/auth";

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
	): Promise<any> {
		return vm.$api.auth
			.login(payload.username, payload.password)
			.then((token: string) => {
				ctx.commit(UPDATE_TOKEN, { token });
				return token;
			});
	},
	[AUTH_VERIFY](
		ctx: ActionContext<AuthState, never>,
		payload: {
			token: string;
		}
	): Promise<any> {
		return vm.$api.auth.verify(payload.token).then((account: any) => {
			// ctx.commit(ADD_STORED_ACCOUNT, { account: account.id });
			vm.$http.defaults.headers[
				"Authorization"
			] = `Bearer ${payload.token}`;
			ctx.commit(UPDATE_ACCOUNT, { account });
		});
	},
	async [AUTH_LOGOUT](ctx: ActionContext<AuthState, never>): Promise<void> {
		vm.$storage.remove(AUTH_TOKEN_KEY);
		delete vm.$http.defaults.headers["Authorization"];
		ctx.commit(UPDATE_ACCOUNT, { account: null });
		ctx.commit(UPDATE_TOKEN, { token: null });
	},
} as ActionTree<AuthState, never>;
