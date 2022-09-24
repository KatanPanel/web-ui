<template>
	<VSection>
		<VRow>
			<VCol :size="8">
				<h5 :class="$style.title">
					<b v-t="'units.create.instance.title'" />
				</h5>
				<VBody2 v-t="'units.create.instance.subtitle'" />
			</VCol>
		</VRow>
		<VRow>
			<VCol :size="8">
				<CreateUnitInstanceSettingsBlueprint />
				<VSection>
					<CreateUnitInstanceSettingsResources />
				</VSection>
			</VCol>
			<VCol :size="4">
				<CreateUnitInstanceSettingsNetwork />
				<VSection>
					<CreateUnitInstanceSettingsImageUpdatePolicy />
				</VSection>
			</VCol>
		</VRow>
	</VSection>
</template>

<script lang="ts">
import VFieldSet from "@/design-system/form/VFieldSet.vue";
import { Component, Vue } from "vue-facing-decorator";
import VLabel from "@/design-system/form/VLabel.vue";
import VInput from "@/design-system/form/VInput.vue";
import VCard from "@/design-system/card/VCard.vue";
import VCol from "@/design-system/grid/VCol.vue";
import VRow from "@/design-system/grid/VRow.vue";
import VSection from "@/design-system/grid/VSection.vue";
import VBody2 from "@/design-system/typography/VBody2.vue";
import VAlert from "@/design-system/alert/VAlert.vue";
import CreateUnitInstanceSettingsImageUpdatePolicy from "@/features/units/ui/components/create/CreateUnitInstanceSettingsImageUpdatePolicy.vue";
import CreateUnitInstanceSettingsNetwork from "@/features/units/ui/components/create/CreateUnitInstanceSettingsNetwork.vue";
import CreateUnitInstanceSettingsBlueprint from "@/features/units/ui/components/create/CreateUnitInstanceSettingsBlueprint.vue";
import CreateUnitInstanceSettingsResources from "@/features/units/ui/components/create/CreateUnitInstanceSettingsResources.vue";

@Component({
	components: {
		VSection,
		VRow,
		VCol,
		VCard,
		VInput,
		VLabel,
		VFieldSet,
		VBody2,
		VAlert,
		CreateUnitInstanceSettingsImageUpdatePolicy,
		CreateUnitInstanceSettingsNetwork,
		CreateUnitInstanceSettingsBlueprint,
		CreateUnitInstanceSettingsResources
	}
})
export default class CreateUnitInstanceSettings extends Vue {}
</script>
<style lang="scss" module>
.title {
	margin-bottom: 1.2rem;
}
</style>
