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
			{{ $t("views.my-account.advanced.title") }}
		</h4>
		<section id="testing-adjustments">
			<i18n
				class="v--text-muted"
				path="views.my-account.advanced.description"
				tag="p"
			>
				<template v-slot:version>
					<code
						v-tooltip="
							$t('views.my-account.advanced.current-version')
						"
						class="v--text-primary"
					><span class="v--cursor-default"
					>v{{ $website.version }}</span
					></code
					>
				</template>
			</i18n>
			<br />
			<p class="v--text-muted v--m-bottom-4">
				{{ $t("views.my-account.advanced.description-detail") }}
			</p>
		</section>
		<section id="others">
			<v-field
				:active="userSettingsPresenter.getSettings.developerMode"
				@click.native="updateDeveloperMode"
			>{{ $t("views.my-account.advanced.options.developer-mode") }}
			</v-field>
			<hr />
		</section>
		<section id="reset-config">
			<v-box :outlined="true">
				<v-box-body>
					<p class="v--text-cute">
						{{
							$t(
								"views.my-account.advanced.options.reset-settings.title"
							)
						}}
					</p>
					<p class="v--text-muted">
						{{
							$t(
								"views.my-account.advanced.options.reset-settings.description"
							)
						}}
					</p>
					<v-flex-box class="v--m-top-4">
						<v-button
							:danger="true"
							:outlined="true"
							@click.native="backToDefaults"
						>
							{{
								$t(
									"views.my-account.advanced.options.reset-settings.button"
								)
							}}
						</v-button>
					</v-flex-box>
				</v-box-body>
			</v-box>
		</section>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import VBoxBody from "@/app/shared/components/ui/box/VBoxBody.vue";
import VBox from "@/app/shared/components/ui/box/VBox.vue";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";
import VButton from "@/app/shared/components/ui/button/VButton.vue";
import VField from "@/app/shared/components/ui/field/VField.vue";
import { generateMetaInfo } from "@/app/shared/utils/builtin";
import { inject } from "inversify-props";
import { UserSettingsPresenter } from "@/app/user-settings/user-settings.presenter";

@Component({
	components: { VField, VButton, VFlexBox, VBox, VBoxBody },
	metaInfo(): MetaInfo {
		return generateMetaInfo(this.$i18n, "my-account.advanced");
	}
})
export default class UserSettingsAdvanced extends Vue {
	@inject()
	private readonly userSettingsPresenter!: UserSettingsPresenter;

	updateDeveloperMode(value: boolean) {
		this.userSettingsPresenter.updateSettings({ developerMode: value });
	}
}
</script>
