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
	<div :class="$style.component">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { isNull, isUndefined } from "@/app/shared/utils";
import VField from "@/app/shared/components/ui/field/VField.vue";

@Component<VFieldList>({
	mounted(): void {
		for (const child of this.$children) {
			if (!(child instanceof VField))
				throw new Error(
					"Only fields can be defined inside a field list"
				);

			const key = child.$vnode.key;
			if (isUndefined(key) || isNull(key))
				throw new Error("Field must have a key attribute");

			if (child.active) this.currentField = key;
		}

		this.$on("select", (field: VField) => {
			this.onFieldSelect(field);
		});
	}
})
export default class VFieldList extends Vue {
	currentField: (string | number) | null = null;

	onFieldSelect(field: VField): void {
		this.currentField = field.$vnode.key as string | number;
	}

	/* onSelectionUp(): void {
			let index = this.currentFieldIndex;
			if (index === null || index === 0) index = this.themes.length - 1;
			else index--;

			this.selectTheme(index, this.themes[index]);
		}

		onSelectionDown(): void {
			let index = this.currentFieldIndex;
			if (index === null || index === this.themes.length - 1) index = 0;
			else index++;

			this.selectTheme(index, this.themes[index]);
		} */
}
</script>
<style lang="scss" module>
.component {
	display: flex;
	flex-direction: column;
}
</style>
