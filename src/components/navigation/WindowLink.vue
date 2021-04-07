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
	<router-link
		v-if="window"
		:tag="tag"
		:to="{
			name: loc.name,
			params: { ...window.location.params, ...loc.params },
		}"
	>
		<slot/>
	</router-link>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Location} from "vue-router";
import {getWindow, Window} from "@/common/navigation/window";

@Component<WindowLink>({
	mounted(): void {
		// window id have been passed as prop
		if (this.check) {
			this.window = getWindow(this.check);
			if (!this.to) this.loc = this.window?.location!;
			return;
		}

		let parent: any = this.$parent;

		// considering that the component can be used in a `VTabs`
		// block we need to find the closest window parent to it.
		while (!parent.window) parent = parent.$parent;

		this.window = parent.getWindow;
	},
})
export default class WindowLink extends Vue {
	@Prop({ type: String, required: false, default: "li" })
	private readonly tag!: string;

	@Prop({ type: Object, required: false })
	private to!: Location;

	// avoid direct prop "to" mutation
	private loc: Location = this.to;

	@Prop({ type: Number, required: false })
	private readonly check!: number;

	window: Window | number | null = null;
}
</script>
