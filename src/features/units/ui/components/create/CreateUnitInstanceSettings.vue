<template>
	<VSection>
		<VRow>
			<VCol :size="8">
				<h4 v-t="'units.create.instance.title'" :class="$style.title" />
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
import VFieldSet from "@/features/platform/ui/components/form/VFieldSet.vue";
import { Component, Vue } from "vue-facing-decorator";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";
import VInput from "@/features/platform/ui/components/form/VInput.vue";
import VCard from "@/features/platform/ui/components/card/VCard.vue";
import VCol from "@/features/platform/ui/components/grid/VCol.vue";
import VRow from "@/features/platform/ui/components/grid/VRow.vue";
import VSection from "@/features/platform/ui/components/grid/VSection.vue";
import VBody2 from "@/features/platform/ui/components/typography/VBody2.vue";
import VAlert from "@/features/platform/ui/components/alert/VAlert.vue";
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
