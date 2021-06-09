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
	<div
		v-bind="{
			'aria-disabled': disabled,
			tabIndex: disabled ? -1 : 0
		}"
		:class="[
			$style.component,
			{
				[$style.componentActive]: active,
				disabled: disabled
			}
		]"
		@click="onSelect"
		@keydown.enter="onSelect"
	>
		<div :class="$style.content">
			<slot />
		</div>
		<div v-if="$scopedSlots.radio" key="custom-radio" :class="$style.radio">
			<slot name="radio" />
		</div>
		<div v-else-if="active" key="active-radio" :class="$style.radio">
			<slot name="radio">
				<v-icon name="done" />
			</slot>
		</div>
	</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import { UiActivable } from "@/app/shared/mixins/ui/ui-activable";

@Component({
	components: { VIcon }
})
export default class VField extends mixins(UiActivable) {
	onSelect(): void {
		if (this.disabled) return;

		this.$emit("select");
	}
}
</script>
<style lang="scss" module>
.component {
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	list-style-type: none;
	min-height: 40px;
	background-color: var(--kt-background-secondary);
	border-radius: 4px;
	font-size: 14px;
	font-weight: 500;
	user-select: none;
	border: 1px solid var(--kt-border-color);
	margin: 4px 0;

	&:hover {
		cursor: pointer;
	}

	&:not(.componentActive):hover {
		border-color: var(--kt-border-accent);
	}
}

.componentActive {
	border-color: var(--kt-border-accent);

	.radio {
		svg {
			fill: var(--kt-primary-color);
		}
	}
}

.content {
	flex-grow: 1;
	padding: 8px;
	justify-content: center;
	display: inline-flex;
	flex-direction: column;
}

.radio {
	margin: 8px;
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
