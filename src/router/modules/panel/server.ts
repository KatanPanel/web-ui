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
	path: "server/:serverId",
	name: "server",
	component: importVM("server/Server"),
	props: true,
	children: [
		{
			path: "overview",
			name: "server.overview",
			component: importVM("server/ServerOverview")
		},
		{
			path: "console",
			name: "server.console",
			component: importVM("server/ServerConsole")
		},
		{
			path: "fs",
			name: "server.fs",
			component: importVM("server/ServerFS"),
			children: [
				{
					path: "disk/:disk",
					name: "server.fs.disk",
					component: importVM("server/fs/ServerFSDisk")
				}
			]
		},
		{
			path: "settings",
			name: "server.settings",
			component: importVM("server/ServerSettings")
		}
	]
} as RouteConfig;
