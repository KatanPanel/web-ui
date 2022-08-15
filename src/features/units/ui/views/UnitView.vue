<template>
	<HomeLayout>
		<VContainer>
			<div v-if="unit != null">
				<h4>{{ unit.name }} ({{ unit.id }})</h4>
				<VForm @submit.prevent="updateUnit">
					<VFieldSet>
						<VInput v-model="newName" />
					</VFieldSet>
				</VForm>
			</div>
			<div v-else>Carregando...</div>
		</VContainer>
	</HomeLayout>
</template>
<script lang="ts">
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import HomeLayout from "@/features/shared/ui/layouts/RootLayout.vue";
import { Component, Vue } from "vue-facing-decorator";
import { Unit } from "@/features/units/models/unit.model";
import unitsPresenter from "@/features/units/ui/units.presenter";
import VForm from "@/features/shared/ui/components/design-system/form/VForm.vue";
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";

@Component({
	components: {
		VInput,
		VFieldSet,
		VForm,
		VContainer,
		HomeLayout
	}
})
export default class UnitView extends Vue {
	unit: Unit | null = null;

	newName = "";

	created() {
		this.lookupUnit();
	}

	lookupUnit() {
		unitsPresenter
			.getUnit(this.getUnitId)
			.then((result) => (this.unit = result));
	}

	updateUnit() {
		unitsPresenter
			.updateUnit(this.unit!.id, { name: this.newName })
			.then((result: Unit) => {
				this.unit = result;
				console.log("updated", result);
			});
	}

	get getUnitId(): string {
		return this.$route.params.unitId as string;
	}
}
</script>
