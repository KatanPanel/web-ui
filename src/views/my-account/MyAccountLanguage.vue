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
						backgroundImage: `url(/img/flags/${language.tag}.png)`,
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
import { generateMetaInfo } from "@/utils/component";
import supportedLanguages from "@/supported-languages.json";
import {
	getClientSettings,
	saveClientSettings,
	updateClientSettings,
} from "@/common/client-settings";
import { loadLanguage } from "@/i18n";
import VFieldList from "@/components/ui/field/VFieldList.vue";
import VField from "@/components/ui/field/VField.vue";

@Component({
	components: { VField, VFieldList },
	metaInfo(): MetaInfo {
		return generateMetaInfo("my-account.language");
	},
})
export default class MyAccountLanguage extends Vue {
	get getSupportedLanguages(): Language[] {
		return supportedLanguages;
	}

	get currentLanguage(): Language {
		return getClientSettings().language as Language;
	}

	set currentLanguage(language: Language) {
		loadLanguage(language.tag).then(() => {
			updateClientSettings({ language });
			saveClientSettings();
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
