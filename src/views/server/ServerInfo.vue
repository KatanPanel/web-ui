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
		<h2 class="v--m-bottom-3">Visão geral</h2>
		<v-flex-box class="server-basics">
			<div
				class="picture"
				style="
					background-image: url('https://yt3.ggpht.com/ytc/AAUvwnjTWypaip_yzS5ajG97GEJ5YGSZnvan4CxFv0KZ6g=s900-c-k-c0x00ffffff-no-rj');
				"
			/>
			<div class="v--flex-child">
				<v-row>
					<v-col :size="3">
						<v-label>Nome do servidor</v-label>
						<h6 class="v--text-fw-600">{{ getServer.name }}</h6>
					</v-col>
					<v-col :size="3">
						<v-label>Jogo</v-label>
						<p class="v--text-fw-600">
							<!-- <img :src="`/img/games/icons/${getServer.game.name.toLowerCase()}.png`" :alt="getServer.game.name" class="game-icon"> -->
							<a class="game" href="#">{{
								getServer.game.name
							}}</a>
							<small class="v--text-muted"
								>({{ getServer.game.version.name }})</small
							>
						</p>
					</v-col>
					<v-col :size="3">
						<v-label>Visualizadores</v-label>
						<p>
							<small class="v--text-muted"
								><i
									>Não há ninguém visualizando esse
									servidor.</i
								></small
							>
						</p>
					</v-col>
				</v-row>
				<div class="v--m-top-3">
					<v-button :flat="true" :danger="true"
						>Interromper execução</v-button
					>
				</div>
				<small class="v--text-muted"
					>Explore informações detalhadas do servidor através da
					interface de linha de comandos via "katan servidor info
					{{ getServer.name.toLowerCase() }}".</small
				>
			</div>
		</v-flex-box>
		<hr >
		<div class="server-resources" v-if="getServer.state === 'RUNNING'">
			<h4>Recursos</h4>
			<v-tabs>
				<v-tab tab="cpu">CPU</v-tab>
				<v-tab tab="memory">Memória</v-tab>
				<v-tab tab="rede">Rede I/O</v-tab>
			</v-tabs>
			<v-tab-view tab="cpu">
				<v-row>
					<v-col :size="8">
						<line-chart
							:chart-data="chartData"
							style="height: 240px"
						/>
					</v-col>
					<v-col :size="4">
						<h4>CPU</h4>
					</v-col>
				</v-row>
			</v-tab-view>
		</div>
		<!-- <p class="v--text-muted">Estado atual, informações de composição e representação gráfica e textual de recursos da aplicação {{ getServer.name }}.</p>
		<section id="state">
			<h5 class="v--text-fw-800 v--text-uppercase">
				<span v-if="getServer.state === 'RUNNING'" key="online" class="server-state online">Online</span>
				<span v-else key="offline" class="server-state offline">Offline</span>
			</h5>
		</section>
		<hr>
		<section id="resources">
			<p class="v--text-fw-800 v--text-uppercase v--m-bottom-1">Consumo da aplicação</p>
			<v-tabs>
				<v-tab tab="cpu">CPU</v-tab>
				<v-tab tab="memory">Memória</v-tab>
				<v-tab tab="rede">Rede I/O</v-tab>
			</v-tabs>
		</section>
		<small class="v--text-fw-800 v--text-uppercase v--m-bottom-1">Composição</small>
		<small class="v--text-fw-800 v--text-uppercase v--m-bottom-1">Representação gráfica do consumo da aplicação</small>
		<hr>
		<h4>Recursos</h4>
		<v-tabs>
			<v-tab tab="cpu">CPU</v-tab>
			<v-tab tab="memory">Memória</v-tab>
			<v-tab tab="rede">Rede I/O</v-tab>
		</v-tabs>
		<hr /> -->
	</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import WindowMixin from "@/common/internal/mixins/window";
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
import { getWebSocket } from "@/store";
import { updateWindowTitle } from "@/common/navigation/window";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import VButton from "@/components/ui/button/VButton.vue";
import LineChart from "@/components/graph/LineChart.vue";
import { generateMetaInfo } from "@/common/navigation/translation";

@Component<ServerInfo>({
	components: {
		LineChart,
		VButton,
		VFlexBox,
		VIcon,
		VBoxBody,
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
	metaInfo: () =>
		generateMetaInfo("server.overview", {
			server: this.getServer.name,
		}),
	mounted() {
		const vm = this as ServerInfo;
		const socket = getWebSocket();

		updateWindowTitle(vm.getWindow, "Painel de Controle");
		socket.onOp(1009, (stats: any) => {
			console.log("stats", stats);
			vm.cpuUsage.push(stats.stats["cpu-usage"]);
		});

		socket.sendOp(1009, {
			"server-id": vm.getServer.id,
		});
	},
})
export default class ServerInfo extends mixins(WindowMixin) {
	private cpus = 0;
	private cpuUsage = [];

	get chartData() {
		return {
			labels: ["a"],
			datasets: [
				{
					label: "Núcleo #1",
					backgroundColor: "rgba(165, 94, 234, 0.2)",
					borderColor: "rgba(165, 94, 234, 1.0)",
					data: this.cpuUsage,
				},
			],
		};
	}

/* get chartData() {
		const datasets = [];
		for (let i = 0; i < this.cpus; i++) {
			datasets.push({
				label: `CPU #${i + 1}`,
				backgroundColor: "rgba(165, 94, 234, 0.2)",
				borderColor: "rgba(165, 94, 234, 1.0)",
				data: this.cpuUsage[i] || []
			})
		}

		return { datasets: datasets };
	} */
}
</script>
<style lang="scss" scoped>
.server-info {
	.server-state {
		/** &::before {
			content: "";
			width: 16px;
			height: 16px;
			border-radius: 50%;
			border: 4px solid var(--primary-color);
			position: relative;
			display: inline-block;
			margin-right: 8px;
		} */

		&.online {
			color: var(--kt-success-color);
		}

		&.offline {
			color: var(--kt-danger-color);
		}

		svg {
			width: 16px;
			height: 16px;
			vertical-align: middle;
		}
	}

	.server-basics {
		.picture {
			width: 96px;
			height: 96px;
			box-shadow: inset rgba(0, 0, 0, 0.12) 0 0 8px 0;
			border-radius: 50%;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: center;
			margin-right: 36px;
		}

		.game {
			text-decoration: none;
		}

		.game-icon {
			width: 20px;
			height: 20px;
			vertical-align: middle;
			margin-right: 8px;
		}
	}
}
</style>
