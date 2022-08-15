<template>
	<h4>
		<b>{{ $t("units.settings.title") }}</b>
	</h4>
	<VForm>
		<VFieldSet>
			<VLabel>Name</VLabel>
			<VInput :value="unit.name" readonly />
		</VFieldSet>
	</VForm>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import VForm from "@/features/shared/ui/components/design-system/form/VForm.vue";
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import unitsPresenter from "@/features/units/ui/units.presenter";
import { Unit } from "@/features/units/models/unit.model";
import VSubtitle1 from "@/features/shared/ui/components/design-system/typography/VSubtitle1.vue";

@Component({
	components: { VSubtitle1, VLabel, VInput, VFieldSet, VForm }
})
export default class UnitSettingsView extends Vue {
	get unit(): Unit {
		return unitsPresenter.getCurrentUnitOrThrow;
	}
}
</script>

<style lang="scss" scoped></style>
