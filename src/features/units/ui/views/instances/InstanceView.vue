<template>
	<Resource
		empty-state-title="instances.main.empty-state.title"
		empty-state-description="instances.main.empty-state.description"
		@loaded="onLoadSuccess"
		@error="onLoadError"
		:resource="getResource"
		:empty-state-align-y="true"
	>
		<keep-alive>
			<router-view :class="$style.root" />
		</keep-alive>
	</Resource>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import instancesPresenter from "@/features/units/ui/instances.presenter";
import { Instance } from "@/features/units/api/models/instance.model";
import { computed } from "vue";
import Resource from "@/features/platform/ui/components/Resource.vue";
import logService from "@/features/platform/api/log.service";

@Component({
	components: { Resource },
	provide(this: InstanceView) {
		return {
			instance: computed(() => this.instance)
		};
	}
})
export default class InstanceView extends Vue {
	instance!: Instance;

	getResource(): Promise<Instance | undefined> {
		return instancesPresenter.getInstance(this.getCurrentInstanceId());
	}

	onLoadSuccess(instance: Instance) {
		this.instance = instance;
	}

	onLoadError(error: Error) {
		logService.error(
			`failed to load instance ${this.getCurrentInstanceId()}`,
			error
		);
	}

	getCurrentInstanceId(): string {
		return this.$route.params.instanceId as string;
	}
}
</script>
<style lang="scss" module>
.root {
	height: 100%;
	display: flex;
	flex-direction: column;
}
</style>
