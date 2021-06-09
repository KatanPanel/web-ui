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

import Vue, { DirectiveOptions, VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";
import { isUndefined } from "@/app/shared/utils/any";

const cache: { node: VNode; binding: DirectiveBinding }[] = [];
let listener: (event: Event) => void;

function setupListener() {
	listener = (event: Event) => {
		for (const { node, binding } of cache) {
			const el = node.elm as HTMLElement;
			// check if the click was outside the element and his children
			if (
				!(
					el == event.target ||
					el.contains(event.target as HTMLElement)
				)
			) {
				const ctx: (Vue & any) | undefined = node.context;
				if (isUndefined(ctx)) return;

				ctx[binding.expression](event);
			}
		}
	};
}

function bind(
	el: HTMLElement & any,
	binding: DirectiveBinding,
	node: VNode
): void {
	cache.push({ node, binding });

	if (cache.length === 1) {
		setupListener();
		window.addEventListener("click", listener);
	}
}

function unbind(el: HTMLElement & any): void {
	cache.splice(
		cache.findIndex(({ node }) => node.elm === el),
		1
	);

	if (cache.length === 0) window.removeEventListener("click", listener);
}

export const ClickOutsideDirective: DirectiveOptions = {
	bind,
	unbind
};
