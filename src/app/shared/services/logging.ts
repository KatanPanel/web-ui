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
	Consola,
	ConsolaLogObject,
	ConsolaReporter,
	ConsolaReporterArgs,
	ConsolaReporterLogObject,
	default as ConsolaInstance
} from "consola";
import { injectable } from "inversify";

export const AUTH_LOG_TAG = "Auth";
export const VUEX_LOG_TAG = "Data Storage";
export const WEB_SOCKET_LOG_TAG = "Web Socket";
export const WINDOWS_LOG_TAG = "Navigation Windows";
export const ROUTER_NAVIGATION_LOG_TAG = "Routing";
export const ERROR_HANDLER_LOG_TAG = "Error Handler";
export const I18N_LOG_TAG = "I18N";

@injectable()
export class LoggingService {
	private readonly logger!: Consola;

	constructor() {
		this.logger = ConsolaInstance.create({
			reporters: [this.setupReporter()]
		});
	}

	public log(message: ConsolaLogObject | any, ...args: any[]): void {
		this.logger.log(message, ...args);
	}

	public debug(message: ConsolaLogObject | any, ...args: any[]): void {
		this.logger.debug(message, ...args);
	}

	public info(message: ConsolaLogObject | any, ...args: any[]): void {
		this.logger.info(message, ...args);
	}

	public warn(message: ConsolaLogObject | any, ...args: any[]): void {
		this.logger.warn(message, ...args);
	}

	public error(message: ConsolaLogObject | any, ...args: any[]): void {
		this.logger.error(message, ...args);
	}

	private setupReporter(): ConsolaReporter {
		return {
			log(
				logObj: ConsolaReporterLogObject,
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				_args: ConsolaReporterArgs
			): void {
				const consoleLogFn =
					logObj.level < 1
						? console.error
						: logObj.level === 1 && console.warn
						? console.warn
						: console.log;

				const tag = logObj.tag || "";
				const style = `color: #8854d0; border-radius: 0; font-weight: bold; text-transform: capitalize;`;
				const badge = tag.length === 0 ? "%c" : "%c[" + tag + "] ";

				if (typeof logObj.args[0] === "string")
					consoleLogFn(
						`${badge}%c${logObj.args[0]}`,
						style,
						// Empty string as style resets to default console style
						"",
						...logObj.args.slice(1)
					);
				else consoleLogFn(badge, style, ...logObj.args);
			}
		};
	}
}
