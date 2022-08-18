<template>
	<VContainer v-if="hasUnitAvailable" :class="$style.root">
		<router-view />
	</VContainer>
</template>
<script lang="ts">
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import { Component, Vue } from "vue-facing-decorator";
import unitsPresenter from "@/features/units/ui/units.presenter";

@Component({
	components: {
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
</style>
