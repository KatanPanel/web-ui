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
		:active="active"
		:class="{ 'v--field-selected': selected }"
		:disabled="disabled"
		class="v--field"
		@click="onSelect"
		@mouseenter="onMouseIn"
		@mouseleave="onMouseOut"
	>
		<v-field-radio
			v-if="active"
			key="active-state"
			ref="radio"
			active="true"
		>
			<slot name="radio">
				<v-icon name="check" />
			</slot>
		</v-field-radio>
		<v-field-radio
			v-else-if="disabled"
			key="disabled-state"
			ref="radio"
			disabled="true"
		>
			<slot name="radio">&times;</slot>
		</v-field-radio>
		<v-field-radio v-else-if="selected" key="selected-state" ref="radio">
			<slot name="radio" />
		</v-field-radio>
		<v-field-radio v-else key="unknown-state" ref="radio">
			<slot name="radio" />
		</v-field-radio>
		<v-flex-box class="v--flex-align-center v--full-width v--flex-column">
			<div v-show="!contentVisible" class="v--field-body">
				<slot />
			</div>
			<v-field-content v-show="contentVisible" ref="content">
				<slot name="content" />
			</v-field-content>
		</v-flex-box>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import VFieldContent from "@/app/shared/components/ui/field/VFieldContent.vue";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import VFieldRadio from "@/app/shared/components/ui/field/VFieldRadio.vue";
import { Activable } from "@/app/shared/mixins/ui/activable";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";

@Component({
	components: { VFieldContent, VFlexBox, VFieldRadio, VIcon }
})
export default class VField extends mixins(Activable) {
	@Prop({ type: Boolean, default: false })
	private readonly hiddenRadio!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly selectOnClick!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly selectedByDefault!: boolean;
	private selected = this.selectedByDefault;

	@Prop({ type: Boolean, default: false })
	private readonly withContent!: boolean;
	private contentVisible = false;

	private onMouseIn(): void {
		if (!this.withContent) return;

		if (this.contentVisible) return;

		this.contentVisible = true;
	}

	private onMouseOut(): void {
		if (!this.withContent) return;

		if (!this.contentVisible) return;

		this.contentVisible = false;
	}

	private onSelect(e: Event): void {
		e.stopPropagation();
		if (this.withContent) {
			if (
				e.target !== this.$el &&
				e.target !== (this.$refs["content"] as Vue).$el &&
				e.target !== (this.$refs["radio"] as Vue).$el
			) {
				return;
			}
		}
		if (!this.selectOnClick) return;

		this.selected = !this.selected;
		this.$emit("select", this.selected);
	}
}
</script>
