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

import { Module } from "vuex";
import state, { AuthState } from "@/store/auth/state";
import actions, { AUTH_VERIFY } from "@/store/auth/actions";
import mutations from "@/store/auth/mutations";
import getters, { IS_LOGGED_IN } from "@/store/auth/getters";
import { RootState } from "@/store/state";
import { dispatch, get } from "@/utils/vuex";
import { AUTH_MODULE } from "@/store";
import Vue from "vue";

export const AUTH_TOKEN_KEY = "token";

const vm: Vue = Vue.prototype;

export async function verifyAuth(): Promise<{ token: string }> {
	return dispatch(AUTH_MODULE, AUTH_VERIFY, {
		token: vm.$storage.get(AUTH_TOKEN_KEY),
	});
}

export function isLoggedIn(): boolean {
	return get<boolean>(AUTH_MODULE, IS_LOGGED_IN);
}

export default {
	actions,
	mutations,
	state,
	getters,
	namespaced: true,
} as Module<AuthState, RootState>;
