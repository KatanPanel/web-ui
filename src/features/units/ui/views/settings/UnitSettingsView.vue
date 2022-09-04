<template>
	<VContainer>
		<PageHeader>
			<template #title><span v-t="'units.settings.title'" /></template>
		</PageHeader>
		<VSection>
			<VForm>
				<VFieldSet>
					<VLabel>Unit name</VLabel>
					<VInput :value="unit.name" readonly />
				</VFieldSet>
			</VForm>
		</VSection>
	</VContainer>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Unit } from "@/features/units/models/unit.model";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import VForm from "@/features/shared/ui/components/design-system/form/VForm.vue";
import VSection from "@/features/shared/ui/components/design-system/grid/VSection.vue";

@Component({
	components: {
		PageHeader,
		VContainer,
		VForm,
		VFieldSet,
		VInput,
		VLabel,
		VSection
	}
})
export default class UnitSettingsView extends Vue {
	@Inject()
	readonly unit!: Unit;
}
</script>
