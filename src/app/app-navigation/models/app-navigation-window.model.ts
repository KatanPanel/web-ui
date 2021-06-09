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

import { Route } from "vue-router";
import Vue, { AsyncComponent, ComponentOptions } from "vue";

export type AppNavigationWindowComponent =
	| ComponentOptions<Vue>
	| typeof Vue
	| AsyncComponent;

export interface AppNavigationWindow {
	readonly id: number;
	readonly name: string;
	readonly children: AppNavigationWindowChildren[];
	state: AppNavigationWindowState;

	addChild(
		component: AppNavigationWindowComponent,
		location?: Route,
		title?: string
	): AppNavigationWindowChildren;

	getChild(id: number): AppNavigationWindowChildren | undefined;

	getCurrentChild(): AppNavigationWindowChildren | undefined;
}

export const AppNavigationWindowEmojiIcon = "emoji";
export const AppNavigationWindowSvgIcon = "svg";

export interface AppNavigationWindowIcon {
	type:
		| typeof AppNavigationWindowSvgIcon
		| typeof AppNavigationWindowEmojiIcon;
	value: string;
}

export interface AppNavigationWindowChildren {
	readonly id: string;
	location: Route | undefined;
	component: AppNavigationWindowComponent;
	isActive: boolean;
	cache: (() => Vue) | undefined;
	title: string | undefined;
	icon: AppNavigationWindowIcon | undefined;

	getIcon(): AppNavigationWindowIcon | null;
}

export interface UpdateableAppNavigationWindow
	extends Readonly<AppNavigationWindow> {
	update(
		child: AppNavigationWindowChildren,
		value: Partial<AppNavigationWindowChildren>
	): void;
}

export const ClosedNavigationWindowState = "closed";
export const OpenNavigationWindowState = "open";
export const MinimizedNavigationWindowState = "minimized";

export type AppNavigationWindowState =
	| typeof OpenNavigationWindowState
	| typeof ClosedNavigationWindowState
	| typeof MinimizedNavigationWindowState;
