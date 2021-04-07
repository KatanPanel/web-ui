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

import store from "@/store";
import { joinBySlash } from "@/utils/text";
import { isFunction } from "@/utils/any";

/**
 * Returns the result of a getter.
 * @param {string} module - getter's module name.
 * @param {string} getter - getter's name.
 * @param {...*} parameters - optional parameters to call the getter.
 */
export function get<T = any>(
	module: string,
	getter: string,
	...parameters: any[]
): T {
	const getter0 = store.getters[joinBySlash(module, getter)];
	if (isFunction(getter0)) return getter0(...parameters);

	return getter0;
}

/**
 * Commits a mutation to the {@link Store}.
 * @param {string} module - mutation's module name.
 * @param {string} mutation - mutation's name.
 * @param {*} payload - optional mutation data.
 */
export function commit<T = any>(module: string, mutation: string, payload?: T) {
	store.commit(joinBySlash(module, mutation), payload);
}

/**
 * Dispatches an action to the {@link Store}.
 * @param {string} module - action's module name.
 * @param {string} action - action's name.
 * @param {T} payload - optional action data.
 * @returns {Promise<R>}
 */
export async function dispatch<T, R = any>(
	module: string,
	action: string,
	payload?: T
): Promise<R> {
	return store.dispatch(joinBySlash(module, action), payload);
}
