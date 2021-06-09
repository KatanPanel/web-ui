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
	<div v-if="isEmojiIcon" key="emoji" class="emoji-icon">
		{{ icon.value }}
	</div>
	<div v-else-if="isSvgIcon" key="svg" class="svg-icon">
		<v-icon :name="icon.value" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
	AppNavigationWindowEmojiIcon,
	AppNavigationWindowIcon,
	AppNavigationWindowSvgIcon
} from "@/app/app-navigation/models/app-navigation-window.model";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";

@Component({
	components: { VIcon }
})
export default class AppNavigationNavigationWindowIcon extends Vue {
	@Prop({ type: Object, required: true })
	private readonly icon!: AppNavigationWindowIcon | null;

	get isEmojiIcon(): boolean {
		return this.icon?.type === AppNavigationWindowEmojiIcon;
	}

	get isSvgIcon(): boolean {
		return this.icon?.type === AppNavigationWindowSvgIcon;
	}
}
</script>
