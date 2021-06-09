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
	<li
		v-bind="{
			'aria-selected': isActive,
			'aria-controls': `tab-view-${tab}`,
			role: link ? 'presentation' : 'tab'
		}"
		@click="updateTab"
		@keyup.enter="updateTab"
		:class="{ active: isActive }"
		:tabindex="!disabled ? '0' : '-1'"
		:disabled="disabled"
		class="v--tab"
	>
		<slot v-if="!link" />
		<router-link v-else :to="link" role="tab">
			<slot />
		</router-link>
	</li>
</template>
<script lang="ts">
import { Component, InjectReactive, Prop, Vue } from "vue-property-decorator";
import { RawLocation } from "vue-router";
import { isUndefined } from "@/app/shared/utils";

@Component
export default class VTab extends Vue {
	@Prop({ type: String, required: true })
	public readonly tab!: string;

	@Prop({ type: Boolean, default: false })
	public readonly active!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly disabled!: boolean;

	@Prop({ type: Object })
	private readonly link!: RawLocation;

	@InjectReactive()
	readonly currentTab!: string | null;

	get isActive(): boolean {
		// links have its own active state checking
		if (!isUndefined(this.link)) return false;
		return this.currentTab === this.tab;
	}

	updateTab(): void {
		if (this.disabled || !isUndefined(this.link)) return;
		this.$emit("update:tab", this.tab);
	}
}
</script>
