<template>
	<VLabel>
		<i18n-t keypath="instances.network.connected.title">
			<template #count>{{ getConnectedNetworksCount() }}</template>
		</i18n-t>
	</VLabel>
	<VBody2 v-t="'instances.network.connected.subtitle'" />
	<VCard flat>
		<InstanceNetworkConnectedNetworksList />
	</VCard>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Instance } from "@/features/units/models/instance.model";
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";
import VBody2 from "@/features/shared/ui/components/design-system/typography/VBody2.vue";
import InstanceNetworkConnectedNetworksList from "@/features/units/ui/components/instances/network/InstanceNetworkConnectedNetworksList.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";

@Component({
	components: { VBody2, VCard, VLabel, InstanceNetworkConnectedNetworksList }
})
export default class InstanceNetworkConnectedNetworks extends Vue {
	@Inject()
	private readonly instance!: Instance;

	created() {
		console.log("networks", this.instance.runtime?.network.networks);
	}

	getConnectedNetworksCount(): number {
		return this.instance.runtime?.network.networks.length || 0;
	}
}
</script>
