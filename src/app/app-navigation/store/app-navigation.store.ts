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
	isFunction,
	isNumber,
	isUndefined,
	undefinedToNull
} from "@/app/shared/utils";
import {
	AppNavigationWindow,
	AppNavigationWindowChildren,
	AppNavigationWindowComponent,
	AppNavigationWindowIcon,
	MinimizedNavigationWindowState,
	UpdateableAppNavigationWindow
} from "@/app/app-navigation/models/app-navigation-window.model";
import { arrayRemove } from "@/app/shared/utils/arrays";
import { generateRandomString } from "@/app/shared/utils/text";
import { Route } from "vue-router";

@Module({ name: "app-navigation", namespaced: true })
export class AppNavigationStore extends VuexModule {
	private _windows: AppNavigationWindow[] = [];

	/**
	 * Returns all stored windows.
	 */
	public get getWindows(): AppNavigationWindow[] {
		return this._windows;
	}

	/**
	 * Stores a new window.
	 * @param {Object} payload - The mutation payload.
	 * @param {AppNavigationWindow} payload.window - The window to be added.
	 */
	@Mutation
	public addWindow(payload: { window: AppNavigationWindow }): void {
		this._windows.push(payload.window);
	}

	@Mutation
	public addWindowChildren(payload: {
		window: AppNavigationWindow;
		children: AppNavigationWindowChildren;
	}): void {
		payload.window.children.push(payload.children);
	}

	@Mutation
	public removeWindowChildren(payload: {
		window: AppNavigationWindow;
		children: AppNavigationWindowChildren;
	}): void {
		arrayRemove(
			payload.window.children,
			(value) => value.id === payload.children.id
		);
	}

	@Mutation
	public updateWindowChildren(payload: {
		children: AppNavigationWindowChildren;
		value: Partial<AppNavigationWindowChildren>;
	}): void {
		Object.assign(payload.children, payload.value);
	}

	@Mutation
	public closeWindow(payload: { window: AppNavigationWindow }): void {
		arrayRemove(this._windows, (other) => other.id === payload.window.id);
	}

	/**
	 * Creates a new window.
	 * @param {Object} payload - The mutation payload.
	 * @param { Partial<AppNavigationWindow>} payload.properties - The newly
	 * created window properties.
	 */
	@Action
	public async createWindow(payload: {
		properties: Partial<AppNavigationWindow>;
	}): Promise<UpdateableAppNavigationWindow> {
		const updateChildFn = (
			children: AppNavigationWindowChildren,
			value: Partial<AppNavigationWindowChildren>
		) =>
			this.updateWindowChildren({
				children,
				value
			});

		const updateFn = (window: AppNavigationWindow, fn: Function) =>
			this.updateWindow({
				target: window,
				value: fn
			});

		return Object.assign(
			{
				id:
					this._windows.reduce(
						(max, value) => (value.id > max ? value.id : max),
						this._windows[0]?.id || 0
					) + 1,
				name: payload.properties.name,
				state: MinimizedNavigationWindowState,
				children: [],
				addChild(
					component: AppNavigationWindowComponent,
					location?: Route,
					title?: string
				): AppNavigationWindowChildren {
					const child: AppNavigationWindowChildren = {
						id: generateRandomString(),
						title,
						component,
						location,
						isActive: true,
						cache: undefined,
						icon: undefined,
						getIcon(): AppNavigationWindowIcon | null {
							return undefinedToNull(
								this.icon ||
									this.location?.meta.navigationWindow?.icon
							);
						}
					};

					updateFn(
						(this as unknown) as AppNavigationWindow,
						(window: AppNavigationWindow) => {
							(window.children as AppNavigationWindowChildren[]).push(
								child
							);
						}
					);

					return child;
				},
				getChild(id: string): AppNavigationWindowChildren | undefined {
					return this.children.find(
						(value: AppNavigationWindowChildren) => value.id === id
					);
				},
				getCurrentChild(): AppNavigationWindowChildren | undefined {
					const active = this.children.find(
						(value: AppNavigationWindowChildren) => value.isActive
					);
					if (isUndefined(active)) return undefined;

					return active;
				},
				update(
					child: AppNavigationWindowChildren,
					value: Partial<AppNavigationWindowChildren>
				) {
					updateChildFn(child, value);
				}
			},
			payload.properties
		) as UpdateableAppNavigationWindow;
	}

	/**
	 * Updates a already stored window.
	 * @param {Object} payload - The mutation payload.
	 * @param {AppNavigationWindow | number} payload.target - The window
	 * object or the window identification number.
	 * @param {Partial<AppNavigationWindow>} payload.value - the object
	 * that will be merged with the current window object.
	 */
	@Mutation
	public updateWindow(payload: {
		target: number | AppNavigationWindow;
		value:
			| Partial<AppNavigationWindow>
			| ((window: AppNavigationWindow) => void);
	}): void {
		let window: AppNavigationWindow | undefined;
		if (isNumber(payload.target)) {
			window = this._windows.find((value) => value.id === payload.target);
			if (isUndefined(window))
				throw new Error(`Window ${payload.target} not found`);
		} else window = payload.target as AppNavigationWindow;

		if (isFunction(payload.value))
			(payload.value as (window: AppNavigationWindow) => void)(window);
		else Object.assign(window, payload.value);
	}
}
