<template>
	<Resource
		@loaded="onLoad"
		:resource="getResource"
		empty-state-title="blueprints.empty-state.title"
		empty-state-description="blueprints.empty-state.description"
		empty-state-icon="ScriptOutline"
	>
		<div v-for="blueprint in blueprints" :key="blueprint.id">
			<BlueprintsListItem
				:blueprint-id="blueprint.id"
				:name="blueprint.name"
				:icon="blueprint.raw.icon"
			/>
		</div>
	</Resource>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import { Blueprint } from "@/features/blueprints/api/blueprint.model";
import blueprintsService from "@/features/blueprints/api/blueprints.service";
import Resource from "@/features/platform/ui/components/Resource.vue";
import BlueprintsListItem from "@/features/blueprints/ui/components/home/BlueprintsListItem.vue";

@Component({
	components: { Resource, BlueprintsListItem }
})
export default class BlueprintsList extends Vue {
	blueprints!: Blueprint[];

	getResource(): Promise<Blueprint[]> {
		return blueprintsService.listBlueprints();
	}

	onLoad(blueprints: Blueprint[]) {
		this.blueprints = blueprints;
	}
}
</script>

<style lang="scss" scoped></style>
