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
		<v-modal-title v-if="hasTitle" :class="$style.title">
			<slot name="title" />
		</v-modal-title>
		<div :class="$style.body">
			<slot />
		</div>
		<v-modal-footer v-if="hasFooter" :class="$style.footer">
			<slot name="footer" />
		</v-modal-footer>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { isUndefined } from "@/app/shared/utils";
import VModalTitle from "@/app/shared/components/ui/modal/VModalTitle.vue";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import VModalFooter from "@/app/shared/components/ui/modal/VModalFooter.vue";

@Component({
	components: { VModalFooter, VIcon, VModalTitle }
})
export default class VModal extends Vue {
	get hasTitle(): boolean {
		return !isUndefined(this.$scopedSlots.title);
	}

	get hasFooter(): boolean {
		return !isUndefined(this.$scopedSlots.footer);
	}

	close(): void {
		this.$emit("close");
	}
}
</script>
<style lang="scss" module>
.component {
	font-size: 14px;
}

.title {
	padding: 18px 18px 0;
	font-size: 24px;
	font-weight: 600;
}

.body {
	padding: 18px;
}

.footer {
	padding: 18px;
}
</style>
