<template>
	<VCard :flat="true">
		<VLabel :high="true">
			<i18n-t keypath="instances.network.connected.title">
				<template #count>
					{{ getConnectedNetworksCount() }}
				</template>
			</i18n-t>
		</VLabel>
		<VBody2 v-t="'instances.network.connected.subtitle'" />
		<InstanceNetworkConnectedNetworksList />
	</VCard>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Instance } from "@/features/units/models/instance.model";
import VCard from "@/design-system/card/VCard.vue";
import VBody2 from "@/design-system/typography/VBody2.vue";
import InstanceNetworkConnectedNetworksList from "@/features/units/ui/components/instances/network/InstanceNetworkConnectedNetworksList.vue";
import VLabel from "@/design-system/form/VLabel.vue";

@Component({
	components: { VBody2, VCard, VLabel, InstanceNetworkConnectedNetworksList }
})
export default class InstanceNetworkConnectedNetworks extends Vue {
	@Inject()
	private readonly instance!: Instance;

	getConnectedNetworksCount(): number {
		return this.instance.runtime?.network.networks.length || 0;
	}
}
</script>
