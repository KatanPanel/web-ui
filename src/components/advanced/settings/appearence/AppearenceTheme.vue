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
		<p class="v--text-cute">
			{{ $t("views.advanced.settings.appearence.theme-label") }}
		</p>
		<v-field-list>
			<v-field
				v-for="theme in getAvailableThemes()"
				:key="theme"
				:active="clientTheme === theme"
				@click.native="clientTheme = theme"
			>
				{{ $t(`views.advanced.settings.appearence.theme.${theme}`) }}
			</v-field>
			<v-field :active="!clientTheme" @click.native="clientTheme = null">
				{{
					$t(
						"views.advanced.settings.appearence.theme.system-default"
					)
				}}
			</v-field>
		</v-field-list>
	</section>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {
	DARK_THEME,
	getClientSettings,
	LIGHT_THEME,
	saveClientSettings,
	updateClientSettings,
} from "@/common/client-settings";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VSelect from "@/components/ui/form/VSelect.vue";
import VFieldList from "@/components/ui/field/VFieldList.vue";
import VField from "@/components/ui/field/VField.vue";
import {isUndefined} from "@/utils/any";

@Component({
	components: {VField, VFieldList, VSelect, VCol, VRow},
})
export default class AppearenceTheme extends Vue {
	get clientTheme(): string {
		return getClientSettings().theme as string;
	}

	set clientTheme(theme: string) {
		if (
			!isUndefined(getClientSettings().theme) &&
			getClientSettings().theme === theme
		)
			return;

		updateClientSettings({theme});
		saveClientSettings();
	}

	getAvailableThemes(): string[] {
		return [LIGHT_THEME, DARK_THEME];
	}
}
</script>
