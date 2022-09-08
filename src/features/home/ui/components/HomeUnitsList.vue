<template>
	<Resource
		empty-state-title="home.units-list.empty.title"
		empty-state-description="home.units-list.empty.description"
		empty-state-icon="PackageVariant"
		:include-refresh-button="true"
		:resource="getResource"
		@loaded="onLoad"
	>
		<template #empty>
			<VButton
				variant="primary"
				:to="createUnitLink()"
				v-t="'home.units-list.empty.create-unit'"
			/>
		</template>
		<ul>
			<HomeUnitsListItem
				v-for="unit in units"
				:key="unit.id"
				:name="unit.name"
				:unit-id="unit.id"
			/>
		</ul>
	</Resource>
</template>
<script lang="ts">
import { Unit } from "@/features/units/models/unit.model";
import { Component, Vue } from "vue-facing-decorator";
import HomeUnitsListItem from "@/features/home/ui/components/HomeUnitsListItem.vue";
import Resource from "@/features/shared/ui/components/Resource.vue";
import unitsService from "@/features/units/data/units.service";
import VButton from "@/features/shared/ui/components/design-system/button/VButton.vue";
import { RouteLocationRaw } from "vue-router";
import { CREATE_UNIT } from "@/features/units/routing/units.routes";

@Component({
	components: { HomeUnitsListItem, Resource, VButton }
})
export default class HomeUnitsList extends Vue {
	units!: Unit[];

	getResource(): Promise<Unit[]> {
		return unitsService.listUnits();
	}

	onLoad(units: Unit[]) {
		this.units = units;
	}

	createUnitLink(): RouteLocationRaw {
		return { name: CREATE_UNIT };
	}
}
</script>
