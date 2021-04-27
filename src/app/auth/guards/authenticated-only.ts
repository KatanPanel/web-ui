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

import { NavigationGuardNext, Route } from "vue-router";
import { StorageService } from "@/app/shared/services/storage";
import { isUndefined } from "@/app/shared/utils/any";
import { AuthStore } from "@/app/auth/auth.store";
import { injectable } from "inversify";
import { KatanNavigationGuard, LazyInject } from "@/app/shared/models/module";

@injectable()
export class AuthenticatedOnlyGuard implements KatanNavigationGuard {
	@LazyInject() private readonly authStore!: AuthStore;
	@LazyInject() private readonly storageService!: StorageService;

	handle(to: Route, from: Route, next: NavigationGuardNext) {
		// already logged-in, just go ahead
		if (this.authStore.isLoggedIn) return next();

		const alreadyInLoginRoute =
			!isUndefined(from.name) && from.name === "login";

		// token not defined, no need to verification
		if (!this.authStore.isAuthorizationTokenPresent) {
			return next();
		}

		this.authStore
			.verify({
				token: this.authStore.retrieveAuthorizationToken
			})
			.then(() => next())
			.catch(() => {
				if (alreadyInLoginRoute) next({ name: "login" });
				else next();
			});
	}
}
