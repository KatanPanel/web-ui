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
		<h4 class="v--m-bottom-4">
			{{ $t("views.my-account.performance.title") }}
		</h4>
		<p class="v--text-muted">
			{{ $t("views.my-account.performance.description") }}
		</p>
		<hr />
		<v-row>
			<v-col :size="8">
				<v-label
					>{{
						$t(
							"views.my-account.performance.fields.performance-impact"
						)
					}}
				</v-label>
				<v-select :options="levels" @change="sortByLevel" />
			</v-col>
			<v-col :size="4">
				<v-label
					>{{ $t("views.my-account.performance.fields.category") }}
				</v-label>
				<v-select :options="categories" @change="sortByCategory" />
			</v-col>
		</v-row>
		<div class="v--m-top-4">
			<PerformanceSetting
				v-for="setting in currentSettings"
				:key="setting.name"
				:filters="setting.filters"
				:level="setting.level"
				:name="setting.name"
			>
				<component :is="setting.component" />
			</PerformanceSetting>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import { generateMetaInfo } from "@/utils/component";
import VFieldList from "@/components/ui/field/VFieldList.vue";
import VField from "@/components/ui/field/VField.vue";
import PerformanceSetting from "@/components/modules/panel/my-account/performance/PerformanceSetting.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VSelect from "@/components/ui/form/VSelect.vue";

@Component({
	components: {
		VSelect,
		VLabel,
		VCol,
		VRow,
		PerformanceSetting,
		VField,
		VFieldList
	},
	metaInfo(): MetaInfo {
		return generateMetaInfo("my-account.performance");
	}
})
export default class MyAccountPerformance extends Vue {
	category: string | null = null;
	level: number | null = null;
	private readonly defaultSettings: readonly any[] = Object.freeze([
		{
			name: "server-resources-update-rate",
			level: 1,
			component: "ServerResourcesUpdateRate",
			filters: ["server"]
		}
	]);

	settings = this.defaultSettings;
	private readonly categories: readonly any[] = [
		{
			id: "*",
			value: this.$t("views.my-account.performance.categories.all"),
			active: true
		},
		{
			id: "category-server",
			value: this.$t("views.my-account.performance.categories.server")
		},
		{
			id: "category-app",
			value: this.$t("views.my-account.performance.categories.app")
		}
	];

	private readonly levels: readonly any[] = [
		{
			id: "*",
			value: this.$t("views.my-account.performance.levels.all"),
			active: true
		},
		{
			id: "level-low",
			value: this.$t("views.my-account.performance.levels.low")
		},
		{
			id: "level-medium",
			value: this.$t("views.my-account.performance.levels.medium")
		},
		{
			id: "level-high",
			value: this.$t("views.my-account.performance.levels.high")
		}
	];

	get currentSettings(): readonly any[] {
		if (this.category === null && this.level === null) {
			this.settings = this.defaultSettings;
		} else {
			if (this.category !== null)
				this.settings = this.defaultSettings.filter((value) =>
					value.filters.includes(this.category)
				);

			if (this.level !== null)
				this.settings = (this.category === null
					? this.defaultSettings
					: this.settings
				).filter(
					(value: any) =>
						(value.level as number) <= (this.level as number)
				);
		}

		return this.settings;
	}

	sortByLevel(id: string) {
		switch (id) {
			case "level-low": {
				this.level = 0;
				break;
			}
			case "level-medium": {
				this.level = 1;
				break;
			}
			case "level-high": {
				this.level = 2;
				break;
			}
			default: {
				this.level = null;
			}
		}
	}

	sortByCategory(id: string) {
		switch (id) {
			case "category-server": {
				this.category = "server";
				break;
			}
			case "category-app": {
				this.category = "app";
				break;
			}
			default: {
				this.category = null;
			}
		}
	}
}
</script>
