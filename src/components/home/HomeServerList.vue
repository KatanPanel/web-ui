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
	<div class="home-server-list">
		<Loading v-if="loading" />
		<div v-else-if="error">
			<small class="v--text-cute">
				{{ error.code }}
			</small>
			<p>{{ $t("views.home.server-list-fetch-error") }}</p>
		</div>
		<div v-else class="home-server-list-states">
			<v-box :no-shadow="true">
				<v-box-header>
					<div class="v--text-cute 2">
						{{ $t("views.home.server-list") }}
					</div>
					<v-row class="v--m-bottom-4">
						<v-col :size="4">
							<v-label
								>{{ $t("views.home.fields.order-by") }}
							</v-label>
							<v-select
								:options="[
									{
										id: 'sort-az',
										value: $t('views.home.sorting.a-z'),
									},
									{
										id: 'sort-za',
										value: $t('views.home.sorting.z-a'),
									},
									{
										id: 'sort-state',
										value: $t(
											'views.home.sorting.server-state'
										),
									},
								]"
							/>
						</v-col>
						<v-col :size="8">
							<v-input-group :inlined="true" class="v--m-top-4">
								<v-input-icon name="search" />
								<v-input
									:placeholder="$t('views.home.search')"
									maxlength="64"
								/>
							</v-input-group>
						</v-col>
					</v-row>
				</v-box-header>
				<v-box-body>
					<!-- Active servers -->
					<div
						v-if="getActiveServers.length !== 0"
						class="v--m-bottom-4"
					>
						<small class="v--text-cute">
							{{
								$t("views.home.labels.active-servers", {
									count: getActiveServers.length,
								})
							}}
						</small>
						<p class="v--text-muted v--m-bottom-2">
							{{ $t("views.home.active-servers-info") }}
						</p>
						<i18n
							class="v--text-muted v--m-bottom-2 top-right-corner-icon"
							path="views.home.active-servers-click-top-right"
							tag="p"
						>
							<template v-slot:icon>
								<v-icon name="algorithm" />
							</template>
						</i18n>
						<ul>
							<li
								v-for="window in getActiveServers"
								:key="window.id"
								active="true"
							>
								<window-link :check="window.id" tag="a">
									<ServerInfoItem :server="window.data">
										<template v-slot:description>
											<div>{{ window.title }}</div>
										</template>
									</ServerInfoItem>
								</window-link>
							</li>
						</ul>
					</div>
					<!-- Available servers -->
					<div
						v-if="getAvailableServers.length !== 0"
						class="v--m-bottom-4"
					>
						<small class="v--text-cute">
							{{
								$t("views.home.labels.available-servers", {
									count: getAvailableServers.length,
								})
							}}
						</small>
						<ul>
							<li
								v-for="server in getAvailableServers"
								:key="server.id"
							>
								<router-link
									:to="{
										name: 'server.overview',
										params: {
											serverId: server.id.toString(),
										},
									}"
								>
									<ServerInfoItem :server="server" />
								</router-link>
							</li>
						</ul>
					</div>
					<!-- Unloaded servers -->
					<div
						v-if="getUnloadedServers.length !== 0"
						class="v--m-top-4"
					>
						<small class="v--text-cute">
							{{
								$t("views.home.labels.unloaded-servers", {
									count: getUnloadedServers.length,
								})
							}}
						</small>
						<ul>
							<li
								v-for="server in getUnloadedServers"
								:key="server.id"
							>
								<ServerInfoItem
									:disabled="true"
									:server="server"
								/>
							</li>
						</ul>
					</div>
				</v-box-body>
			</v-box>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import { dispatch } from "@/utils/vuex";
import { ROOT_MODULE } from "@/store";
import { LOAD_SERVER_LIST } from "@/store/actions";
import VInputGroup from "@/components/ui/form/VInputGroup.vue";
import VInput from "@/components/ui/form/VInput.vue";
import VInputIcon from "@/components/ui/form/VInputIcon.vue";
import VSelect from "@/components/ui/form/VSelect.vue";
import { AxiosError } from "axios";
import Loading from "@/components/Loading.vue";
import { undefinedToNull } from "@/utils/any";
import { getWindows, Window } from "@/common/navigation/window";
import WindowLink from "@/components/navigation/WindowLink.vue";
import ServerInfoItem from "@/components/server/ServerInfoItem.vue";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VBoxHeader from "@/components/ui/box/VBoxHeader.vue";

@Component<HomeServerList>({
	components: {
		VBoxHeader,
		VLabel,
		VIcon,
		VBoxBody,
		VBox,
		ServerInfoItem,
		WindowLink,
		Loading,
		VSelect,
		VInputIcon,
		VInput,
		VInputGroup,
		VCol,
		VRow,
	},
	created(): void {
		dispatch(ROOT_MODULE, LOAD_SERVER_LIST)
			.then((serverList) => (this.servers = serverList))
			.catch((error: AxiosError) => (this.error = error))
			.then(() => (this.loading = false));
	},
})
export default class HomeServerList extends Vue {
	servers: [] | null = null;
	loading = true;
	error: AxiosError | null = null;

	get getAvailableServers(): any[] {
		return this.servers?.filter((server: any) => {
			return (
				server.state !== "unloaded" &&
				undefinedToNull(
					getWindows().find(
						(window: Window) => window.data.id === server.id
					)
				) === null
			);
		}) as any[];
	}

	get getActiveServers(): Array<Window> {
		return getWindows().filter(
			(window: Window) =>
				undefinedToNull(
					this.servers?.find(
						(server: any) => server.id === window.data.id
					)
				) !== null
		);
	}

	get getUnloadedServers(): any[] {
		return this.servers?.filter(
			(server: any) => server.state === "unloaded"
		) as any[];
	}
}
</script>
<style lang="scss">
.home-server-list {
	display: flex;
	flex-direction: column;
	margin-bottom: 24px;

	.top-right-corner-icon {
		svg {
			margin: 0 4px;
			width: 20px;
			height: 20px;
			fill: var(--kt-primary-color);
		}
	}

	.home-server-list-states {
		ul {
			list-style: none;

			li {
				&:not(:last-child) {
					margin-bottom: 4px;
				}

				a {
					text-decoration: none;
				}
			}
		}
	}
}
</style>
