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

import {
	Constructor,
	KatanModule,
	KatanRouting
} from "@/app/shared/models/module";
import { AuthService } from "@/app/auth/services/auth";
import { AuthStore } from "@/app/auth/auth.store";
import { AuthenticatedOnlyGuard } from "@/app/auth/guards/authenticated-only";
import { VuexModule } from "vuex-module-decorators";

export default class AuthModule extends KatanModule {
	init() {
		this.bind(AuthService);
		this.bind(AuthenticatedOnlyGuard);
	}

	routes(): KatanRouting {
		return {
			path: "/login",
			name: "login",
			root: true,
			component: this.resolve("Login"),
			beforeEnter: this.navigationGuard(AuthenticatedOnlyGuard)
		};
	}

	stateManagement(): Constructor<VuexModule>[] {
		return [AuthStore];
	}
}
