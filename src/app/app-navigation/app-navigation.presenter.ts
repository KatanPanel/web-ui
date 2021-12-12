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

import { injectable } from "inversify";
import { lazyInject } from "@/di";
import { AppNavigationStore } from "@/app/app-navigation/store/app-navigation.store";
import {
	AppNavigationWindow,
	AppNavigationWindowChildren,
	AppNavigationWindowComponent,
	AppNavigationWindowState,
	MinimizedNavigationWindowState,
	OpenNavigationWindowState,
	UpdateableAppNavigationWindow
} from "@/app/app-navigation/models/app-navigation-window.model";
import { Route } from "vue-router";
import { inject } from "inversify-props";
import Vue from "vue";
import { isUndefined, undefinedToNull } from "@/app/shared/utils";
import { routeToLocation } from "@/app/app-navigation/utils/navigation";

/**
 *
 */
@injectable()
export class AppNavigationPresenter {
	/**
	 * The navigation module state manager.
	 * @private
	 */
	@lazyInject()
	private readonly appNavigationStore!: AppNavigationStore;

	/**
	 * @constructor
	 * @param {Vue} vue - The current Vue instance.
	 */
	constructor(@inject() private readonly vue: Vue) {}

	/**
	 * Returns the navigation window that is currently open or null
	 * if there is no window open.
	 */
	public get getOpenWindow(): AppNavigationWindow | null {
		return undefinedToNull(
			this.getWindows.find(
				(value) => value.state === OpenNavigationWindowState
			)
		);
	}

	/**
	 * Returns all created navigation windows.
	 */
	public get getWindows(): AppNavigationWindow[] {
		return this.appNavigationStore.getWindows;
	}

	/**
	 * Returns the window that has the specified id or undefined if there
	 * is no window with that id.
	 * @param {number} id - The navigation window id.
	 */
	public getWindowById(id: number): AppNavigationWindow | undefined {
		return this.getWindows.find((value) => value.id === id);
	}

	/**
	 * Returns all windows whose state is included within the specified states.
	 * @param {AppNavigationWindowState} state - The states to be searched
	 */
	public getWindowsBy(
		...state: AppNavigationWindowState[]
	): AppNavigationWindow[] {
		return this.appNavigationStore.getWindows.filter(
			(value: AppNavigationWindow) => state.includes(value.state)
		);
	}

	public async createNavigationWindow(
		vm: Vue,
		properties?: Partial<AppNavigationWindow>
	): Promise<UpdateableAppNavigationWindow> {
		(vm as any).katan = true;
		console.log("Create window with", vm);

		return this.appNavigationStore
			.createWindow({ properties: properties || {} })
			.then((window) => {
				this.addWindow(window);
				return window;
			});
	}

	public addWindow(window: AppNavigationWindow): void {
		this.appNavigationStore.addWindow({ window });
	}

	public updateWindow(
		target: number | AppNavigationWindow,
		value: Partial<AppNavigationWindow>
	): void {
		this.appNavigationStore.updateWindow({
			target,
			value
		});
	}

	public async openNavigationWindow(
		vm: Vue,
		window: AppNavigationWindow
	): Promise<Route | void> {
		// minimize all other open windows
		for (const other of this.getWindowsBy(OpenNavigationWindowState)) {
			this.updateWindow(other, {
				state: MinimizedNavigationWindowState
			});
		}

		const activeChild = window.getCurrentChild();

		// fast path -- just mark as open
		if (isUndefined(activeChild)) {
			this.updateWindow(window, {
				state: OpenNavigationWindowState
			});
			return;
		}

		// slow path -- resolve window location
		const location = routeToLocation(activeChild.location!);
		if (location.name !== vm.$route.name)
			return vm.$router.push(location).then(() => {
				this.updateWindow(window, {
					state: OpenNavigationWindowState
				});
			});
		else
			this.updateWindow(window, {
				state: OpenNavigationWindowState
			});

		const child = window.getCurrentChild() || window.children[0];
		if (!isUndefined(child)) {
			child.isActive = true;
			// child.isCached = true;
		}

		this.updateWindow(window, {
			state: OpenNavigationWindowState
		});
	}

	public closeWindow(window: AppNavigationWindow, vm: Vue): void {
		if (window.state === OpenNavigationWindowState) {
			const other =
				this.getWindowById(window.id + 1) ||
				this.getWindowById(window.id - 1);
			if (isUndefined(other)) return;

			this.updateWindow(other, {
				state: OpenNavigationWindowState
			});

			/* if (!isUndefined(other.location)) {
				vm.$router.push(routeToLocation(other.location)).then(() => {
					this.appNavigationStore.closeWindow({ window });
				});
				return;
			} */
		}

		this.appNavigationStore.closeWindow({ window });
	}

	public replaceWindowChildren(
		window: AppNavigationWindow,
		children: Partial<AppNavigationWindowChildren>
	): void {
		const current = window.getCurrentChild();
		if (!isUndefined(current)) current.isActive = false;

		const target = window.children.find(
			(value) => value.location?.name === children.location?.name
		);
		if (!isUndefined(target)) {
			target.isActive = true;
			return;
		}

		this.addNavigationWindowChild(window, children);
	}

	public addNavigationWindowChild(
		navigationWindow: AppNavigationWindow,
		childProperties: Partial<AppNavigationWindowChildren>
	): void {
		navigationWindow.addChild(
			childProperties.component as AppNavigationWindowComponent,
			childProperties.location,
			childProperties?.title
		).isActive = true;
	}

	public removeWindowChildren(
		window: AppNavigationWindow,
		children: AppNavigationWindowChildren
	): void {
		this.appNavigationStore.removeWindowChildren({ window, children });
	}

	public routeToChildProperties(
		from: Route
	): Partial<AppNavigationWindowChildren> {
		const lastMatch = from.matched[1];
		return {
			location: from,
			component: lastMatch.components.default
		};
	}
}
