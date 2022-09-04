<template>
	<VContainer>
		<PageHeader>
			<template #title><span v-t="'units.settings.title'" /></template>
		</PageHeader>
		<VTabList accessibility-label="Settings Tab">
			<VTab id="general" label="General">
				<UnitSettingsGeneralTab />
			</VTab>
			<VTab id="advanced" label="Advanced">
				<UnitSettingsAdvancedTab />
			</VTab>
		</VTabList>
	</VContainer>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Unit } from "@/features/units/models/unit.model";
import VTabList from "@/features/shared/ui/components/design-system/tabs/VTabList.vue";
import VTab from "@/features/shared/ui/components/design-system/tabs/VTab.vue";
import UnitSettingsGeneralTab from "@/features/units/ui/components/settings/UnitSettingsGeneralTab.vue";
import UnitSettingsAdvancedTab from "@/features/units/ui/components/settings/UnitSettingsAdvancedTab.vue";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";

@Component({
	components: {
		PageHeader,
		UnitSettingsAdvancedTab,
		UnitSettingsGeneralTab,
		VTab,
		VTabList,
		VContainer
	}
})
export default class UnitSettingsView extends Vue {
	@Inject()
	readonly unit!: Unit;
}
</script>
