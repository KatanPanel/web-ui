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
	<div class="panel-settings">
		<div class="v--m-bottom-4">
			<h1>
				<b>{{ $t("advanced.settings.title") }}</b>
			</h1>
		</div>
		<v-row>
			<h6 class="v--text-primary v--text-uppercase v--text-fw-600">
				{{ $t("advanced.settings.appearence") }}
			</h6>
			<v-col :size="6">
				<section id="theme">
					<h4>{{ $t("advanced.settings.theme") }}</h4>
					<v-field-list>
						<v-field
							v-for="theme in getAvailableThemes"
							:key="theme"
							:active="applicationTheme === theme"
							@click.native="applicationTheme = theme"
						>
							<div>
								{{ $t(`themes.${theme}`) }}
							</div>
						</v-field>
					</v-field-list>
					<small class="v--text-muted v--m-top-2">
						{{ $t("advanced.settings.theme-system-default") }}
					</small>
				</section>
				<section id="language" class="v--m-top-5">
					<h4>{{ $t("advanced.settings.language") }}</h4>
					<v-label
						>{{ $t("advanced.settings.select-a-language") }}
					</v-label>
					<v-field-list class="v--m-top-1">
						<v-field
							v-for="language in getSupportedLanguages"
							:key="language.tag"
							:active="currentLanguage === language"
							@click.native="currentLanguage = language"
						>
							<div class="v--flex-child">
								{{ language.name }}
							</div>
							<img
								:alt="`${language.name} flag`"
								:src="`/img/flags/${language.tag}.png`"
								width="40px"
								height="40px"
							/>
						</v-field>
					</v-field-list>
				</section>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VContainer from "@/components/ui/layout/VContainer.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VFieldList from "@/components/ui/field/VFieldList.vue";
import VField from "@/components/ui/field/VField.vue";
import VFieldRadio from "@/components/ui/field/VFieldRadio.vue";
import VTabs from "@/components/ui/tab/VTabs.vue";
import VTab from "@/components/ui/tab/VTab.vue";
import VTabView from "@/components/ui/tab/VTabView.vue";
import { generateMetaInfo } from "@/common/navigation/translation";
import { Language, supportedLanguages } from "@/common/language";
import {
	ClientSettings,
	DARK_THEME,
	getClientSettings,
	LIGHT_THEME,
	updateClientSettings,
} from "@/common/client-settings";
import { loadLanguage } from "@/i18n";

@Component<AdvancedSettings>({
	components: {
		VTabView,
		VTab,
		VTabs,
		VFieldRadio,
		VField,
		VFieldList,
		VIcon,
		VLabel,
		VCol,
		VRow,
		VContainer,
	},
	metaInfo: () => generateMetaInfo("advanced.settings"),
})
export default class AdvancedSettings extends Vue {
	/**
	 * Returns all currently supported languages.
	 */
	get getSupportedLanguages(): Language[] {
		return supportedLanguages;
	}

	/**
	 * Returns all themes available for selection.
	 */
	get getAvailableThemes(): string[] {
		return [LIGHT_THEME, DARK_THEME];
	}

	/**
	 * Returns the current language defined in the {@link ClientSettings}.
	 * @return Language
	 */
	get currentLanguage(): Language {
		return getClientSettings().language as Language;
	}

	/**
	 * Asynchronously sets the client's current language.
	 * @param {Language} language - the new language.
	 */
	set currentLanguage(language: Language) {
		loadLanguage(language.tag).then();
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
	set applicationTheme(theme: string) {
		updateClientSettings({ theme });
	}
}
</script>
