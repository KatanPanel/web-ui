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

import { RouteConfig } from "vue-router";
import { importVM } from "@/utils/build";

export default {
	path: "account",
	component: importVM("my-account/MyAccount"),
	children: [
		{
			path: "",
			name: "account",
			component: importVM("my-account/MyAccountDetails")
		},
		{
			path: "appearence",
			name: "account.appearence",
			component: importVM("my-account/MyAccountAppearence")
		},
		{
			path: "language",
			name: "account.language",
			component: importVM("my-account/MyAccountLanguage")
		},
		{
			path: "performance",
			name: "account.performance",
			component: importVM("my-account/MyAccountPerformance")
		},
		{
			path: "advanced",
			name: "account.advanced",
			component: importVM("my-account/MyAccountAdvanced")
		}
	]
} as RouteConfig;
