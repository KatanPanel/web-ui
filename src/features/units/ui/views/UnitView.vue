<template>
	<div :class="$style.root" v-if="hasUnitAvailable">
		<TheUnitSidebar />
		<VContainer :class="$style.container">
			<router-view />
		</VContainer>
	</div>
	<div v-else>Carregando...</div>
</template>
<script lang="ts">
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import { Component, Vue } from "vue-facing-decorator";
import unitsPresenter from "@/features/units/ui/units.presenter";
import VForm from "@/features/shared/ui/components/design-system/form/VForm.vue";
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import TheUnitSidebar from "@/features/units/ui/components/TheUnitSidebar.vue";

@Component({
	components: {
		TheUnitSidebar,
		VInput,
		VFieldSet,
		VForm,
		VContainer
	}
})
export default class UnitView extends Vue {
	get hasUnitAvailable(): boolean {
		return unitsPresenter.getCurrentUnit != null;
	}

	created() {
		const unitId = this.$route.params.unitId as string;
		unitsPresenter.getAndSaveUnit(unitId);
	}
}
</script>
<style lang="scss" module>
.root {
	display: flex;
	flex-direction: row;
	height: 100%;
}

.container {
	margin-top: 2.4rem;
}
</style>
