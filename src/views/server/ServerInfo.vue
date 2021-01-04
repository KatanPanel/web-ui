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
	<div class="server-info">
		<small class="v--text-fw-800 v--text-uppercase"
			>Dados do estado do servidor</small
		>

		<h4>Gráficos do servidor</h4>
		<v-row>
			<v-col :size="6">
				<small class="v--text-fw-800 v--text-uppercase"
					>Uso de Memória</small
				>
			</v-col>
			<v-col :size="6">
				<small class="v--text-fw-800 v--text-uppercase"
					>Uso de Memória</small
				>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import WindowMixin from "@/mixins/window";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxHeader from "@/components/ui/box/VBoxHeader.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VWall from "@/components/ui/wall/VWall.vue";
import VWallTitle from "@/components/ui/wall/VWallTitle.vue";
import VTabs from "@/components/ui/tab/VTabs.vue";
import VTab from "@/components/ui/tab/VTab.vue";
import VTabView from "@/components/ui/tab/VTabView.vue";
import VWallText from "@/components/ui/wall/VWallText.vue";
import VTabLink from "@/components/ui/tab/VTabLink.vue";
import { getWebSocket } from "@/store";
@Component<ServerInfo>({
	components: {
		VTabLink,
		VWallText,
		VTabView,
		VTab,
		VTabs,
		VWallTitle,
		VWall,
		VLabel,
		VBoxHeader,
		VBox,
		VCol,
		VRow,
	},
	mounted() {
		const vm = this as ServerInfo;
		const socket = getWebSocket();

		vm.updateWindowTitle("Painel de Controle");
		socket.on("message", (message: any) => {
			console.log("msg", message);
			if (message.op !== 1) return;

			console.log("stats", message.d);
		});

		socket.sendMessage({
			op: 1,
			d: {
				"server-id": vm.getServer.id,
			},
		});
	},
})
export default class ServerInfo extends mixins(WindowMixin) {}
</script>
