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

import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Account } from "@/app/account/models/account";
import { AuthService } from "@/app/auth/services/auth";
import { StorageService } from "@/app/shared/services/storage";
import { HttpService } from "@/app/shared/services/http";
import { injectable } from "inversify";
import { LazyInject } from "@/app/shared/models/module";
import store from "@/store";

const AUTHORIZATION_HEADER = "Authorization";
export const AUTHORIZATION_TOKEN_KEY = "token";

@injectable()
@Module({
	name: "auth",
	dynamic: true,
	store: store
})
export class AuthStore extends VuexModule {
	account: Account | null = null;
	@LazyInject() private readonly authService!: AuthService;
	@LazyInject() private readonly httpService!: HttpService;
	@LazyInject() private readonly storageService!: StorageService;
	private token: string | null = null;

	/**
	 * Returns `true` if an {@link Account} is defined in the current state
	 * or `false` otherwise.
	 */
	public get isLoggedIn(): boolean {
		return !!this.account;
	}

	public get retrieveAuthorizationToken(): string {
		return this.storageService.get(AUTHORIZATION_TOKEN_KEY);
	}

	public get isAuthorizationTokenPresent(): boolean {
		return this.storageService.has(AUTHORIZATION_TOKEN_KEY);
	}

	/**
	 * Updates the current {@link token}.
	 * @param {string} token - the new token
	 */
	@Mutation
	public updateToken(token: string | null): void {
		this.token = token;
	}

	/**
	 * Updates the current {@link account}.
	 * @param {Account} account - the new account
	 */
	@Mutation
	public updateAccount(account: Account | null): void {
		this.account = account;
	}

	/**
	 * Attempts to log in with the credentials {@param username} and
	 * {@param password} and  returns the {@link Account} token and updates
	 * the current {@link token} if the login was successful
	 * @param {string} username - the account username
	 * @param {string} password - the account password
	 */
	@Action({ commit: "updateToken", rawError: true })
	public async login({
		username,
		password
	}: {
		username: string;
		password: string;
	}): Promise<string> {
		return await this.authService.login(username, password);
	}

	/**
	 * Checks whether the specified {@param token} is valid and returns and
	 * updates the current {@link account} if the token is valid and linked
	 * to an {@link Account}.
	 * @param {string} token - the token that'll be verified
	 */
	@Action({ commit: "updateAccount", rawError: true })
	public async verify({ token }: { token: string }): Promise<Account> {
		return await this.authService.verify(token).then((account: any) => {
			this.httpService.defaults().headers[
				AUTHORIZATION_HEADER
			] = `Bearer ${token}`;
			this.storageService.set(AUTHORIZATION_TOKEN_KEY, token);

			return account;
		});
	}

	@Mutation
	public logout(): void {
		this.storageService.remove(AUTHORIZATION_TOKEN_KEY);
		delete this.httpService.defaults().headers[AUTHORIZATION_HEADER];

		this.updateToken(null);
		this.updateAccount(null);
	}
}
