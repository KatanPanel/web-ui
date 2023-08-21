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
import { Unit } from "@/features/units/api/models/unit.model";
import PageHeader from "@/features/platform/ui/components/PageHeader.vue";
import VInput from "@/features/platform/ui/components/form/VInput.vue";
import VFieldSet from "@/features/platform/ui/components/form/VFieldSet.vue";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";
import VContainer from "@/features/platform/ui/components/grid/VContainer.vue";
import VForm from "@/features/platform/ui/components/form/VForm.vue";
import VSection from "@/features/platform/ui/components/grid/VSection.vue";
import VTab from "@/features/platform/ui/components/tabs/VTab.vue";
import VTabList from "@/features/platform/ui/components/tabs/VTabList.vue";

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
