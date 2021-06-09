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
import { lazyInject } from "@/ioc";
import { AppNavigationStore } from "@/app/app-navigation/store/app-navigation.store";
import {
	AppNavigationWindow,
	AppNavigationWindowChildren,
	AppNavigationWindowComponent,
	AppNavigationWindowState,
	OpenNavigationWindowState,
	UpdateableAppNavigationWindow
} from "@/app/app-navigation/models/app-navigation-window.model";
import { Route } from "vue-router";
import { inject } from "inversify-props";
import Vue from "vue";
import { lazyComponent } from "@/app/shared/utils/builtin";
import { isUndefined } from "@/app/shared/utils";

@injectable()
export class AppNavigationPresenter {
	@lazyInject() private readonly appNavigationStore!: AppNavigationStore;

	constructor(@inject() private readonly vue: Vue) {}

	public get getOpenWindow(): AppNavigationWindow | undefined {
		return this.getWindows.find(
			(value) => value.state === OpenNavigationWindowState
		);
	}

	public get getWindows(): AppNavigationWindow[] {
		return this.appNavigationStore.getWindows;
	}

	public getWindowById(id: number): AppNavigationWindow | undefined {
		return this.getWindows.find((value) => value.id === id);
	}

	public getWindowsBy(
		...state: AppNavigationWindowState[]
	): AppNavigationWindow[] {
		return this.appNavigationStore.getWindows.filter(
			(value: AppNavigationWindow) => state.includes(value.state)
		);
	}

	public async createWindow(
		vm: Vue,
		properties: Partial<AppNavigationWindow>
	): Promise<UpdateableAppNavigationWindow> {
		return this.appNavigationStore
			.createWindow({ properties })
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

	public async openWindow(
		window: AppNavigationWindow,
		vm: Vue
	): Promise<Route | void> {
		/* // minimize all other open windows
		for (const other of this.getWindowsBy(OpenNavigationWindowState)) {
			this.updateWindow(other, {
				state: MinimizedNavigationWindowState
			});
		}

		// fast path -- just mark as open
		if (isUndefined(window.location)) {
			this.updateWindow(window, {
				state: OpenNavigationWindowState
			});
			return;
		}

		// slow path -- resolve window location
		const location = routeToLocation(window.location);
		if (location.name !== vm.$route.name)
			return vm.$router.push(location).then(() => {
				this.updateWindow(window, {
					state: OpenNavigationWindowState
				});
			});
		else
			this.updateWindow(window, {
				state: OpenNavigationWindowState
			}); */

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

		this.addWindowChildren(window, children);
	}

	public addWindowChildren(
		window: AppNavigationWindow,
		children: Partial<AppNavigationWindowChildren>
	): void {
		window.addChild(
			children.component as AppNavigationWindowComponent,
			children.location,
			children.title
		).isActive = true;
	}

	public removeWindowChildren(
		window: AppNavigationWindow,
		children: AppNavigationWindowChildren
	): void {
		this.appNavigationStore.removeWindowChildren({ window, children });
	}

	public generateWindowChildren(
		from: Route
	): Partial<AppNavigationWindowChildren> {
		const lastMatch = from.matched[from.matched.length - 1];
		return {
			location: from,
			component: lastMatch.components.default
		};
	}

	public openCreateResourceModal(vm: Vue): void {
		vm.$modal.show(
			lazyComponent("AppCreateResourceModal"),
			{},
			{ height: "auto", width: "50%" }
		);
	}

	public openNavigationWindowEditModal(vm: Vue, windowName: string): void {
		vm.$modal.show(
			lazyComponent("AppNavigationWindowEditModal", "app-navigation"),
			{ windowName },
			{ height: "auto", width: "50%" }
		);
	}

	public openNavigationWindowCloseModal(
		vm: Vue,
		window: AppNavigationWindow
	): void {
		vm.$modal.show(
			lazyComponent("AppNavigationWindowCloseModal", "app-navigation"),
			{ window },
			{ height: "auto", width: "50%" }
		);
	}
}
