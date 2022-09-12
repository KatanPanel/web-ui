<template>
	<div :class="$style.root">
		<EmptyState v-if="isEmpty" icon="LanDisconnect">
			<h5 v-t="'instances.network.connected.empty'" />
		</EmptyState>
		<template v-else>
			<VRow>
				<VCol :size="9">
					<VLabel>Network Details</VLabel>
				</VCol>
				<VCol :size="3">
					<VLabel>Type</VLabel>
				</VCol>
			</VRow>
			<InstanceNetworkConnectedNetworksListItem
				v-for="network in networks"
				:key="network.id"
				:network-id="network.id"
				:network-name="network.name"
			/>
		</template>
	</div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import {
	Instance,
	InstanceNetworkConnection
} from "@/features/units/models/instance.model";
import InstanceNetworkConnectedNetworksListItem from "@/features/units/ui/components/instances/network/InstanceNetworkConnectedNetworksListItem.vue";
import EmptyState from "@/features/shared/ui/components/EmptyState.vue";
import VCol from "@/features/shared/ui/components/design-system/grid/VCol.vue";
import VRow from "@/features/shared/ui/components/design-system/grid/VRow.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";

@Component({
	components: {
		EmptyState,
		InstanceNetworkConnectedNetworksListItem,
		VRow,
		VCol,
		VLabel
	}
})
export default class InstanceNetworkConnectedNetworksList extends Vue {
	@Inject()
	private readonly instance!: Instance;

	// used for debbuging
	private _isEmpty?: boolean = undefined;

	get networks(): InstanceNetworkConnection[] {
		return this.instance.runtime?.network.networks || [];
	}

	get isEmpty(): boolean {
		return this._isEmpty || this.networks.length === 0 || false;
	}
}
</script>
<style lang="scss" module>
.root {
	border-top: 1px solid var(--kt-border-medium);
	padding-top: 1.6rem;
}
</style>
