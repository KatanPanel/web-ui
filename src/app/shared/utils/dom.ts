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

export function isChildNode(
	element: Node | null | undefined,
	node: Node | null
): boolean {
	if (!element || node === null) return false;
	if (element == node) return true;
	if (element.contains(node)) return true;

	// perf -- tail recursive
	return isChildNode(element.childNodes[0], node);
}

export function hasTabKeyPressed(e: KeyboardEvent) {
	const code = e.key || (e as any).keyIdentifier || e.keyCode;
	return code === "Tab" || code === 9;
}

export function findVueClosestParent(el: Vue, target: string): Vue {
	const parent = el.$parent;
	const vmName = (parent as any)._name;
	if (vmName !== `<${target}>`) return findVueClosestParent(parent, target);

	return parent;
}

export function copyValue(value: string): Promise<any> {
	return (
		navigator.permissions
			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			.query({ name: "clipboard-write" })
			.then((result) => {
				if (result.state == "granted" || result.state == "prompt")
					return navigator.clipboard.writeText(value);
			})
	);
}

export function isDarkThemePreferred(): boolean {
	return (
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches
	);
}
