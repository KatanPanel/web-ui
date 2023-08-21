<template>
	<Resource
		empty-state-title="units.empty.title"
		empty-state-icon="PackageVariant"
		:resource="getResource"
		:empty-state-align-y="true"
		@loaded="onLoad"
		@error="onLoadError"
	>
		<div :class="$style.root">
			<TheUnitSidebar @status-update="onStatusUpdate" />
			<div :class="$style.content">
				<router-view />
			</div>
		</div>
	</Resource>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import { Unit } from "@/features/units/api/models/unit.model";
import { computed } from "vue";
import unitsPresenter from "@/features/units/ui/units.presenter";
import Resource from "@/features/platform/ui/components/Resource.vue";
import logService from "@/features/platform/api/log.service";
import TheUnitSidebar from "@/features/units/ui/components/TheUnitSidebar.vue";
import { InstanceStatusUpdateCode } from "@/features/units/api/models/instance.model";
import instancesService from "@/features/units/api/instances.service";

@Component({
	components: { Resource, TheUnitSidebar },
	provide(this: UnitView) {
		return {
			unit: computed(() => this.unit)
		};
	}
})
export default class UnitView extends Vue {
	unit!: Unit;

	private getUnitId(): string {
		return this.$route.params.unitId as string;
	}

	getResource(): Promise<Unit> {
		return unitsPresenter.getUnit(this.getUnitId());
	}

	onLoad(unit: Unit): void {
		this.unit = unit;
	}

	onLoadError(error: Error): void {
		logService.error(`failed to load instance ${this.getUnitId()}`, error);
	}

	onStatusUpdate(status: InstanceStatusUpdateCode): void {
		logService.info("Stauts updated", status);
		instancesService
			.updateInstanceStatus(this.unit.instanceId, status)
			.then(() =>
				logService.info(
					"Instance status updated",
					this.unit.instanceId,
					status
				)
			);
	}
}
</script>
<style lang="scss" module>
.root {
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	overflow-y: auto;
}

.content {
	display: inline-flex;
	flex-direction: column;
	flex-grow: 1;
}
</style>
