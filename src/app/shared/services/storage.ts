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

import { SetterOptions, Vue2Storage } from "vue2-storage";
import { injectable } from "inversify";
import Vue from "vue";

@injectable()
export class StorageService {
	private readonly storage!: Vue2Storage;

	constructor() {
		Vue.use(Vue2Storage, {
			prefix: "katan_",
			driver: "sessionStorage",
			ttl: 60 * 60 * 24 * 1000
		});

		this.storage = Vue.prototype.$storage;
		console.log("storage:", this.storage);
	}

	public get(key: string, fallback?: any): any {
		return this.storage.get(key, fallback);
	}

	public set(key: string, data: any, options?: SetterOptions): void {
		this.storage.set(key, data, options);
	}

	public remove(key: string): void {
		this.storage.remove(key);
	}

	public has(key: string): boolean {
		return this.storage.has(key);
	}
}
