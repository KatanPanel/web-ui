<!--
  - Copyright (c) 2020-present Katan
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  - copies of the Software, and to permit persons to whom the Software is
  - furnished to do so, subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  - IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  - FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  - AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  - LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  - OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  - SOFTWARE.
  -->

<template>
	<span
		v-tooltip="{
			content: displayValue,
			hideOnTargetClick: false,
			classes: ['v--tooltip', error ? 'v--tooltip-error' : '']
		}"
		:style="{ cursor: 'pointer', zIndex: 1 }"
		@click="onClick"
	>
		<slot />
	</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { copyValue } from "@/app/shared/utils/dom";

@Component<Copyable>({
	beforeDestroy(): void {
		this.resetScheduler();
	}
})
export default class Copyable extends Vue {
	@Prop({ type: String, required: true }) private readonly copyValue!: string;
	private copied = false;
	private error: string | null = null;
	private scheduler: number | null = null;

	get displayValue(): string {
		return this.error !== null
			? this.error
			: this.copied
			? (this.$i18n.t("ui.copyable.copied") as string)
			: (this.$i18n.t("ui.copyable.click-to-copy") as string);
	}

	updateClipboard(): void {
		copyValue(this.copyValue)
			.then(() => {
				this.copied = true;
				this.resetScheduler();
			})
			.catch(() => {
				this.error = this.$i18n.t(
					"ui.copyable.unable-to-copy"
				) as string;
				this.resetScheduler();
			});
	}

	resetScheduler() {
		if (this.scheduler !== null) clearTimeout(this.scheduler);

		this.scheduler = setTimeout(() => {
			this.copied = false;
			this.error = null;
		}, 3000);
	}

	private onClick(e: Event): void {
		if (this.copied) return;

		// stop propagation to hiddeable
		// ("toggle on click" like) outer containers
		e.stopPropagation();

		navigator.clipboard
			.readText()
			.then((value) => {
				if (value === this.copyValue) {
					this.error = this.$i18n.t(
						"ui.copyable.already-copied"
					) as string;
					this.resetScheduler();
					return;
				}
			})
			.finally(() => {
				if (!this.error) this.updateClipboard();
			});
	}
}
</script>
