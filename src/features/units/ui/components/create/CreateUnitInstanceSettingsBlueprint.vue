<template>
	<VCard :flat="true" :class="$style.root">
		<VLabel
			:required="true"
			v-t="'units.create.instance.blueprint.title'"
		/>
		<VBody2
			v-t="'units.create.instance.blueprint.description'"
			:class="$style.description"
		/>
	</VCard>
</template>

<script lang="ts">
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import { Component, Vue } from "vue-facing-decorator";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";
import VCol from "@/features/shared/ui/components/design-system/grid/VCol.vue";
import VRow from "@/features/shared/ui/components/design-system/grid/VRow.vue";
import VSection from "@/features/shared/ui/components/design-system/grid/VSection.vue";
import VBody2 from "@/features/shared/ui/components/design-system/typography/VBody2.vue";
import VAlert from "@/features/shared/ui/components/design-system/alert/VAlert.vue";
import CreateUnitInstanceSettingsImageUpdatePolicy from "@/features/units/ui/components/create/CreateUnitInstanceSettingsImageUpdatePolicy.vue";
import CreateUnitInstanceSettingsNetwork from "@/features/units/ui/components/create/CreateUnitInstanceSettingsNetwork.vue";

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
		CreateUnitInstanceSettingsNetwork
	}
})
export default class CreateUnitInstanceSettingsBlueprint extends Vue {}
</script>
<style lang="scss" module>
.root {
	background-color: var(--kt-content-primary);
	color: var(--kt-content-primary-oncolor);

	label {
		color: var(--kt-content-primary-oncolor);
	}
}

.description {
	color: rgba(255, 255, 255, 0.87);
}
</style>
