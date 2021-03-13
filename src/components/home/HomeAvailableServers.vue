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
	<section id="available-servers" v-if="getAvailableServers.length > 0">
		<small class="v--text-muted v--text-uppercase v--text-fw-600"
			>Disponíveis — {{ getAvailableServers.length }}</small
		>
		<div class="server-list">
			<router-link
				v-for="server in getAvailableServers"
				:key="server.id"
				:to="{
					name: 'server',
					params: { serverId: server.id.toString() },
				}"
				tag="div"
				class="server"
			>
				<a class="server-info">
					<div class="server-header">
						<div class="server-name">
							<div
								:class="`server-state server-state-${server.state.toLowerCase()}`"
							/>
							{{ server.name }}
						</div>
						<div class="server-ip">
							{{ server.host }}:{{ server.port }}
						</div>
					</div>
					<div class="server-footer">
						<div class="server-viewers">
							<small
								>Não há ninguém visualizando esse
								servidor.</small
							>
						</div>
					</div>
				</a>
			</router-link>
		</div>
	</section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { undefinedToNull } from "@/common/utils/any";
import { getWindows, Window } from "@/common/navigation/window";
import { get } from "@/common/utils/vuex";
import { GET_SERVER_LIST } from "@/store/getters";
import { ROOT_MODULE } from "@/store";

@Component
export default class HomeAvailableServers extends Vue {
	private get getAvailableServers(): Array<any> {
		return get(ROOT_MODULE, GET_SERVER_LIST).filter((server: any) => {
			return (
				server.state !== "UNLOADED" &&
				undefinedToNull(
					getWindows().find(
						(window: Window) => window.data.id === server.id
					)
				) === null
			);
		});
	}
}
</script>
