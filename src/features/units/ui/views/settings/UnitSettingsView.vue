<template>
	<VContainer>
		<PageHeader
			title-translation-key="units.settings.title"
			:no-divider="true"
		/>
		<VTabList accessibility-label="settings">
			<VTab id="users" label="Users"> Users </VTab>
			<VTab id="roles" label="Roles"> Roles </VTab>
			<VTab id="advanced" label="Advanced"> Advanced </VTab>
		</VTabList>
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
import VInput from "@/design-system/form/VInput.vue";
import VFieldSet from "@/design-system/form/VFieldSet.vue";
import VLabel from "@/design-system/form/VLabel.vue";
import VContainer from "@/design-system/grid/VContainer.vue";
import VForm from "@/design-system/form/VForm.vue";
import VSection from "@/design-system/grid/VSection.vue";
import VTab from "@/design-system/tabs/VTab.vue";
import VTabList from "@/design-system/tabs/VTabList.vue";

@Component({
	components: {
		PageHeader,
		VContainer,
		VForm,
		VFieldSet,
		VInput,
		VLabel,
		VSection,
		VTabList,
		VTab
	}
})
export default class UnitSettingsView extends Vue {
	@Inject()
	readonly unit!: Unit;
}
</script>
