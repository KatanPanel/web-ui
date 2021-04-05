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

import { GET_ALL_WINDOWS } from "@/store/getters";
import { commit, get } from "@/common/utils/vuex";
import { Location, Route } from "vue-router";
import { undefinedToNull } from "@/common/utils/any";
import { MINIMIZE_WINDOW, OPEN_WINDOW, UPDATE_WINDOW } from "@/store/mutations";
import router from "@/router";
import { loadServer, ROOT_MODULE } from "@/store";
import { locationMatches, routeToLocation } from "@/common/utils/navigation";

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

	/**
	 * Returns `true` if the current {@link location} of the window matches
	 * the specified  route or` false` otherwise. Vue components can use
	 * {@link Vue.$route} for checking.
	 * @param {Route} route - the route to be checked.
	 */
	isActive(route: Route): boolean;

	properties: any;
}

export const ClosedWindowState = "closed";
export const OpenWindowState = "open";
export const MinimizedWindowState = "minimized";

export type WindowState =
	| typeof OpenWindowState
	| typeof ClosedWindowState
	| typeof MinimizedWindowState;

/**
 * Returns all windows regardless of state.
 */
export function getWindows(): Window[] {
	return get(ROOT_MODULE, GET_ALL_WINDOWS);
}

/**
 * Returns all windows by filtering only those windows with the specified state.
 * @param {WindowState} state - the desired state.
 */
export function getWindowsBy(state: WindowState): Window[] {
	return getWindows().filter((window: Window) => window.state === state);
}

/**
 * Returns all windows with the status {@link OpenWindowState}.
 */
export function getOpenWindows(): Window[] {
	return getWindowsBy(OpenWindowState);
}

/**
 * Returns all windows with the status {@link MinimizedWindowState}.
 */
export function getMinimizedWindows(): Window[] {
	return getWindowsBy(MinimizedWindowState);
}

/**
 * Returns all windows with the status {@link OpenWindowState} or {@link MinimizedWindowState}.
 */
export function getActiveWindows(): Window[] {
	return getWindows().filter(
		(window: Window) =>
			window.state === OpenWindowState ||
			window.state === MinimizedWindowState
	);
}

export function matchesWindow(
	predicate: (window: Window) => boolean
): Window | null {
	return undefinedToNull(getWindows().find(predicate));
}

/**
 * @todo
 * @param id
 */
export function getWindow(id: number): Window | null {
	return matchesWindow((window: Window) => window.id === id);
}

/**
 * @todo
 * @param window
 * @param state
 */
export function testWindow(window: Window, state: WindowState): boolean {
	return window.state === state;
}

/**
 * Checks whether the current location of a {@link Window} is
 * identical to the specified {@param route}.
 * @param {Window} window - the window
 * @param {Route} route - the route
 * @returns `true` if location matches.
 */
export function matchesWindowLocation(window: Window, route: Route): boolean {
	return locationMatches(route, window.location);
}

/**
 * @todo
 * @param id
 * @param data
 * @param location
 */
export function newWindow(id: number, data: any, location: Route): Window {
	return {
		id,
		name: data.name,
		data,
		location: routeToLocation(location),
		title: data.name,
		state: ClosedWindowState,
		properties: {},
		isActive(route: Route): boolean {
			return matchesWindowLocation(this, route);
		},
	};
}

/**
 * @todo
 * @param window
 */
export function openWindow(window: Window): void {
	commit(ROOT_MODULE, OPEN_WINDOW, { window });
}

/**
 * @todo
 * @param window
 */
export function switchWindow(window: Window): void {
	commit(ROOT_MODULE, MINIMIZE_WINDOW);
	commit(ROOT_MODULE, OPEN_WINDOW, { window });
}

/**
 * @todo
 * @param window
 * @param payload
 */
export function updateWindow(window: Window, payload: any): void {
	commit(ROOT_MODULE, UPDATE_WINDOW, { window, payload });
}

/**
 * @todo
 * @param window
 * @param route
 */
export function updateWindowLocation(window: Window, route: Route): void {
	updateWindow(window, {
		location: routeToLocation(route),
	});
}

/**
 * @todo
 * @param window
 * @param title
 */
export function updateWindowTitle(window: Window, title: string): void {
	updateWindow(window, {
		title,
	});
}

/**
 * @todo
 * @param window
 * @param state
 */
export function updateWindowState(window: Window, state: WindowState): void {
	updateWindow(window, { state });
}

/**
 * @todo
 * @param serverId
 * @param route
 */
export async function resolveWindow(
	serverId: string,
	route: Route
): Promise<Window> {
	const allWindows: Array<Window> = get(ROOT_MODULE, GET_ALL_WINDOWS);

	const resolvedWindow: Window | undefined = allWindows.find(
		(window: Window) => window.data.id === parseInt(serverId)
	);

	if (resolvedWindow) {
		// trying to access a route other than a window that is already open.
		if (
			router.currentRoute.name !== resolvedWindow.location.name &&
			route.name !== resolvedWindow.location.name
		) {
			router.push(resolvedWindow.location).then(() => {
				updateWindowState(resolvedWindow, OpenWindowState);
			});
		} else updateWindowState(resolvedWindow, OpenWindowState);

		return resolvedWindow;
	}

	const window = newWindow(
		allWindows.length + 1,
		await loadServer(serverId),
		route
	);

	openWindow(window);
	return window;
}

/**
 * @todo
 * @param serverId
 * @param route
 */
export async function safeResolveWindow(
	serverId: string,
	route: Route
): Promise<Window> {
	const window = await resolveWindow(serverId, route);

	if (window.location.name != route.name) updateWindowLocation(window, route);

	return window;
}
