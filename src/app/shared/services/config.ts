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

import { injectable } from "inversify";

@injectable()
export class ConfigService {
	public readonly appName = this.value("$VUE_APP_NAME");
	public readonly appVersion = this.value("$VUE_APP_VERSION");
	public readonly appWebsite = this.value("$VUE_APP_KATAN_WEBSITE");
	public readonly apiUrl = this.value("$VUE_APP_KATAN_SERVER_API");
	public readonly wsUrl = this.value("$VUE_APP_KATAN_SERVER_WS");
	public readonly gitCommit = this.value("$VUE_APP_KATAN_GIT_COMMIT");
	public readonly gitBranch = this.value("$VUE_APP_KATAN_GIT_BRANCH");

	/**
	 * Returns a string containing the name of the application, the current
	 * version, the SHA of the build commit and the branch of the current build.
	 */
	public toVersionInfoString(): string {
		return `${this.appName} v${this.appVersion} (build ${this.gitCommit} @ ${this.gitBranch})`;
	}

	/**
	 * Returns a environment variable key value.
	 *
	 * If the current environment is of development, it returns
	 * the value of the key present in the environment.
	 *
	 * If it is a dynamic key (its initial value can be changed) it must be
	 * prefixed with `$` to be changed during the construction phase of the
	 * application by the respective value.
	 * @param {string} key - env key
	 */
	public value(key: string): string {
		const envKey = key.indexOf("$") === -1 ? key : key.substr(1);
		const value = process.env[envKey];

		if (process.env.NODE_ENV === "development") return value;

		// key will be replaced in build stage
		return value || key;
	}
}
