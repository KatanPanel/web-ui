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
		@click="onClick"
		:active="state"
		v-bind="{ 'aria-selected': state }"
		class="v--tab"
		role="tab"
	>
		<slot />
	</li>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import VTabs from "@/components/ui/tab/VTabs.vue"
import VTabView from "@/components/ui/tab/VTabView.vue"

@Component
export default class VTab extends Vue {
	@Prop({ type: String, required: true }) public readonly tab!: string
	@Prop({ type: Boolean, default: false }) public readonly active!: boolean

	public state = this.active
	public view!: VTabView

	mounted(): void {
		const view = document.getElementById(`tab-view-${this.tab}`)
		if (!view) throw new Error(`Tab view not found for ${this.tab}.`)

		this.view = (view as never)["__vue__"] as VTabView

		// ensure that the view is displayed if the tab is the active default.
		this.view.active = this.state
	}

	@Watch("state")
	private onStateChange(value: boolean): void {
		this.view.active = value
	}

	private onClick(e: Event): void {
		e.stopPropagation()

		if (this.state) return

		const parent = this.$parent
		if (!(parent instanceof VTabs)) {
			throw new Error("Cannot find tab root.")
		}

		parent.setTab(this)
	}
}
</script>
