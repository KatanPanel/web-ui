<template>
	<VTabList accessibility-label="resources">
		<VTab id="cpu" label="Central Processing Unit" icon="CPU">
			CPU resources :)
		</VTab>
		<VTab id="memory" label="Memory Access" icon="Ruler">
			Memory resources :)
		</VTab>
	</VTabList>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import VTabList from "@/features/shared/ui/components/design-system/tabs/VTabList.vue";
import VTab from "@/features/shared/ui/components/design-system/tabs/VTab.vue";
import websocketService from "@/features/shared/data/websocket.service";

@Component({
	components: { VTabList, VTab }
})
export default class InstanceResourceMonitor extends Vue {
	@Prop({ type: String, required: true })
	private readonly instanceId!: string;

	created(): void {
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
