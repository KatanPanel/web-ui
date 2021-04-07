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

import { Location, Route } from "vue-router";
import Vue from "vue";

/**
 * Convert a {@link Route} object to a {@link Location} object.
 * @param {Route} route - the route object.
 */
export function routeToLocation(route: Route): Location {
	return {
		name: route.name!,
		path: route.path,
		hash: route.hash,
		query: route.query,
		params: route.params,
	};
}

/**
 * Redirects to the desired location.
 * @param {Location | string} to - location or route name.
 */
export function redirect(this: Vue, to: Location | string): void {
	window.location.href = this.$router.resolve(
		to instanceof Location ? to : { name: to as string }
	).href;
}

/**
 * Performs a simple equality check between a {@link Route} and a {@link Location}.
 * @param {Route} route - the route
 * @param {Location} location - the location.
 * @returns `true` if the parameters are identical.
 */
export function locationMatches(route: Route, location: Location): boolean {
	return (
		route.name === location.name &&
		route.hash === location.hash &&
		route.path === location.path
	);
}
