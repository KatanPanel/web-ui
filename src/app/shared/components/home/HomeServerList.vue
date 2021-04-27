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
		<!-- <Loading v-if="loading" />
		<div v-else-if="error">
			<small class="v--text-cute">
				{{ error.code }}
			</small>
			<p>{{ $t("views.home.server-list-fetch-error") }}</p>
		</div> -->
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
						<v-select :options="sortingOptions" />
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
				<!-- <div v-if="getActiveServers.length !== 0"
					  class="v--m-bottom-4">
					<small class="v--text-cute">
						{{
							$t("views.home.labels.active-servers", {
								count: getActiveServers.length
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
				</div> -->
				<HomeServerListAvailable />
				<HomeServerListUnloaded />
			</v-box-body>
		</v-box>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VRow from "@/app/shared/components/ui/layout/VRow.vue";
import VCol from "@/app/shared/components/ui/layout/VCol.vue";
import VInputGroup from "@/app/shared/components/ui/form/VInputGroup.vue";
import VInput from "@/app/shared/components/ui/form/VInput.vue";
import VInputIcon from "@/app/shared/components/ui/form/VInputIcon.vue";
import VSelect, {
	SelectOption
} from "@/app/shared/components/ui/form/VSelect.vue";
import Loading from "@/app/shared/components/Loading.vue";
import VBox from "@/app/shared/components/ui/box/VBox.vue";
import VBoxBody from "@/app/shared/components/ui/box/VBoxBody.vue";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import VLabel from "@/app/shared/components/ui/form/VLabel.vue";
import VBoxHeader from "@/app/shared/components/ui/box/VBoxHeader.vue";
import HomeServerListUnloaded from "@/app/shared/components/home/HomeServerListUnloaded.vue";
import HomeServerListAvailable from "@/app/shared/components/home/HomeServerListAvailable.vue";

@Component<HomeServerList>({
	components: {
		HomeServerListAvailable,
		HomeServerListUnloaded,
		VBoxHeader,
		VLabel,
		VIcon,
		VBoxBody,
		VBox,
		Loading,
		VSelect,
		VInputIcon,
		VInput,
		VInputGroup,
		VCol,
		VRow
	}
})
export default class HomeServerList extends Vue {
	get sortingOptions(): SelectOption[] {
		return [
			{
				id: "sort-az",
				value: this.$t("views.home.sorting.a-z") as string
			},
			{
				id: "sort-za",
				value: this.$t("views.home.sorting.z-a") as string
			},
			{
				id: "sort-state",
				value: this.$t("views.home.sorting.server-state") as string
			}
		];
	}

	/* get getAvailableServers(): any[] {
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
	} */
}
</script>
<style lang="scss">
.server-list {
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
