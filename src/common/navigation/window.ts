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
import { routeToLocation } from "@/common/utils/navigation";

export interface Window {
	id: number;

	name: string;

	data: any;

	title: string;

	state: WindowState;

	location: Location;
}

export const ClosedWindowState = "closed";
export const OpenWindowState = "open";
export const MinimizedWindowState = "minimized";
export type WindowState =
	| typeof OpenWindowState
	| typeof ClosedWindowState
	| typeof MinimizedWindowState;

/**
 * @todo
 */
export function getWindows(): Array<Window> {
	return get<Window[]>(ROOT_MODULE, GET_ALL_WINDOWS);
}

/**
 * @todo
 * @param state
 */
export function getWindowsBy(state: WindowState): Array<Window> {
	return get<Window[]>(ROOT_MODULE, GET_ALL_WINDOWS).filter(
		(window: Window) => window.state === state
	);
}

/**
 * @todo
 */
export function getOpenWindows(): Array<Window> {
	return getWindowsBy(OpenWindowState);
}

/**
 * @todo
 */
export function getMinimizedWindows(): Array<Window> {
	return getWindowsBy(MinimizedWindowState);
}

/**
 * @todo
 * @param id
 */
export function getWindow(id: number): Window | null {
	return undefinedToNull(
		get<Window[]>(ROOT_MODULE, GET_ALL_WINDOWS).find(
			(window: Window) => window.id === id
		)
	);
}

/**
 * @todo
 * @param window
 * @param state
 */
export function checkWindowState(window: Window, state: WindowState): boolean {
	return window.state === state;
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
	updateWindow(window, { title });
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
			return resolvedWindow;
		}

		updateWindowState(resolvedWindow, OpenWindowState);
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

export function matchesWindowLocation(window: Window, route: Route): boolean {
	return (
		route.name === window.location.name &&
		parseInt(route.params.serverId) === window.data.id
	);
}
