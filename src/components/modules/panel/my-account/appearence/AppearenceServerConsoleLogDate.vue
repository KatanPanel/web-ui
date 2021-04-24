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
	<section id="server-console-log-date">
		<small class="v--text-cute v--text-muted-darker">
			{{
				$t("views.my-account.appearence.server-console-log-date.title")
			}}
		</small>
		<p class="v--text-muted">
			{{
				$t(
					"views.my-account.appearence.server-console-log-date.description"
				)
			}}
		</p>
		<v-row class="v--m-top-2">
			<v-col :size="4">
				<v-select
					:options="getConsoleLogDateSelectOptions()"
					@change="onConsoleLogDateUpdate"
				/>
			</v-col>
		</v-row>
	</section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
	getClientSettings,
	saveClientSettings,
	updateClientSettings
} from "@/common/client-settings";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VSelect from "@/components/ui/form/VSelect.vue";

@Component({
	components: { VSelect, VCol, VRow }
})
export default class AppearenceServerConsoleLogDate extends Vue {
	onConsoleLogDateUpdate({ id }: any) {
		updateClientSettings({
			serverSettings: {
				showConsoleLogDate: id === "never" ? undefined : id
			}
		});
		saveClientSettings();
	}

	getConsoleLogDateSelectOptions(): any[] {
		const current = getClientSettings().serverSettings.showConsoleLogDate;
		return [undefined, "hover", "click"].map((value) => {
			return {
				id: value || "never",
				value: this.$i18n.t(
					`views.my-account.appearence.server-console-log-date.options.${
						value || "never"
					}`
				),
				active: current === value
			};
		});
	}
}
</script>
