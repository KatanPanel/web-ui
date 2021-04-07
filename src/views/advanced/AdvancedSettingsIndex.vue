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
		<v-col :size="9">
			<h1>{{ $t("views.advanced.settings.title") }}</h1>
			<section id="testing-adjustments">
				<i18n
					class="v--text-muted"
					path="views.advanced.settings.description"
					tag="p"
				>
					<template v-slot:version>
						<code
							v-tooltip="
								$t('views.advanced.settings.current-version')
							"
							class="v--text-primary"
						><span class="v--cursor-default"
						>v{{ $website.version }}</span
						></code
						>
					</template>
				</i18n>
				<br/>
				<p class="v--text-muted v--m-bottom-4">
					{{ $t("views.advanced.settings.description-detail") }}
				</p>
			</section>
			<section id="others">
				<v-field
					:active="developerMode"
					@click.native="developerMode = !developerMode"
				>{{ $t("views.advanced.settings.options.developer-mode") }}
				</v-field>
				<hr/>
			</section>
			<section id="reset-config">
				<v-box :outlined="true">
					<v-box-body>
						<p class="v--text-cute">
							{{
								$t(
									"views.advanced.settings.options.reset-settings.title"
								)
							}}
						</p>
						<p class="v--text-muted">
							{{
								$t(
									"views.advanced.settings.options.reset-settings.description"
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
										"views.advanced.settings.options.reset-settings.button"
									)
								}}
							</v-button>
						</v-flex-box>
					</v-box-body>
				</v-box>
			</section>
		</v-col>
	</v-row>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VWall from "@/components/ui/wall/VWall.vue";
import VWallText from "@/components/ui/wall/VWallText.vue";
import VButton from "@/components/ui/button/VButton.vue";
import {
	getClientSettings,
	saveClientSettings,
	updateClientSettings,
} from "@/common/client-settings";
import {CLIENT_SETTINGS_CACHE_KEY} from "@/store";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import VField from "@/components/ui/field/VField.vue";

@Component({
	components: {
		VField,
		VFlexBox,
		VBoxBody,
		VBox,
		VButton,
		VWallText,
		VWall,
		VCol,
		VRow,
	},
})
export default class AdvancedSettingsIndex extends Vue {
	get developerMode(): boolean {
		return getClientSettings().developerMode;
	}

	set developerMode(value: boolean) {
		updateClientSettings({ developerMode: value });
		saveClientSettings();
	}

	backToDefaults() {
		this.$storage.remove(CLIENT_SETTINGS_CACHE_KEY);
		window.location.reload();
	}
}
</script>
