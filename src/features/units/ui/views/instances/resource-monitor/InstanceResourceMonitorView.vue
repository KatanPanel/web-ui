<template>
	<VContainer>
		<PageHeader>
			<template #title>Resources</template>
		</PageHeader>
		<InstanceResourceMonitor :instance-id="instance.id" />
	</VContainer>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Instance } from "@/features/units/models/instance.model";
import InstanceResourceMonitor from "@/features/units/ui/components/instances/resource-monitor/InstanceResourceMonitor.vue";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";

@Component({
	components: { VContainer, PageHeader, InstanceResourceMonitor }
})
export default class InstanceResourceMonitorView extends Vue {
	@Inject()
	private readonly instance!: Instance;
}
</script>

<style lang="scss" scoped></style>
