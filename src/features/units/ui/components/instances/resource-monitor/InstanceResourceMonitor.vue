<template>
	<VTabList accessibility-label="resources">
		<VTab id="cpu" label="Central Processing Unit" icon="CPU">
			<InstanceResourceMonitorCPU />
		</VTab>
		<VTab id="memory" label="Memory Access" icon="Ruler">
			Memory resources :)
		</VTab>
	</VTabList>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import VTabList from "@/design-system/tabs/VTabList.vue";
import VTab from "@/design-system/tabs/VTab.vue";
import websocketService from "@/features/shared/data/websocket.service";
import InstanceResourceMonitorCPU from "@/features/units/ui/components/instances/resource-monitor/InstanceResourceMonitorCPU.vue";

@Component({
	components: { VTabList, VTab, InstanceResourceMonitorCPU }
})
export default class InstanceResourceMonitor extends Vue {
	@Prop({ type: String, required: true })
	private readonly instanceId!: string;

	created(): void {
		websocketService.listen(2, (message) => {
			console.log("[InstanceResourceMonitor]", message);
		});

		websocketService.send({
			o: 2,
			d: {
				tid: this.instanceId
			}
		});
	}
}
</script>

<style lang="scss" module></style>
