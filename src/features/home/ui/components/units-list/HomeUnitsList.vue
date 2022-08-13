<template>
	<ul>
		<HomeUnitsListItem
			v-for="unit in unitsList"
			:key="unit.id"
			:instance-id="unit.instanceId"
			:name="unit.name"
			:unit-id="unit.id"
		/>
	</ul>
</template>
<script lang="ts">
import { Unit } from "@/features/units/models/unit.model";
import { Component, Vue } from "vue-facing-decorator";
import homePresenter from "@/features/home/ui/home.presenter";
import HomeUnitsListItem from "@/features/home/ui/components/units-list/HomeUnitsListItem.vue";
import logService from "@/features/shared/data/log.service";

@Component({
	components: { HomeUnitsListItem }
})
export default class HomeUnitsList extends Vue {
	unitsList: Unit[] = [];

	created() {
		logService.info("Loading units...");
		homePresenter.listUnits().then((units) => {
			this.unitsList = units;
			logService.info("Loaded", units);
		});
	}
}
</script>
