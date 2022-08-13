<template>
	<ul>
		<HomeUnitsListItem
			v-for="unit in unitsList"
			:key="unit.id"
			:unit-id="unit.id"
			:name="unit.name"
			:instance-id="unit.instanceId"
		/>
	</ul>
</template>
<script lang="ts">
import { Unit } from "@/domain/models/unit/unit.model";
import { Component, Vue } from "vue-facing-decorator";
import homePresenter from "@/data/presenters/home.presenter";
import HomeUnitsListItem from "@/presentation/components/home/units-list/HomeUnitsListItem.vue";
import logService from "@/data/services/log.service";

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
