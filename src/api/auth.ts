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

import { vm } from "@/main";
import { AxiosResponse } from "axios";

export const AUTH_TOKEN_KEY = "token";

async function login(username: string, password: string): Promise<string> {
	return vm
		.$http({
			url: "/auth/login",
			method: "post",
			withCredentials: true,
			data: { username, password },
		})
		.then((res: AxiosResponse) => {
			return res.data.data.token;
		});
}

async function verify(token: string): Promise<any> {
	return vm
		.$http({
			url: "/auth/verify",
			method: "get",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res: AxiosResponse) => {
			// vm.$http.defaults.headers["Authorization"] = `Bearer ${token}`;
			return res.data.data.account;
		});
}

export default { login, verify } as API.Auth;
