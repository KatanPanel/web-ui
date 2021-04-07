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

import { NavigationGuard, NavigationGuardNext, Route } from "vue-router";
import Vue from "vue";
import { AUTH_TOKEN_KEY } from "@/api/auth";
import { dispatch, get } from "@/utils/vuex";
import { AUTH_MODULE } from "@/store";
import { AUTH_VERIFY } from "@/store/modules/auth/actions";
import { IS_LOGGED_IN } from "@/store/modules/auth/getters";

const vm: Vue = Vue.prototype;
export const AuthenticatedOnlyGuard: NavigationGuard = (
	to: Route,
	from: Route,
	next: NavigationGuardNext
) => {
	if (!vm.$storage.has(AUTH_TOKEN_KEY)) return next({ name: "login" });
	if (get(AUTH_MODULE, IS_LOGGED_IN) === true) return next();

	return dispatch(AUTH_MODULE, AUTH_VERIFY, {
		token: vm.$storage.get(AUTH_TOKEN_KEY),
	})
		.then(() => {
			next();
		})
		.catch(() => {
			next({ name: "login" });
		});
};
