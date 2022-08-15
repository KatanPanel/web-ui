<template>
	<h5>
		<b>{{ $t("units.settings.title") }}</b>
	</h5>
	<VTabList label="Settings Tab">
		<VTab id="general" label="General">
			<UnitSettingsGeneralTab />
		</VTab>
		<VTab id="advanced" label="Advanced">
			<UnitSettingsAdvancedTab />
		</VTab>
	</VTabList>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import unitsPresenter from "@/features/units/ui/units.presenter";
import { Unit } from "@/features/units/models/unit.model";
import VTabList from "@/features/shared/ui/components/design-system/tabs/VTabList.vue";
import VTab from "@/features/shared/ui/components/design-system/tabs/VTab.vue";
import UnitSettingsGeneralTab from "@/features/units/ui/components/settings/UnitSettingsGeneralTab.vue";
import UnitSettingsAdvancedTab from "@/features/units/ui/components/settings/UnitSettingsAdvancedTab.vue";

@Component({
	components: {
		UnitSettingsAdvancedTab,
		UnitSettingsGeneralTab,
		VTab,
		VTabList
	}
})
export default class UnitSettingsView extends Vue {
	get unit(): Unit {
		return unitsPresenter.getCurrentUnitOrThrow;
	}
}
</script>

<style lang="scss" module>
.form {
	margin-top: 2.4rem;
}
</style>
