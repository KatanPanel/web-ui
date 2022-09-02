<template>
	<Resource
		@loaded="onLoad"
		:resource="getResource"
		:empty-eval="(value) => value == null || value.entries.length === 0"
		empty-state-title="blueprints.empty-state.title"
		empty-state-description="blueprints.empty-state.description"
		empty-state-icon="ScriptOutline"
	>
		Olá mundo com {{ blueprints.length }} blueprints
	</Resource>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import { Blueprint } from "@/features/blueprints/models/blueprint.model";
import EmptyState from "@/features/shared/ui/components/EmptyState.vue";
import LoadingState from "@/features/shared/ui/components/LoadingState.vue";
import ErrorState from "@/features/shared/ui/components/ErrorState.vue";
import blueprintsService from "@/features/blueprints/data/blueprints.service";
import Resource from "@/features/shared/ui/components/Resource.vue";

@Component({
	components: { LoadingState, EmptyState, ErrorState, Resource }
})
export default class BlueprintsHomeListing extends Vue {
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
