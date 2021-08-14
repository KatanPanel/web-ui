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
		v-if="!link"
		key="item"
		v-bind="{ 'aria-disabled': disabled }"
		v-tooltip.right="{
			content: tooltip,
			placement: 'right',
			classes: 'tooltip inverse',
			popperOptions: {
				preventOverflow: false
			}
		}"
		:tabindex="disabled ? -1 : 0"
	>
		<slot />
	</li>
	<router-link
		v-else
		key="link"
		v-bind="{ 'aria-disabled': disabled }"
		v-tooltip="{
			content: tooltip,
			placement: 'right',
			classes: 'tooltip inverse',
			popperOptions: {
				preventOverflow: false
			}
		}"
		:exact="linkExact"
		:to="link"
		tabindex="-1"
		tag="li"
	>
		<a v-if="linkRedirectable">
			<slot />
		</a>
		<slot v-else />
	</router-link>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import TheLogo from "@/app/shared/components/TheLogo.vue";
import type { RawLocation } from "vue-router";
import { mixins } from "vue-class-component";
import { UiActivable } from "@/app/shared/mixins/ui/ui-activable";

@Component({
	components: { VIcon, TheLogo }
})
export default class AppSidebarItem extends mixins(UiActivable) {
	@Prop({ type: Object, required: false })
	private readonly link!: RawLocation;

	@Prop({ type: Boolean, default: false })
	private readonly linkExact!: boolean;

	@Prop({ type: Boolean, default: true })
	private readonly linkRedirectable!: boolean;

	@Prop({ type: String, required: false })
	private readonly tooltip!: string;
}
</script>
<style lang="scss" scoped>
li {
	list-style-type: none;
	margin: 12px 0;

	&:first-child {
		margin-top: 24px;
	}

	a {
		padding: 8px 4px;
		border-radius: 50%;

		&:hover,
		&:focus {
			background-color: var(--kt-sidebar-link-hover);
		}

		::v-deep svg {
			width: 30px;
			height: 30px;
			fill: var(--kt-primary-text-color);
		}
	}
}
</style>
