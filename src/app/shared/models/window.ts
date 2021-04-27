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

/**
 * Windows are components whose state has been preserved after
 * being inactive and may or may not be restored at any point in time.
 *
 * Currently, windows are used to open multiple server views without
 * the previously opened servers ceasing to allow manipulation of multiple
 * servers simultaneously.
 */
export interface Window {
	/**
	 * The identification number of the window.
	 */
	readonly id: number;

	/**
	 * The name of the window.
	 */
	readonly name: string;

	/**
	 * The window title.
	 */
	title: string;

	/**
	 * The data contained in that window, can be anything.
	 */
	data: any;

	/**
	 * The current state of the window, when the window is opened,
	 * is set to the {@link OpenWindowState} state, it has no foreground.
	 *
	 * When minimized, the status changes to {@link MinimizedWindowState}.
	 * When closed or before being opened during the transition state from
	 * creation to opening, the state is {@link ClosedWindowState}.
	 *
	 * If there is more than one window open simultaneously, both will
	 * have the status {@link OpenWindowState} without any differentiation.
	 */
	state: WindowState;

	/**
	 * The current location of the window.
	 */
	location: Location;
	properties: any;

	/**
	 * Returns `true` if the current {@link location} of the window matches
	 * the specified  route or` false` otherwise. Vue components can use
	 * {@link Vue.$route} for checking.
	 * @param {Route} route - the route to be checked.
	 */
	isActive(route: Route): boolean;
}

export const ClosedWindowState = "closed";
export const OpenWindowState = "open";
export const MinimizedWindowState = "minimized";

export type WindowState =
	| typeof OpenWindowState
	| typeof ClosedWindowState
	| typeof MinimizedWindowState;
