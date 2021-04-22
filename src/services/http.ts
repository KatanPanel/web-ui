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

import { Inject, Injectable } from "@vue-ioc/core";
import Axios, {
	AxiosInstance,
	AxiosPromise,
	AxiosRequestConfig,
	AxiosResponse
} from "axios";
import { ConfigService } from "@/services/config";
import { ERROR_HANDLER_LOG_TAG, LoggingService } from "@/services/logging";

@Injectable()
export class HttpService {
	private readonly axios!: AxiosInstance;

	constructor(
		@Inject() private readonly logger: LoggingService,
		@Inject() private readonly config: ConfigService
	) {
		this.axios = Axios.create({
			baseURL: config.apiUrl,
			timeout: 5000,
			withCredentials: true
		});

		this.axios.interceptors.response.use(
			(response: AxiosResponse) => response,
			(error: any) => {
				logger.error({
					tag: ERROR_HANDLER_LOG_TAG,
					args: [error]
				});

				throw error;
			}
		);
	}

	public get(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this.axios.get(url, config);
	}

	public post(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): AxiosPromise {
		return this.axios.post(url, data, config);
	}
}
