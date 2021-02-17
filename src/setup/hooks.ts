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
import Axios from "axios";
import Consola, {
	ConsolaReporter,
	ConsolaReporterArgs,
	ConsolaReporterLogObject,
} from "consola";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";

const vm: Vue = Vue.prototype;
vm.$isDevelopmentMode = process.env.NODE_ENV === "development";
vm.$helpers = {
	voca: require("voca"),
	filesize: require("filesize"),
};
vm.$http = Axios.create({
	baseURL: process.env.VUE_APP_API_URL,
	timeout: 5000,
});

dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);
vm.$time = dayjs;

class KatanBrowserReporter implements ConsolaReporter {
	private readonly COLOR = "#8854d0";

	log(logObj: ConsolaReporterLogObject, args: ConsolaReporterArgs): void {
		const consoleLogFn =
			logObj.level < 1
				? console.error
				: logObj.level === 1 && console.warn
				? console.warn
				: console.log;

		const tag = logObj.tag ? logObj.tag : "";
		const style = `
      		color: ${this.COLOR};
      		border-radius: 0;
      		font-weight: bold;
      		text-transform: capitalize;
    	`;

		const badge = "%c[" + tag + "]";
		if (typeof logObj.args[0] === "string") {
			consoleLogFn(
				`${badge} %c${logObj.args[0]}`,
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

vm.$consola = Consola.create({
	reporters: [new KatanBrowserReporter()],
});
