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
	<v-modal>
		<template #title>Criar novo recurso</template>
		<v-tabs class="tabs">
			<template #items>
				<v-tab tab="window">
					<v-icon name="cursor" />
					Janela de aplicaçã3
				</v-tab>
				<v-tab tab="server">
					<v-icon name="gamepad3" />
					Servidor de jogo
				</v-tab>
			</template>
			<template #views>
				<v-tab-view tab="window">
					<AppCreateResourceModalWindowResource @close="close" />
				</v-tab-view>
				<v-tab-view tab="server">
					<AppCreateResourceModalServerResource @close="close" />
				</v-tab-view>
			</template>
		</v-tabs>
	</v-modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VButton from "@/app/shared/components/ui/button/VButton.vue";
import VTabs from "@/app/shared/components/ui/tab/VTabs.vue";
import VTab from "@/app/shared/components/ui/tab/VTab.vue";
import VTabView from "@/app/shared/components/ui/tab/VTabView.vue";
import AppCreateResourceModalServerResource
	from "@/app/shared/components/AppCreateResourceModalServerResource.vue";
import AppCreateResourceModalWindowResource
	from "@/app/shared/components/AppCreateResourceModalWindowResource.vue";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import VModalTitle from "@/app/shared/components/ui/modal/VModalTitle.vue";
import VModal from "@/app/shared/components/ui/modal/VModal.vue";

@Component({
	components: {
		VModal,
		VModalTitle,
		VIcon,
		AppCreateResourceModalWindowResource,
		AppCreateResourceModalServerResource,
		VTabView,
		VTab,
		VTabs,
		VButton
	}
})
export default class AppCreateResourceModal extends Vue {
	close(): void {
		this.$emit("close");
	}
}
</script>
<style lang="scss" scoped>
::v-deep .tabs ul {
	margin-bottom: 24px;
}
</style>
