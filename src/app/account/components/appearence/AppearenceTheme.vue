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
	<section id="theme">
		<small class="v--text-cute v--text-muted-darker">
			{{ $t("views.my-account.appearence.theme-label") }}
		</small>
		<v-field-list>
			<v-field
				v-for="theme in getAvailableThemes()"
				:key="theme"
				:active="clientTheme === theme"
				@click.native="clientTheme = theme"
			>
				{{ $t(`views.my-account.appearence.theme.${theme}`) }}
			</v-field>
			<v-field :active="!clientTheme" @click.native="clientTheme = null">
				{{ $t("views.my-account.appearence.theme.system-default") }}
			</v-field>
		</v-field-list>
	</section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AppClientSettingsStore } from "@/app/shared/store/client-settings";
import VFieldList from "@/app/shared/components/ui/field/VFieldList.vue";
import VRow from "@/app/shared/components/ui/layout/VRow.vue";
import VCol from "@/app/shared/components/ui/layout/VCol.vue";
import VSelect from "@/app/shared/components/ui/form/VSelect.vue";
import VField from "@/app/shared/components/ui/field/VField.vue";
import { isUndefined } from "@/app/shared/utils/any";
import {
	CLIENT_SETTINGS_DARK_THEME,
	CLIENT_SETTINGS_LIGHT_THEME
} from "@/app/shared/models/client-settings";
import { inject } from "inversify-props";

@Component({
	components: { VField, VFieldList, VSelect, VCol, VRow }
})
export default class AppearenceTheme extends Vue {

	@inject()
	private readonly appClientSettingsStore!: AppClientSettingsStore;

	get clientTheme(): string {
		return this.appClientSettingsStore.clientSettings.theme as string;
	}

	set clientTheme(theme: string) {
		const current = this.appClientSettingsStore.clientSettings.theme;
		if (!isUndefined(current) && current === theme) return;

		this.appClientSettingsStore.updateClientSettings({ theme });
		this.appClientSettingsStore.saveClientSettings();
	}

	getAvailableThemes(): string[] {
		return [CLIENT_SETTINGS_LIGHT_THEME, CLIENT_SETTINGS_DARK_THEME];
	}
}
</script>
