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
			<h2>{{ $t("views.advanced.settings.language.title") }}</h2>
			<p class="v--text-muted-darker">
				{{ $t("views.advanced.settings.language.select") }}
			</p>
			<section id="language">
				<v-field-list class="v--m-top-2">
					<v-field
						v-for="language in getSupportedLanguages"
						:key="language.tag"
						:active="currentLanguage.tag === language.tag"
						@click.native="currentLanguage = language"
					>
						<div class="v--flex-child">
							{{ language.name }}
						</div>
						<div
							:style="{
								backgroundImage: `url(/img/flags/${language.tag}.png)`
							}"
							class="field-flag"
						/>
					</v-field>
				</v-field-list>
			</section>
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
import { Language, supportedLanguages } from "@/common/language";
import {
	getClientSettings,
	saveClientSettings,
	updateClientSettings,
} from "@/common/client-settings";
import { loadLanguage } from "@/i18n";
import { generateMetaInfo } from "@/common/navigation/translation";
import { MetaInfo } from "vue-meta";

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
		return generateMetaInfo("advanced.settings.language");
	},
})
export default class AdvancedSettingsLanguage extends Vue {
	/**
	 * Returns all currently supported languages.
	 */
	get getSupportedLanguages(): Language[] {
		return supportedLanguages;
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
		loadLanguage(language.tag).then(() => {
			updateClientSettings({ language });
			saveClientSettings();

			/* const curr = this.$router.currentRoute;
			const path = exportRoutePathMapping(curr.name, curr.path, lang);
			window.location.href = this.$router.resolve({ path }).href; */
		});
	}
}
</script>
<style lang="scss" scoped>
.field-flag {
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	width: 40px;
	height: 32px;
}
</style>
