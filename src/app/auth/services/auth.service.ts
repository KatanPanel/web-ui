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

import { AxiosResponse } from "axios";
import { inject, injectable } from "inversify-props";
import { HttpService } from "@/app/shared/services/http.service";
import { UserModel } from "@/app/user/models/user.model";

export const AUTHORIZATION_HEADER = "Authorization";
export const AUTHORIZATION_TOKEN_KEY = "token";

@injectable()
export class AuthService {
	constructor(@inject() private readonly httpService: HttpService) {}

	public async login(username: string, password: string): Promise<string> {
		return this.httpService
			.post("auth/login", {
				username,
				password
			})
			.then((res: AxiosResponse) => {
				return res.data.data.token;
			});
	}

	public async verify(token: string): Promise<UserModel> {
		return this.httpService
			.get("auth/verify", {
				headers: {
					[AUTHORIZATION_HEADER]: `Bearer ${token}`
				}
			})
			.then((res: AxiosResponse) => res.data.data.account);
	}
}
