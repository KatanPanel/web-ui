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
	default as ConsolaInstance,
	LogLevel
} from "consola";
import { injectable } from "inversify";

@injectable()
export class LoggingService {
	private readonly _logger!: Consola;

	constructor() {
		this._logger = ConsolaInstance.create({
			level:
				process.env.NODE_ENV !== "production"
					? LogLevel.Debug
					: LogLevel.Info
		});
	}

	public copy(tag: string): Consola {
		return this._logger.withTag(tag);
	}

	public log(message: ConsolaLogObject | any, ...args: any[]): void {
		this._logger.log(message, ...args);
	}

	public debug(message: ConsolaLogObject | any, ...args: any[]): void {
		this._logger.debug(message, ...args);
	}

	public info(message: ConsolaLogObject | any, ...args: any[]): void {
		this._logger.info(message, ...args);
	}

	public warn(message: ConsolaLogObject | any, ...args: any[]): void {
		this._logger.warn(message, ...args);
	}

	public error(message: ConsolaLogObject | any, ...args: any[]): void {
		this._logger.error(message, ...args);
	}
}
