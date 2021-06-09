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

/**
 * Returns `true` if the {@param value} is `undefined` or `false` otherwise.
 * @param {*} value - the value.
 */
export function isUndefined(value: unknown): value is undefined {
	return typeof value === "undefined";
}

/**
 * Returns `true` if the {@param value} is `null` or `false` otherwise.
 * @param {*} value - the value.
 */
export function isNull(value: unknown): value is null {
	return value === null;
}

/**
 * Returns `true` if the {@param value} is a number or `false` otherwise.
 * @param {*} value - the value.
 */
export function isNumber(value: any): value is number {
	return typeof value === "number";
}

/**
 * Returns `true` if the {@param value} is a object or `false` otherwise.
 * @param {*} value - the value.
 */
export function isObject(value: any): value is object {
	return typeof value === "object";
}

/**
 * Returns `true` if the {@param value} is a function or `false` otherwise.
 * @param {*} value - the value.
 */
export function isFunction(value: any): boolean {
	return typeof value === "function";
}

/**
 * Returns `null` if the {@param value} is `undefined` or the value itself otherwise.
 * @param {T | undefined} value - the value.
 */
export function undefinedToNull<T = any>(value: T | undefined): T | null {
	return isUndefined(value) ? null : value;
}

/**
 * Returns `undefined` if the {@param value} is `null` or the value itself otherwise.
 * @param {T | null} value - the value.
 */
export function nullToUndefined<T = any>(value: T | null): T | undefined {
	return isNull(value) ? undefined : value;
}

/**
 * Make all properties in T nullable
 */
export type Nullable<T> = {
	[P in keyof T]: T[P] | null;
};
