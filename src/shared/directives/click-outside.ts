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
import { isUndefined } from "@/utils/any";

function bind(
	el: HTMLElement & any,
	binding: DirectiveBinding,
	node: VNode
): void {
	el._clickOutsideListener = (event: Event) => {
		// check if the click was outside the element and his children
		if (!(el == event.target || el.contains(event.target))) {
			const ctx: (Vue & any) | undefined = node.context;
			if (isUndefined(ctx)) return;

			ctx[binding.expression](event);
		}
	};

	document.body.addEventListener("click", el._clickOutsideListener);
}

function unbind(el: HTMLElement & any): void {
	document.removeEventListener("click", el._clickOutsideListener);
}

export const ClickOutsideDirective: DirectiveOptions = {
	bind,
	unbind
};
