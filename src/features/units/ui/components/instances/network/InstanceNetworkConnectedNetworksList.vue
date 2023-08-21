<template>
	<VCard>
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
	</VCard>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import {
	Instance,
	InstanceNetworkConnection
} from "@/features/units/api/models/instance.model";
import InstanceNetworkConnectedNetworksListItem from "@/features/units/ui/components/instances/network/InstanceNetworkConnectedNetworksListItem.vue";
import EmptyState from "@/features/platform/ui/components/EmptyState.vue";
import VCol from "@/features/platform/ui/components/grid/VCol.vue";
import VRow from "@/features/platform/ui/components/grid/VRow.vue";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";
import VCard from "@/features/platform/ui/components/card/VCard.vue";

@Component({
	components: {
		EmptyState,
		InstanceNetworkConnectedNetworksListItem,
		VRow,
		VCol,
		VLabel,
		VCard
	}
})
export default class InstanceNetworkConnectedNetworksList extends Vue {
	@Inject()
	private readonly instance!: Instance;

	// used for debugging
	private _isEmpty?: boolean = undefined;

	get networks(): InstanceNetworkConnection[] {
		return this.instance.runtime?.network.networks || [];
	}

	get isEmpty(): boolean {
		return this._isEmpty || this.networks.length === 0 || false;
	}
}
</script>
