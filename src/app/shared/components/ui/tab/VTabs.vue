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
	<div class="v--tabs-container" :class="{ 'align-with-hr': alignWithHr }">
		<ul class="v--tabs" role="tablist">
			<slot name="items" />
		</ul>
		<slot name="views" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, ProvideReactive, Vue } from "vue-property-decorator";
import { undefinedToNull } from "@/app/shared/utils/any";
import VTab from "@/app/shared/components/ui/tab/VTab.vue";

@Component<VTabs>({
	mounted(): void {
		let active: string | undefined = undefined;
		for (const child of this.children) {
			child.$on("update:tab", (tab: string) => {
				this.updateTab(tab);
			});

			if (active) break;
			if (child.active) active = child.tab;
		}

		this.updateTab(undefinedToNull(active || this.children[0]?.tab));
	}
})
export default class VTabs extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly alignWithHr!: boolean;

	@ProvideReactive()
	currentTab: string | null = null;

	get children(): VTab[] {
		return this.$children
			.filter((component: Vue) => component instanceof VTab)
			.map((component: Vue) => component as VTab);
	}

	updateTab(tab: string | null): void {
		this.currentTab = tab;
	}
}
</script>
