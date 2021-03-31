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
	<v-row>
		<v-col :size="8">
			<h2>{{ $t("views.advanced.settings.appearence.title") }}</h2>
			<section id="theme">
				<h5 class="v--text-cute">
					{{ $t("views.advanced.settings.appearence.theme-label") }}
				</h5>
				<v-field-list>
					<v-field
						v-for="theme in getAvailableThemes"
						:key="theme"
						:active="currentTheme === theme"
						@click.native="currentTheme = theme"
					>
						{{
							$t(
								`views.advanced.settings.appearence.theme.${theme}`
							)
						}}
					</v-field>
					<v-field
						:active="!currentTheme"
						@click.native="currentTheme = null"
					>
						{{
							$t(
								"views.advanced.settings.appearence.theme.system-default"
							)
						}}
					</v-field>
				</v-field-list>
				<small
					class="v--text-muted-darker v--m-top-4"
					style="display: block"
				>
					{{
						$t(
							"views.advanced.settings.appearence.theme-system-default"
						)
					}}
				</small>
			</section>
			<hr >
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VFieldList from "@/components/ui/field/VFieldList.vue";
import VField from "@/components/ui/field/VField.vue";
import VFieldRadio from "@/components/ui/field/VFieldRadio.vue";
import {
	ClientSettings,
	DARK_THEME,
	getClientSettings,
	LIGHT_THEME,
	saveClientSettings,
	updateClientSettings,
} from "@/common/client-settings";
import { generateMetaInfo } from "@/common/navigation/translation";
import { MetaInfo } from "vue-meta";
import { isUndefined } from "@/common/utils/any";

@Component({
	components: {
		VFieldRadio,
		VField,
		VFieldList,
		VLabel,
		VCol,
		VRow,
	},
	metaInfo(): MetaInfo {
		return generateMetaInfo("advanced.settings.appearence");
	},
})
export default class AdvancedSettingsAppearence extends Vue {
	/**
	 * Returns all themes available for selection.
	 */
	get getAvailableThemes(): string[] {
		return [LIGHT_THEME, DARK_THEME];
	}

	/**
	 * Returns the current client theme defined in the {@link ClientSettings}.
	 */
	get currentTheme(): string {
		return getClientSettings().theme as string;
	}

	/**
	 * Asynchronously sets the client's current theme.
	 * @param {string} theme - the new theme.
	 */
	set currentTheme(theme: string) {
		if (
			!isUndefined(getClientSettings().theme) &&
			getClientSettings().theme === theme
		)
			return;

		updateClientSettings({ theme });
		saveClientSettings();
	}
}
</script>
