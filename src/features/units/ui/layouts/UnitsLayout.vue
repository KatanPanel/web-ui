<template>
	<div v-if="unit" :class="$style.root">
		<TheSidebar />
		<TheUnitSidebar />
		<div :class="$style.body">
			<TheHeader />
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import TheSidebar from "@/features/shared/ui/layouts/TheSidebar.vue";
import TheHeader from "@/features/shared/ui/layouts/TheHeader.vue";
import TheUnitSidebar from "@/features/units/ui/components/TheUnitSidebar.vue";
import { Unit } from "@/features/units/models/unit.model";
import unitsPresenter from "@/features/units/ui/units.presenter";
import { computed } from "vue";

@Component({
	components: { TheUnitSidebar, TheHeader, TheSidebar },
	provide(this: UnitsLayout) {
		return {
			unit: computed(() => this.unit)
		};
	}
})
export default class UnitsLayout extends Vue {
	unit: Unit | null = null;

	created() {
		const unitId = this.$route.params.unitId as string;
		unitsPresenter.getUnit(unitId).then((result) => {
			this.unit = result;
		});
	}
}
</script>
<style lang="scss" module>
.root {
	display: flex;
	height: 100%;
	background-color: var(--kt-background-body);
}

.body {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}
</style>
