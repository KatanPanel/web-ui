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
		v-if="isActive"
		:id="`navigation-window-${navigationWindow.id}`"
		v-bind="{
			'aria-hidden': !isVisible,
			tabindex: isVisible ? 0 : -1
		}"
	>
		<div v-for="child in navigationWindow.children" :key="child.id">
			<keep-alive>
				<component
					:is="child.component"
					v-if="child.isActive"
					v-bind="childrenParametersAsProps(child)"
					:window-child="child"
				/>
			</keep-alive>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, ProvideReactive, Vue } from "vue-property-decorator";
import {
	AppNavigationWindowChildren,
	ClosedNavigationWindowState,
	OpenNavigationWindowState,
	UpdateableAppNavigationWindow
} from "@/app/app-navigation/models/app-navigation-window.model";
import VForm from "@/app/shared/components/ui/form/VForm.vue";
import VFormInputGroup from "@/app/shared/components/ui/form/VFormInputGroup.vue";
import VFormInputIcon from "@/app/shared/components/ui/form/VFormInputIcon.vue";
import VFormInput from "@/app/shared/components/ui/form/VFormInput.vue";

@Component<AppNavigationNavigationWindow>({
	components: { VFormInput, VFormInputIcon, VFormInputGroup, VForm }
})
export default class AppNavigationNavigationWindow extends Vue {
	@Prop({ type: Object, required: true })
	@ProvideReactive()
	private readonly navigationWindow!: UpdateableAppNavigationWindow | null;

	get isActive(): boolean {
		return this.navigationWindow?.state !== ClosedNavigationWindowState;
	}

	get isVisible(): boolean {
		return this.navigationWindow?.state === OpenNavigationWindowState;
	}

	childrenParametersAsProps(children: AppNavigationWindowChildren): any {
		return children.location?.params;
	}
}
</script>
