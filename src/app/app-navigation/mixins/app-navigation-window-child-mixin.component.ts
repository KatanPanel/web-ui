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

import { Component, InjectReactive, Prop, Vue } from "vue-property-decorator";
import {
	AppNavigationWindowChildren,
	UpdateableAppNavigationWindow
} from "@/app/app-navigation/models/app-navigation-window.model";
import { isUndefined } from "@/app/shared/utils";

@Component<AppNavigationWindowChildMixin>({
	created(): void {
		if (isUndefined(this.windowChild.title))
			this.updateWindow({
				title: this.$i18n.t(
					`navigation.windows.${this.$route.name}`
				) as string
			});
	},
	beforeMount(): void {
		if (isUndefined(this.window)) this.$destroy();
	},
	mounted(): void {
		if ((this as any)._isDestroyed) this.$el.remove();
	}
})
export class AppNavigationWindowChildMixin extends Vue {
	@InjectReactive()
	protected readonly window!: UpdateableAppNavigationWindow | null;

	@Prop({ type: Object, required: true })
	protected readonly windowChild!: AppNavigationWindowChildren;

	protected updateWindow(value: Partial<AppNavigationWindowChildren>): void {
		this.window?.update(this.windowChild, value);
	}
}
