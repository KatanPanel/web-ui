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

import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ name: "auth", namespaced: true })
export class AuthStore extends VuexModule {
	private _token: string | null = null;

	/**
	 * Returns the current authorization token.
	 */
	public get getToken(): string | null {
		return this._token;
	}

	/**
	 * Updates the current authorization token
	 * @param {Object} payload - The mutation payload.
	 * @param {string} payload.token - The new token.
	 */
	@Mutation
	public updateToken(payload: { token: string | null }): void {
		this._token = payload.token;
	}

	/* @Mutation
	public logout(): void {
		this.storageService.remove(AUTHORIZATION_TOKEN_KEY);
		delete this.httpService.defaults().headers[AUTHORIZATION_HEADER];

		this.updateToken(null);
		this.updateAccount(null);
	} */
}
