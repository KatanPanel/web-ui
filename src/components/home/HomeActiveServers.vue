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
	<section id="active-servers" v-if="getActiveWindows.length > 0">
		<small class="v--text-muted v--text-uppercase v--text-fw-600"
			>Em segundo plano — {{ getActiveWindows.length }}</small
		>
		<div class="server-list">
			<div
				v-for="window in getActiveWindows"
				:key="window.id"
				class="server"
				active
			>
				<window-link :check="window.id" tag="a" class="server-info">
					<div class="server-header">
						<div class="server-name">
							<div
								:class="`server-state server-state-${window.data.state.toLowerCase()}`"
							/>
							{{ window.data.name }}
						</div>
						<div class="server-ip">
							{{ window.data.host }}:{{ window.data.port }}
						</div>
					</div>
					<div class="server-footer">
						<div class="server-viewers">
							<small>Visualizando {{ window.title }}</small>
						</div>
					</div>
				</window-link>
			</div>
		</div>
	</section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getWindows, Window } from "@/common/navigation/window";
import WindowLink from "@/components/navigation/WindowLink.vue";
import { get } from "@/common/utils/vuex";
import { ROOT_MODULE } from "@/store";
import { GET_SERVER_LIST } from "@/store/getters";
import { undefinedToNull } from "@/common/utils/any";

@Component({
	components: { WindowLink },
})
export default class HomeAvailableServers extends Vue {
	/**
	 *
	 * @private
	 */
	private get getActiveWindows(): Array<Window> {
		const serverList: any[] = get(ROOT_MODULE, GET_SERVER_LIST);

		return getWindows().filter(
			(window: Window) =>
				undefinedToNull(
					serverList.find(
						(server: any) => server.id === window.data.id
					)
				) !== null
		);
	}
}
</script>
