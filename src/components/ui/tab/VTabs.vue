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
	<ul class="v--tabs">
		<slot />
	</ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VTab from "@/components/ui/tab/VTab.vue";

@Component
export default class VTabs extends Vue {
	private currentTab: VTab | null = null;

	mounted(): void {
		let active: VTab | null = null;
		const tabs: Array<VTab> = this.$children
			.filter((component: Vue) => component instanceof VTab)
			.map((component: Vue) => component as VTab);

		for (const child of tabs) {
			// checks if it already has an active tab, if any it will be used with the default one.
			if (child.active) {
				if (active) throw new Error("Cannot use multiple active tabs.");
				active = child;
			}
		}

		const next = active || tabs[0];
		if (next) this.setTab(next);
	}

	public setTab(tab: VTab): void {
		if (this.currentTab) this.currentTab!.state = false;

		this.currentTab = tab;
		this.currentTab!.state = true;
	}
}
</script>
