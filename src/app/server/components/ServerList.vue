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
	<div class="server-list">
		<slot :serverList="serverList" />
		<ul v-if="serverList != null">
			<li
				v-for="server in serverList"
				:key="server.id"
				class="server-list-item"
			>
				<slot :server="server" name="items" />
			</li>
		</ul>
		<div v-else class="server-list-loading">
			<slot name="loading">
				<Loading />
			</slot>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import { Server } from "@/app/server/models/server";
import Loading from "@/app/shared/components/Loading.vue";
import { ServersService } from "@/app/server/services/server";
import { inject } from "inversify-props";

@Component<ServerList>({
	components: { Loading },
	created(): void {
		this.serversService
			.listServers(this.filters)
			.then((servers: Server[]) => {
				this.serverList = servers;
			});
	}
})
export default class ServerList extends Vue {
	@Prop({ type: Object })
	private readonly filters!: Partial<Server>;

	@inject() private readonly serversService!: ServersService;
	private serverList: Server[] | null = null;
}
</script>
