<template>
	<VCard :flat="true" :class="$style.root">
		<VLabel
			v-t="'units.create.instance.blueprint.title'"
			:required="true"
		/>
		<VBody2
			v-t="'units.create.instance.blueprint.description'"
			:class="$style.description"
		/>
	</VCard>
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
