<template>
	<ul>
		<HomeUnitsListItem
			v-for="unit in unitsList"
			:key="unit.id"
			:name="unit.name"
			:unit-id="unit.id"
		/>
	</ul>
</template>
<script lang="ts">
import { Unit } from "@/features/units/models/unit.model";
import { Component, Vue } from "vue-facing-decorator";
import homePresenter from "@/features/home/ui/home.presenter";
import HomeUnitsListItem from "@/features/home/ui/components/HomeUnitsListItem.vue";

@Component({
	components: { HomeUnitsListItem }
})
export default class HomeUnitsList extends Vue {
	unitsList: Unit[] = [];

	created() {
		homePresenter.listUnits().then((units) => {
			this.unitsList = units;
		});
	}
}
</script>
