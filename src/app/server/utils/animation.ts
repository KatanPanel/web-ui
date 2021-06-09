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

export function easeInOutQuad(
	currentTime: number,
	start: number,
	change: number,
	duration: number
): number {
	let newCurrentTime = currentTime;
	newCurrentTime /= duration / 2;

	if (newCurrentTime < 1) {
		return (change / 2) * newCurrentTime * newCurrentTime + start;
	}

	newCurrentTime -= 1;
	return (-change / 2) * (newCurrentTime * (newCurrentTime - 2) - 1) + start;
}

export function smoothScroll(
	duration: number,
	el: HTMLElement,
	to: number,
	property: "scrollTop" | "scrollLeft"
): void {
	const start = el[property];
	const diff = to - start;
	const startTime = new Date().getTime();

	const animateScroll = () => {
		const currentTime = new Date().getTime();
		const diffTime = currentTime - startTime;

		el[property] = easeInOutQuad(diffTime, start, diff, duration);

		if (diffTime < duration) requestAnimationFrame(animateScroll);
		else el[property] = to;
	};

	animateScroll();
}
