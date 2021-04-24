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
import Component from "vue-class-component";
import { AUTH_MODULE } from "@/store";
import {
	GET_ACCOUNT,
	GET_STORED_ACCOUNTS,
	IS_LOGGED_IN
} from "@/store/modules/auth/getters";
import { dispatch, get } from "@/utils/vuex";
import { AUTH_LOGOUT } from "@/store/modules/auth/actions";

/**
 * This mixin is used when the component needs to have information about the account that is currently logged on.
 */
@Component
export class AuthMixin extends Vue {
	/**
	 * Returns the account that is currently logged in.
	 *
	 * @throws if no account is logged.
	 * @returns {*} - the account that is logged in.
	 */
	public get getAccount() {
		return get(AUTH_MODULE, GET_ACCOUNT);
	}

	/**
	 * Returns `true` if an account is logged in or` false` otherwise.
	 */
	public get isLoggedIn(): boolean {
		return get<boolean>(AUTH_MODULE, IS_LOGGED_IN);
	}

	public performLogout(): void {
		dispatch(AUTH_MODULE, AUTH_LOGOUT).then(() => {
			/* ignored */
		});
	}

	public get getStoredAccounts(): string[] {
		return get<string[]>(AUTH_MODULE, GET_STORED_ACCOUNTS);
	}
}
