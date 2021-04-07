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
	<div>
		<h1 class="v--m-bottom-3">Vista geral</h1>
		<v-row>
			<v-col :size="11">
				<div class="server-overview">
					<v-box :no-shadow="true">
						<v-box-body>
							<v-flex-box>
								<Avatar
									:src="getServer.icon"
									class="server-icon"
								/>
								<div class="v--flex-child">
									<v-row>
										<v-col
											:size="9"
											:style="{ lineHeight: 1.2 }"
										>
											<h4 class="v--m-bottom-0">
												{{ getServer.name }}
											</h4>
											<p class="v--text-muted">
												<span
													v-if="
														getServer.game.version
													"
													key="versioned-game"
												>
													{{
														getServer.game.game.name
													}}
													({{
														getServer.game.version
															.name
													}})
												</span>
												<span
													v-else
													key="non-versioned-game"
												>
													{{
														getServer.game.game.name
													}}
												</span>
											</p>
										</v-col>
										<v-col :size="3">
											<p class="v--text-cute">Recursos</p>
										</v-col>
									</v-row>
									<div class="v--m-top-3">
										<v-button
											v-if="getServer.state !== 'running'"
											:disabled="
												getServer.state === 'running'
											"
										>
											Iniciar
										</v-button>
										<v-button
											v-if="getServer.state === 'running'"
											:disabled="
												getServer.state !== 'running'
											"
											>Parar
										</v-button>
									</div>
								</div>
							</v-flex-box>
						</v-box-body>
					</v-box>
					<hr >
					<div
						v-if="getServer.state === 'running'"
						class="server-resources"
					>
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
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import WindowMixin from "@/mixins/window";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxHeader from "@/components/ui/box/VBoxHeader.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VWall from "@/components/ui/wall/VWall.vue";
import VTabs from "@/components/ui/tab/VTabs.vue";
import VTab from "@/components/ui/tab/VTab.vue";
import VTabView from "@/components/ui/tab/VTabView.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import VButton from "@/components/ui/button/VButton.vue";
import LineChart from "@/components/graph/LineChart.vue";
import Avatar from "@/components/Avatar.vue";

@Component<ServerOverview>({
	components: {
		Avatar,
		LineChart,
		VButton,
		VFlexBox,
		VIcon,
		VBoxBody,
		VTabView,
		VTab,
		VTabs,
		VWall,
		VLabel,
		VBoxHeader,
		VBox,
		VCol,
		VRow,
	},
	mounted(): void {
		/* const socket = getWebSocket();

		socket.on(1009, (stats: any) => {
			console.log("stats", stats);
			this.cpuUsage.push(stats.stats["cpu-usage"] as any);
		});

		socket.send(1009, {
			"server-id": this.getServer.id,
		}); */
	},
})
export default class ServerOverview extends mixins(WindowMixin) {
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
<style lang="scss">
.server-overview {
	.server-icon {
		width: 96px;
		height: 96px;
		margin-right: 36px;
	}
}
</style>
