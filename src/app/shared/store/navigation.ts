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

import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	ClosedWindowState,
	OpenWindowState,
	Window
} from "@/app/shared/models/window";
import { isUndefined } from "@/app/shared/utils/any";
import { Route } from "vue-router";
import {
	locationMatches,
	routeToLocation
} from "@/app/shared/utils/navigation";
import Vue from "vue";
import store from "@/store";

@Module({
	name: "app-navigation",
	dynamic: true,
	store: store
})
export class AppNavigationStore extends VuexModule {
	private _windows: Window[] = [];

	public get windows(): Window[] {
		return this._windows;
	}

	public get getOpenWindows(): Window[] {
		return this._windows.filter(
			(value: Window) => value.state === OpenWindowState
		);
	}

	public getWindow(id: number): Window | undefined {
		return this._windows.find((window: Window) => {
			return window.id === id;
		});
	}

	public getWindowByData(id: any): Window | undefined {
		return this._windows.find((window: Window) => {
			return window.data.id === id;
		});
	}

	@Mutation
	public appendWindow(window: Window): void {
		this._windows.push(window);
	}

	@Mutation
	public updateWindow(id: number, payload: Partial<Window>): void {
		const window = this.getWindow(id);
		if (isUndefined(window)) throw new Error(`Window ${id} not found`);

		Object.assign(window, payload);
	}

	public createEmptyWindow(name: string, route: Route): Window {
		return {
			id: this._windows.length + 1,
			name,
			data: {},
			location: routeToLocation(route),
			title: name,
			state: ClosedWindowState,
			properties: {},
			isActive(route: Route): boolean {
				return locationMatches(route, this.location);
			}
		};
	}

	public createWindow(data: any, route: Route): Window {
		return {
			id: this._windows.length + 1,
			name: data.name,
			data,
			location: routeToLocation(route),
			title: data.name,
			state: ClosedWindowState,
			properties: {},
			isActive(route: Route): boolean {
				return locationMatches(route, this.location);
			}
		};
	}

	@Action
	public async resolveWindow(
		serverId: string,
		route: Route,
		factory: () => any
	): Promise<Window> {
		const resolvedWindow = this.getWindowByData(parseInt(serverId));
		if (resolvedWindow) {
			// trying to access a route other than a window that is already open.
			if (
				Vue.prototype.$router.currentRoute.name !==
					resolvedWindow.location.name &&
				route.name !== resolvedWindow.location.name
			) {
				Vue.prototype.$router.push(resolvedWindow.location).then(() => {
					this.updateWindow(resolvedWindow.id, {
						state: OpenWindowState
					});
				});
			} else {
				this.updateWindow(resolvedWindow.id, {
					state: OpenWindowState
				});
			}

			return resolvedWindow;
		}

		const window = this.createWindow(await factory(), route);
		this.updateWindow(window.id, {
			state: OpenWindowState
		});
		return window;
	}

	@Action
	public async resolveWindowThenUpdate(
		serverId: string,
		route: Route,
		factory: () => any
	): Promise<Window> {
		const window = await this.resolveWindow(serverId, route, factory);

		if (window.location.name != route.name) {
			this.updateWindow(window.id, {
				location: routeToLocation(route)
			});
		}

		return window;
	}
}
