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
import { UserModel } from "@/app/user/models/user.model";

@Module({ name: "user", namespaced: true })
export class UserStore extends VuexModule {
	private _user: UserModel | null = {
		id: "0000",
		username: "devnatan",
		displayName: "Natan Vieira",
		registeredAt: new Date().toString(),
		lastLogin: new Date().toString(),
		email: "itroken99@gmail.com",
		avatar: "https://avatars.githubusercontent.com/u/24600258?v=4",
		role: undefined,
		permissions: []
	};

	/**
	 * Returns the user who is currently logged in.
	 */
	public get getUser(): UserModel | null {
		return this._user;
	}

	@Mutation
	public updateUser(payload: { user: UserModel }): void {
		this._user = payload.user;
	}
}
