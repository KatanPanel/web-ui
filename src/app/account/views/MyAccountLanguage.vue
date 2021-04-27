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
			{{ $t("views.my-account.language.title") }}
		</h4>
		<p class="v--text-muted">
			{{ $t("views.my-account.language.select") }}
		</p>
		<v-field-list class="v--m-top-1">
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
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import supportedLanguages from "@/supported-languages.json";
import { I18nService } from "@/app/shared/services/i18n";
import { AppClientSettingsStore } from "@/app/shared/store/client-settings";
import VField from "@/app/shared/components/ui/field/VField.vue";
import { generateMetaInfo } from "@/app/shared/utils/builtin";
import VFieldList from "@/app/shared/components/ui/field/VFieldList.vue";
import { inject } from "inversify-props";

@Component({
	components: { VField, VFieldList },
	metaInfo(): MetaInfo {
		return generateMetaInfo(this.$i18n, "my-account.language");
	}
})
export default class MyAccountLanguage extends Vue {
	@inject() private readonly i18nService!: I18nService;
	@inject() private readonly appClientSettingsStore!: AppClientSettingsStore;

	get getSupportedLanguages(): Language[] {
		return supportedLanguages;
	}

	get currentLanguage(): Language {
		return this.appClientSettingsStore.clientSettings.language as Language;
	}

	set currentLanguage(language: Language) {
		this.i18nService.loadLanguage(language.tag).then(() => {
			this.appClientSettingsStore.updateClientSettings(
				{ language },
				true
			);
			this.appClientSettingsStore.saveClientSettings();
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
