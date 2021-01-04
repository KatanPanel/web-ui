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
	<div class="v--field" :active="active" :disabled="disabled">
		<v-field-radio v-if="active" key="active-state" active>
			<v-icon name="check" />
		</v-field-radio>
		<v-field-radio v-else-if="disabled" key="blocked-state" disabled>
			&times;
		</v-field-radio>
		<v-field-radio v-else key="unknown-state" />
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VFieldRadio from "@/components/ui/field/VFieldRadio.vue";
@Component({
	components: { VFieldRadio, VIcon },
})
export default class VField extends Vue {
	@Prop({ type: Boolean, default: false }) private readonly active!: boolean;
	@Prop({ type: Boolean, default: false })
	private readonly disabled!: boolean;
}
</script>
