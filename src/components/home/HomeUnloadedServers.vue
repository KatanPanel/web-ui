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
	<section id="unloaded-servers" v-if="getUnloadedServers.length > 0">
		<small
			class="v--text-muted v--text-uppercase v--text-fw-700 v--m-bottom-1"
			>Descarregados — {{ getUnloadedServers.length }}</small
		>
		<br />
		<p class="v--text-muted-darker">
			Servidores descarregados obtiveram falha durante seu carregamento.
			Encontre o motivo da falha no arquivo de logs do servidor ou na
			interface de linha de comandos. <a>Saiba mais</a>.
		</p>
		<div class="server-list">
			<div
				v-for="server in getUnloadedServers"
				:key="server.id"
				class="server"
				disabled="true"
			>
				<div class="server-info">
					<div class="server-header">
						<div class="server-name">
							<div class="server-state server-state-unloaded" />
							{{ server.name }}
						</div>
						<div class="server-ip">
							{{ server.host }}:{{ server.port }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get } from "@/common/utils/vuex";
import { ROOT_MODULE } from "@/store";
import { GET_SERVER_LIST } from "@/store/getters";

@Component
export default class HomeUnloadedServers extends Vue {
	get getUnloadedServers(): Array<any> {
		return get(ROOT_MODULE, GET_SERVER_LIST).filter(
			(server: any) => server.state === "UNLOADED"
		);
	}
}
</script>
