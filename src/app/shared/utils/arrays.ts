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

export function sortAlphabetically<
	E extends {
		[K: string]: any;
	},
	K extends keyof E
>(array: Array<E>, prop: K) {
	array.sort((a: E, b: E) => a[prop].localeCompare(b[prop]));
}

export function sortAlphabeticallyReversed<
	E extends { [K: string]: any },
	K extends keyof E
>(array: Array<E>, prop: K) {
	array.sort((a: E, b: E) => b[prop].localeCompare(a[prop]));
}

export function arrayMatches<E, K extends keyof E>(
	array: Array<E>,
	value: E,
	prop: K
): boolean {
	return array.findIndex((other: E) => value[prop] === other[prop]) !== -1;
}

export function arrayRemove<E>(
	array: Array<E>,
	predicate: (value: E) => boolean
): boolean {
	return array.splice(array.findIndex(predicate), 1).length !== 0;
}
