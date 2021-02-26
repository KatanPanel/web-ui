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

import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export class Toggleable extends Vue {
	// preset
	@Prop({ type: Boolean, default: false, required: false })
	protected readonly active!: boolean;

	private _active = this.active;

	@Watch("_active")
	private onToggle(value: boolean): void {
		this.$emit("toggle", value);
	}

	/**
	 * Defines the current state of the component for the specified parameter
	 * or inverts the current state value if no parameter is specified.
	 * @param {boolean?} value - the new state value.
	 */
	public toggle(value?: boolean): void {
		this._active = value || !this._active;
	}
}
