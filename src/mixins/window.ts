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

import { ROOT_MODULE, updateWindowTitle } from "@/store";
import { Component, Prop, Vue } from "vue-property-decorator";
import {
	PANEL_SERVER_CONSOLE_ROUTE,
	PANEL_SERVER_FS_ROUTE,
	PANEL_SERVER_ROUTE,
} from "@/router";
import { GET_WINDOW } from "@/store/getters";
import { get } from "@/common/utils/vuex";
import { Dictionary } from "vue-router/types/router";
import { Window } from "@/common/navigation/window";

/**
 * This mixin is used in the child components of the server route, it serves as a short path
 * for mapping functions based on its `window` property.
 *
 * The functions will map to the {@link Vue.$store} that will obtain or define results for that specific window.
 */
@Component
export default class WindowMixin extends Vue {
	protected readonly DEFAULT_TAB = PANEL_SERVER_ROUTE;
	protected readonly CONSOLE_TAB = PANEL_SERVER_CONSOLE_ROUTE;
	protected readonly FS_TAB = PANEL_SERVER_FS_ROUTE;

	/**
	 * Represents the identification number of this {@link Window}.
	 * @protected
	 */
	@Prop({ type: Number, required: true }) protected readonly window!: number;

	/**
	 * Returns the object of this {@link Window} based on its identification number, windows
	 * can be null but this is never null because: if the component has not yet been destroyed,
	 * it is because it is open in the foreground or active in the background.
	 */
	public get getWindow(): Window {
		return get<Window>(ROOT_MODULE, GET_WINDOW, this.window);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public set getWindow(_window: Window) {}

	public get getServer(): any {
		return this.getWindow.data;
	}

	protected updateWindowTitle(title: string): void {
		updateWindowTitle(this.window, title);
	}
}
