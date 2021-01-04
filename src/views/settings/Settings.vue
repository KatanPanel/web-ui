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
		<h1 class="v--m-bottom-4">
			<b>{{ $t("settings.title") }}</b>
		</h1>
		<v-row>
			<v-col :size="6">
				<section id="theme">
					<h6 class="v--text-uppercase v--text-primary">
						<b>Aparência</b>
					</h6>
					<h4>{{ $t("settings.theme") }}</h4>
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
						Caso você não defina um tema de preferência, o padrão do
						sistema será utilizado.
					</small>
				</section>
				<hr />
				<section id="language">
					<h4>{{ $t("settings.language") }}</h4>
					<v-label
						>Selecione um idioma:
						{{ JSON.stringify(getCurrentLanguage) }}</v-label
					>
					<v-field-list class="v--m-top-1">
						<v-field
							v-for="language in getSupportedLanguages"
							:key="language.tag"
							:active="getCurrentLanguage === language"
							@click.native="setCurrentLanguage(language)"
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
import { MetaInfo } from "vue-meta";
import VContainer from "@/components/ui/layout/VContainer.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import { mixins } from "vue-class-component";
import { AppMixin } from "@/mixins/app";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VFieldList from "@/components/ui/field/VFieldList.vue";
import VField from "@/components/ui/field/VField.vue";
import VFieldRadio from "@/components/ui/field/VFieldRadio.vue";

@Component<Settings>({
	components: {
		VFieldRadio,
		VField,
		VFieldList,
		VIcon,
		VLabel,
		VCol,
		VRow,
		VContainer,
	},
	metaInfo(): MetaInfo {
		return {
			title: this.$i18n.t("titles.panel.settings") as string,
		};
	},
})
export default class Settings extends mixins(AppMixin) {}
</script>
