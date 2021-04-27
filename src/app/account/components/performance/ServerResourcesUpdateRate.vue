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
		<v-field-list>
			<v-field
				:active="!serverResurceUpdateTime"
				@click.native="serverResurceUpdateTime = null"
			>
				{{
					$t(
						"views.my-account.performance.server-resources-update-rate.values.real-time"
					)
				}}
			</v-field>
			<v-field
				:active="serverResurceUpdateTime !== null"
				@click.native="
					serverResurceUpdateTime = MAX_RESOURCE_UPDATE_TIME_VALUE
				"
			>
				{{
					$t(
						"views.my-account.performance.server-resources-update-rate.values.every-x-seconds"
					)
				}}
				<RecommendedOption />
			</v-field>
		</v-field-list>
		<v-box
			v-if="serverResurceUpdateTime !== null"
			:outlined="true"
			class="v--m-top-2"
		>
			<v-box-header>
				<v-label
					>{{
						$t(
							"views.my-account.performance.server-resources-update-rate.define-x-seconds",
							{
								max: MAX_RESOURCE_UPDATE_TIME_VALUE
							}
						)
					}}
				</v-label>
			</v-box-header>
			<v-box-body>
				<v-form @submit.native.prevent>
					<v-input-group>
						<v-input
							:value="serverResurceUpdateTime"
							type="number"
							@input="onServerResurceUpdateTimeChange"
						/>
						<span
							:style="`margin-left: ${
								3.5 + serverResurceUpdateTime.toString().length
							}%`"
							class="floating-value"
						>
							{{
								$tc(
									"time-unit.seconds",
									serverResurceUpdateTime
								)
							}}
						</span>
					</v-input-group>
				</v-form>
			</v-box-body>
		</v-box>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RecommendedOption from "@/app/account/components/performance/RecommendedOption.vue";
import VField from "@/app/shared/components/ui/field/VField.vue";
import VBoxHeader from "@/app/shared/components/ui/box/VBoxHeader.vue";
import VBox from "@/app/shared/components/ui/box/VBox.vue";
import VFieldList from "@/app/shared/components/ui/field/VFieldList.vue";
import VLabel from "@/app/shared/components/ui/form/VLabel.vue";
import VBoxBody from "@/app/shared/components/ui/box/VBoxBody.vue";
import VForm from "@/app/shared/components/ui/form/VForm.vue";
import VInputGroup from "@/app/shared/components/ui/form/VInputGroup.vue";
import VInput from "@/app/shared/components/ui/form/VInput.vue";
import { nullToUndefined, undefinedToNull } from "@/app/shared/utils/any";
import { AppClientSettingsStore } from "@/app/shared/store/client-settings";
import { inject } from "inversify-props";

@Component({
	components: {
		RecommendedOption,
		VInput,
		VInputGroup,
		VForm,
		VBoxBody,
		VLabel,
		VBox,
		VBoxHeader,
		VFieldList,
		VField
	}
})
export default class ServerResourcesUpdateRate extends Vue {
	@inject()
	private readonly appClientSettingsStore!: AppClientSettingsStore;

	get serverResurceUpdateTime(): number | null {
		return undefinedToNull(
			this.appClientSettingsStore.clientSettings.serverSettings
				.resourceUpdateTime
		);
	}

	set serverResurceUpdateTime(value: number | null) {
		const current = this.serverResurceUpdateTime;
		if (current === value) return;

		this.appClientSettingsStore.updateClientSettings(
			{
				serverSettings: {
					resourceUpdateTime: nullToUndefined(value)
				}
			},
			true
		);

		this.appClientSettingsStore.saveClientSettings();
	}

	private onServerResurceUpdateTimeChange(
		value: string,
		event: InputEvent
	): void {
		if (value.length === 0) return;

		const intValue = parseInt(value);
		if (!isFinite(intValue) || intValue <= 0) {
			this.serverResurceUpdateTime = null;
			return;
		}

		const result = Math.min(60, intValue);

		this.serverResurceUpdateTime = result;
		(event.target as HTMLInputElement).value = result.toString();
	}
}
</script>
<style lang="scss" scoped>
.floating-value {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	font-size: 12px;
	opacity: 0.38;
	font-style: italic;
	user-select: none;
}
</style>
