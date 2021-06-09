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
	<v-flex-box class="my-account">
		<TheUserSettingsSidebar />
		<v-flex-element :basis="0" :grow="1" class="my-account-info">
			<v-container>
				<router-view />
			</v-container>
		</v-flex-element>
	</v-flex-box>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VContainer from "@/app/shared/components/ui/layout/VContainer.vue";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";
import VFlexElement from "@/app/shared/components/ui/layout/VFlexElement.vue";
import VBox from "@/app/shared/components/ui/box/VBox.vue";
import TheUserSettingsSidebar from "@/app/user-settings/components/TheUserSettingsSidebar.vue";

@Component({
	components: {
		TheUserSettingsSidebar,
		VBox,
		VFlexElement,
		VFlexBox,
		VContainer
	}
})
export default class UserSettingsMain extends Vue {}
</script>
<style lang="scss" scoped>
.my-account {
	flex-grow: 1;

	.my-account-info {
		margin: 24px 0;
	}
}
</style>
