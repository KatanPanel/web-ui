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
	<section id="server-details">
		<v-col :size="4">
			<v-label
				v-text="$t('views.server.settings.details.labels.server-icon')"
			/>
			<Avatar
				:src="server.icon"
				:style="{ borderRadius: '8px' }"
				class="server-icon"
			/>
		</v-col>
		<v-col :size="8">
			<v-form>
				<v-form-input-group>
					<v-form-label>
						{{
							$t(
								"views.server.settings.details.labels.server-name"
							)
						}}
						<v-form-input
							:value="server.name"
							placeholder="The coolest server ever"
						/>
					</v-form-label>
				</v-form-input-group>
				<v-form-input-group> </v-form-input-group>
			</v-form>
		</v-col>
	</section>
	<!-- <v-row class="server-settings-details">
		<v-col :size="8">
			<v-form>
				<v-input-group>
					<v-label
						>{{
							$t(
								"views.server.settings.details.labels.server-name"
							)
						}}
					</v-label>
					<v-input
						:value="server.name"
						placeholder="The coolest server ever"
					/>
				</v-input-group>
				<v-input-group class="v--m-top-5">
					<h4 class="v--m-bottom-0">
						{{ $t("views.server.settings.details.network.title") }}
					</h4>
					<p class="v--text-muted">
						{{
							$t(
								"views.server.settings.details.network.description"
							)
						}}
					</p>
					<v-row class="v--m-top-1">
						<v-col :size="8">
							<v-label>
								{{
									$t(
										"views.server.settings.details.network.labels.host"
									)
								}}
							</v-label>
							<v-input :value="server.host" />
						</v-col>
						<v-col :size="4">
							<v-label>
								{{
									$t(
										"views.server.settings.details.network.labels.port"
									)
								}}
							</v-label>
							<v-input :value="server.port" type="number" />
						</v-col>
					</v-row>
				</v-input-group>
			</v-form>
		</v-col>
	</v-row> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VRow from "@/app/shared/components/ui/layout/VRow.vue";
import VCol from "@/app/shared/components/ui/layout/VCol.vue";
import VLabel from "@/app/shared/components/ui/form/VLabel.vue";
import VForm from "@/app/shared/components/ui/form/VForm.vue";
import VInput from "@/app/shared/components/ui/form/VInput.vue";
import VInputGroup from "@/app/shared/components/ui/form/VInputGroup.vue";
import Avatar from "@/app/shared/components/Avatar.vue";
import VFormInputGroup from "@/app/shared/components/ui/form/VFormInputGroup.vue";
import VFormLabel from "@/app/shared/components/ui/form/VFormLabel.vue";
import VFormInput from "@/app/shared/components/ui/form/VFormInput.vue";

@Component({
	components: {
		VFormInput,
		VFormLabel,
		VFormInputGroup,
		Avatar,
		VInputGroup,
		VInput,
		VForm,
		VLabel,
		VCol,
		VRow
	}
})
export default class ServerSettingsDetails extends Vue {
	@Prop({ type: Object, required: true }) private readonly server!: any;
}
</script>
<style lang="scss" scoped>
.server-settings-details {
	.details {
		display: flex;
		flex-direction: column;
		text-align: left;
	}

	.server-icon {
		width: 200px;
		height: 200px;
	}
}
</style>
