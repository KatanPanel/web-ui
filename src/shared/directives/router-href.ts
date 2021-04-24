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

import { DirectiveOptions, VNode } from "vue";
import { DirectiveBinding } from "vue/types/options";

/**
 * Updates the current element by adding the `active` class if the route
 * defined in the element is the current route on which it is being accessed.
 *
 * @param {HTMLElement} el - the HTML element.
 * @param {DirectiveBinding} binding - the directive.
 * @param {VNode} node - the representation of the element as {@link VNode}.
 */
function update(el: HTMLElement, binding: DirectiveBinding, node: VNode): void {
	const router = node.context!.$router;
	const current = router.currentRoute;
	if (!current.name) {
		return;
	}

	const location = router.resolve(binding.value);
	if (current.name && current.fullPath === location.resolved.fullPath) {
		el.classList.add("active");
	}
}

/**
 * Defines the element's `href` according to the route specified in the directive options.
 * A note in this method is that if the element is of the `li` type it
 * will try to find the closest `a` (link) type element to bind, due to convention.
 *
 * @param {HTMLElement} el - the HTML element.
 * @param {DirectiveBinding} binding - the directive.
 * @param {VNode} node - the representation of the element as {@link VNode}.
 */
function bind(el: HTMLElement, binding: DirectiveBinding, node: VNode): void {
	const router = node.context!.$router;
	const location = router.resolve(binding.value);
	switch (el.tagName) {
		case "LI": {
			const child = el.firstElementChild;
			if (child && child.tagName === "A") {
				child.setAttribute("href", location.href);
			}
			break;
		}
		case "A": {
			el.setAttribute("href", location.href);
			break;
		}
		default:
	}
}

/**
 * It is a directive to add the path of a route, just like `router-link`.
 * Will resolve the path of the specified route and add it to the current
 * `<a>` element current or his nearest child.
 */
export const RouterHrefDirective: DirectiveOptions = {
	bind,
	update,
	inserted: update
};
