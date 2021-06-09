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
import { isNull } from "@/app/shared/utils";

const PREFIX = "katan_";

@injectable()
export class LocalStorageService {
	/**
	 * Returns the current value associated with the given key, or `null` if
	 * the given key does not exist.
	 * @param {string} key - The pair key.
	 */
	public get<T = any>(key: string): T | null {
		const value = localStorage.getItem(PREFIX + key);
		if (isNull(value)) return null;
		return JSON.parse(value) as T;
	}

	/**
	 * Sets the value of the pair identified by key to value, creating a new
	 * key/value pair if none existed for key previously.
	 * @param {string} key - The pair key.
	 * @param {*} value - The pair value.
	 */
	public set(key: string, value: any): void {
		localStorage.setItem(PREFIX + key, JSON.stringify(value));
	}

	/**
	 * Removes the key/value pair with the given key from the list associated
	 * with the object
	 * @param {string} key - The pair key.
	 */
	public remove(key: string): void {
		localStorage.removeItem(PREFIX + key);
	}

	/**
	 * Returns `true` if there is a value associated with the given key or
	 * `false` otherwise.
	 * @param {string} key - The pair key.
	 */
	public has(key: string): boolean {
		return !isNull(localStorage.getItem(PREFIX + key));
	}
}
