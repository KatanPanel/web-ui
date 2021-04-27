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
	<div v-if="window" :id="`window-${window.id}`" class="navigation-window">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, InjectReactive, Prop, Vue } from "vue-property-decorator";
import { OpenWindowState, Window } from "@/app/shared/models/window";
import { AppNavigationStore } from "@/app/shared/store/navigation";
import { inject } from "inversify-props";

@Component<NavigationWindow>({
	created(): void {
		this.window = this.appNavigationStore.createEmptyWindow(
			this.name,
			this.$route
		);
	},
	beforeMount(): void {
		this.appNavigationStore.updateWindow(this.window?.id as number, {
			state: OpenWindowState
		});
	}
})
export default class NavigationWindow extends Vue {
	@inject()
	private readonly appNavigationStore!: AppNavigationStore;

	@Prop({ type: String, required: true })
	private readonly name!: string;

	@InjectReactive()
	private window: Window | null = null;
}
</script>
