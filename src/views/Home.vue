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
		<section id="top">
			<h1 class="v--m-bottom-0">
				<b>Bem-Vindo(a), {{ getAccount.username }}.</b>
			</h1>
			<p class="v--text-muted last-active-session">
				Sua última sessão de log-in foi em
				{{ $time(getAccount.lastLogin).format("LLLL") }}.
			</p>
			<v-tabs class="tabs">
				<v-tab :tab="'server-list'"> Página Inicial </v-tab>
			</v-tabs>
		</section>
		<hr />
		<section id="view" class="v--m-top-5">
			<v-tab-view :tab="'server-list'">
				<HomeServerListView />
			</v-tab-view>
		</section>
	</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { AuthMixin } from "@/mixins/auth";
import { AxiosResponse } from "axios";
import VTabs from "@/components/ui/tab/VTabs.vue";
import VTab from "@/components/ui/tab/VTab.vue";
import VTabView from "@/components/ui/tab/VTabView.vue";
import { commit } from "@/utils/vuex";
import { ON_BACKEND_INFO_UPDATE } from "@/store/mutations";
import HomeServerListView from "@/components/home/HomeServerListView.vue";
import { ROOT_MODULE } from "@/store";

@Component({
	components: {
		HomeServerListView,
		VTabView,
		VTab,
		VTabs,
	},
})
export default class Home extends mixins(AuthMixin) {
	mounted(): void {
		this.$http("/info").then((res: AxiosResponse) => {
			commit(ROOT_MODULE, ON_BACKEND_INFO_UPDATE, res.data.data);
		});
	}
}
</script>
<style lang="scss" scoped>
.last-active-session {
	margin-bottom: 18px;
	margin-top: -12px;
}

.server-list {
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	width: 100%;
	margin-top: 12px;

	.server {
		list-style-type: none;
		position: relative;
		padding: 12px;
		background-color: var(--app-foreground-overlay);
		border-radius: 4px;
		display: flex;

		&:hover {
			cursor: pointer;
		}

		&:not(:last-child) {
			margin-bottom: 6px;
		}

		.server-state {
			width: 32px;
			height: 32px;
			background-color: var(--app-foreground);
			border-radius: 50%;
		}

		.server-info {
			margin-left: 12px;
		}
	}
}
</style>
