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

import { easeInOutQuad } from "@/common/utils/math";

export function isChildNode(
	element: Node | null | undefined,
	node: Node | null
): boolean {
	if (!element || node === null) return false;
	if (element == node) return true;
	if (element.contains(node)) return true;

	// tail rec -- opt
	return isChildNode(element.childNodes[0], node);
}

export function hasTabKeyPressed(e: KeyboardEvent) {
	const code = e.key || (e as any).keyIdentifier || e.keyCode;
	return code === "Tab" || code === 9;
}

export function smoothScroll(
	duration: number,
	element: HTMLElement,
	to: number,
	property: "scrollTop" | "scrollLeft"
): void {
	const start = element[property];
	const change = to - start;
	const startDate = new Date().getTime();

	const animateScroll = () => {
		const currentDate = new Date().getTime();
		const currentTime = currentDate - startDate;

		element[property] = easeInOutQuad(currentTime, start, change, duration);

		if (currentTime < duration) {
			requestAnimationFrame(animateScroll);
		} else {
			element[property] = to;
		}
	};

	animateScroll();
}
