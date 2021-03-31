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

import Vue from "vue";
import Axios, { AxiosResponse } from "axios";
import Consola, {
	ConsolaReporter,
	ConsolaReporterArgs,
	ConsolaReporterLogObject,
} from "consola";
import dayjs from "dayjs";
import dayJsAdvancedFormat from "dayjs/plugin/advancedFormat";
import dayJsLocalizedFormat from "dayjs/plugin/localizedFormat";
import { ERROR_HANDLER_LOG_TAG } from "@/logging";
import { requireVM } from "@/common/internal";

const vm: Vue = Vue.prototype;
vm.$isDevelopmentMode = process.env.NODE_ENV === "development";

vm.$helpers = {
	voca: require("voca"),
	filesize: require("filesize"),

	routeMappings: {
		"server.overview": requireVM("server/ServerOverview"),
		"server.console": requireVM("server/ServerConsole"),
		"server.fs": requireVM("server/ServerFS"),
		"server.fs.disk": requireVM("server/fs/ServerFSDisk"),
		"server.settings": requireVM("server/ServerSettings"),
	},
};

vm.$http = Axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	timeout: 5000,
});
vm.$http.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: any) => {
		vm.$log.error({
			tag: ERROR_HANDLER_LOG_TAG,
			args: [error],
		});

		throw error;
	}
);

dayjs.extend(dayJsAdvancedFormat);
dayjs.extend(dayJsLocalizedFormat);
vm.$time = dayjs;

class KatanBrowserReporter implements ConsolaReporter {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	log(logObj: ConsolaReporterLogObject, _args: ConsolaReporterArgs): void {
		const consoleLogFn =
			logObj.level < 1
				? console.error
				: logObj.level === 1 && console.warn
				? console.warn
				: console.log;

		const tag = logObj.tag || "";
		const style = `
      		color: #8854d0;
      		border-radius: 0;
      		font-weight: bold;
      		text-transform: capitalize;
    	`;

		const badge = tag.length === 0 ? "%c" : "%c[" + tag + "] ";
		if (typeof logObj.args[0] === "string") {
			consoleLogFn(
				`${badge}%c${logObj.args[0]}`,
				style,
				// Empty string as style resets to default console style
				"",
				...logObj.args.slice(1)
			);
		} else {
			consoleLogFn(badge, style, ...logObj.args);
		}
	}
}

vm.$log = Consola.create({
	reporters: [new KatanBrowserReporter()],
});
