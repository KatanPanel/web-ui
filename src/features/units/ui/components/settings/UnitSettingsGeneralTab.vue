<template>
	<VForm :class="$style.form">
		<VFieldSet>
			<VLabel>{{ $t("units.settings.general.unit-name.label") }}</VLabel>
			<VInput
				:value="unit.name"
				:placeholder="
					$t(`units.settings.general.unit-name.placeholder`)
				"
				disabled
			/>
		</VFieldSet>
	</VForm>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import VForm from "@/features/shared/ui/components/design-system/form/VForm.vue";
import { Unit } from "@/features/units/models/unit.model";
import unitsPresenter from "@/features/units/ui/units.presenter";

@Component({
	components: { VInput, VLabel, VFieldSet, VForm }
})
export default class UnitSettingsGeneralTab extends Vue {
	get unit(): Unit {
		return unitsPresenter.getCurrentUnitOrThrow;
	}
}
</script>

<style lang="scss" module>
.form {
}
</style>
