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

import { injectable } from "inversify";
import { lazyInject } from "@/ioc";
import { inject } from "inversify-props";
import { HttpService } from "@/app/shared/services/http.service";
import { AuthStore } from "@/app/auth/store/auth.store";
import { UserModel } from "@/app/user/models/user.model";
import { UserStore } from "@/app/user/store/user.store";
import {
	AUTHORIZATION_TOKEN_KEY,
	AuthService
} from "@/app/auth/services/auth.service";
import { isNull } from "@/app/shared/utils";
import { LocalStorageService } from "@/app/shared/services/local-storage.service";

@injectable()
export class AuthPresenter {
	@lazyInject() private readonly authStore!: AuthStore;
	@lazyInject() private readonly userStore!: UserStore;

	constructor(
		@inject() private readonly authService: AuthService,
		@inject() private readonly httpService: HttpService,
		@inject() private readonly localStorageService: LocalStorageService
	) {}

	public get isLoggedIn(): boolean {
		return !isNull(this.userStore.getUser);
	}

	public async authenticate(
		username: string,
		password: string
	): Promise<void> {
		const token = await this.authService.login(username, password);
		return await this.authService.verify(token).then((user: UserModel) => {
			this.httpService.defaults().headers[
				AUTHORIZATION_TOKEN_KEY
			] = `Bearer ${token}`;
			this.userStore.updateUser({ user });

			this.localStorageService.set(AUTHORIZATION_TOKEN_KEY, token);
		});
	}

	public async verify(): Promise<UserModel> {
		return await this.authService.verify(
			this.localStorageService.get(AUTHORIZATION_TOKEN_KEY) as string
		);
	}

	public async logout(): Promise<void> {
		return;
	}
}
