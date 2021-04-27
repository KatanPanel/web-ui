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

import { Component, Vue } from "vue-property-decorator";

@Component
export default class WindowMixin extends Vue {}

/**
 * This mixin can be applied to any route that is necessarily
 * possible to be applied as a {@link Window}, open in the background.
 *
 * It has automatic features like automatic definition
 * of the page title, update of the window title and help
 * methods for manipulating the window.
 *
 * All methods are mapped to the {@link Vue#$store} using the window
 * {@link Window#id} as a parameter so everything is computed.
 */
/* @Component<WindowMixin>({
	metaInfo(): MetaInfo {
		return generateMetaInfo(this.getWindow.location.name as string, {
			server: this.getServer.name
		});
	},
	activated(): void {
		if (!this.useWindowHooks) return;

		updateWindowTitle(
			this.getWindow,
			this.$i18n.t(`navigation.windows.${this.getWindow.location.name}`, {
				server: this.getServer.name
			}) as string
		);
	}
})
export default class WindowMixin extends Vue {
	@Prop({ type: Number, required: true }) protected readonly window!: number;

	/**
	 * Should you update the {@link Window} title when this component is activated or deactivated?
	 * @private
	 */
// @Prop({ type: Boolean, default: true })
// protected readonly useWindowHooks!: boolean;

/**
 * Returns the object of this {@link Window} based on its identification number, windows
 * can be null but this is never null because: if the component has not yet been destroyed,
 * it is because it is open in the foreground or active in the background.
 */
// public get getWindow(): Window {
// 	return get<Window>(ROOT_MODULE, GET_WINDOW, this.window);
// }

// eslint-disable-next-line @typescript-eslint/no-empty-function
// public set getWindow(_window: Window) {}

/**
 * @deprecated It should be stopped using soon.
 * @protected
 */
/* protected get getServer(): any {
		return this.getWindow.data;
	} */

/**
 * Returns the title of the current {@link Window} translated into the current language.
 * @protected
 */
/* public getWindowTitle(): string {
		return this.$i18n.t(
			`navigation.windows.${this.getWindow.location.name}`,
			{
				server: this.getServer.name
			}
		) as string;
	} */

/**
 * Returns the value of a window's current route parameter.
 * @param {string} key - the parameter key.
 */
/* public getWindowParameter(key: string): string {
		return (this.getWindow.location.params as Dictionary<string>)[key];
	} */

/**
 * Returns a property for this {@link Window}.
 * @param {string} key - the property key.
 */
/* public getWindowProperty(key: string): any | null {
		return this.getWindow.properties[key] || null;
	} */

/**
 * Sets a property of this {@link Window} to the specified {@param value}.
 * @param {string} key - the property key.
 * @param {string} value - the new property value.
 */
/* public setWindowProperty(key: string, value: any) {
		this.getWindow.properties[key] = value;
	} */

/**
 * Sets a property of this {@link Window} to the specified {@param value}.
 * This method does the same thing as {@link setWindowProperty} but the difference is that
 * it calls Vue reactivity handlers.
 * @param {string} key - the property key.
 * @param {string} value - the new property value.
 */
/* public setReactiveWindowProperty(key: string, value: any) {
		Vue.set(this.getWindow.properties, key, value);
	}
} */
