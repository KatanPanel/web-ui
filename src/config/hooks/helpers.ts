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

import Filesize from "filesize";
import i18n from "@/i18n";
import { requireVM } from "@/utils/build";
import Vue from "vue";

const vm: Vue = Vue.prototype;

const filesize = Filesize.partial({
	locale: i18n.locale
});

vm.$helpers = {
	filesize(value: number): string {
		return filesize(value);
	},
	routeMappings: {
		"server.overview": requireVM("server/ServerOverview"),
		"server.console": requireVM("server/ServerConsole"),
		"server.fs": requireVM("server/ServerFS"),
		"server.fs.disk": requireVM("server/fs/ServerFSDisk"),
		"server.settings": requireVM("server/ServerSettings")
	}
};
