<template>
	<VForm @submit.prevent="onSubmit" :class="$style.form">
		<VFieldSet>
			<VLabel>{{ $t("units.settings.general.unit-name.label") }}</VLabel>
			<VInput
				:placeholder="
					$t(`units.settings.general.unit-name.placeholder`)
				"
				v-model="updateModel.name"
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
import logService from "@/features/shared/data/log.service";

@Component({
	components: { VInput, VLabel, VFieldSet, VForm }
})
export default class UnitSettingsGeneralTab extends Vue {
	updateModel = {
		name: this.unit.name
	};

	get unit(): Unit {
		return unitsPresenter.getCurrentUnitOrThrow;
	}

	onSubmit() {
		unitsPresenter
			.updateUnit(this.unit.id, {
				name: this.updateModel.name
			})
			.then((unit) => {
				logService.info("Unit updated", unit);
			});
	}
}
</script>

<style lang="scss" module>
.form {
}
</style>
