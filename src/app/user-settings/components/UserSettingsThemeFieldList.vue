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
	<v-field-list>
		<v-field
			v-for="theme in getThemes()"
			:key="theme"
			:active="selectedTheme === theme"
			class="theme"
			@select="selectTheme(theme)"
		>
			{{ $t(`common.themes.${theme}`) }}
		</v-field>
	</v-field-list>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VFieldList from "@/app/shared/components/ui/field/VFieldList.vue";
import VField from "@/app/shared/components/ui/field/VField.vue";
import { AppTheme, AppThemes } from "@/app/app.module";
import { inject } from "inversify-props";
import { UserSettingsPresenter } from "@/app/user-settings/user-settings.presenter";

@Component<UserSettingsThemeFieldList>({
	components: { VField, VFieldList },
	beforeMount(): void {
		this.selectedTheme = this.userSettingsPresenter.getSettings.theme;
	}
})
export default class UserSettingsThemeFieldList extends Vue {
	selectedTheme: AppTheme | null = null;
	@inject()
	private readonly userSettingsPresenter!: UserSettingsPresenter;

	getThemes(): readonly AppTheme[] {
		return AppThemes;
	}

	selectTheme(theme: AppTheme): void {
		this.selectedTheme = theme;
		this.userSettingsPresenter.updateSettings({ theme }, true);
	}
}
</script>
