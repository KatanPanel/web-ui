<template>
	<VContainer>
		<PageHeader
			title-translation-key="instances.network.title"
			no-divider
		/>
		<InstanceNetworkAssignmentFailedAlert />
		<VSection>
			<VRow>
				<VCol :size="8">
					<InstanceNetworkConnectedNetworks />
				</VCol>
				<VCol :size="4">
					<InstanceNetworkHostname />
					<InstanceNetworkPrimaryAddress />
				</VCol>
			</VRow>
		</VSection>
	</VContainer>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Instance } from "@/features/units/models/instance.model";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import VRow from "@/features/shared/ui/components/design-system/grid/VRow.vue";
import VCol from "@/features/shared/ui/components/design-system/grid/VCol.vue";
import VSection from "@/features/shared/ui/components/design-system/grid/VSection.vue";
import InstanceNetworkPrimaryAddress from "@/features/units/ui/components/instances/network/InstanceNetworkPrimaryAddress.vue";
import InstanceNetworkAssignmentFailedAlert from "@/features/units/ui/components/instances/network/InstanceNetworkAssignmentFailedAlert.vue";
import InstanceNetworkHostname from "@/features/units/ui/components/instances/network/InstanceNetworkHostname.vue";
import InstanceNetworkConnectedNetworks from "@/features/units/ui/components/instances/network/InstanceNetworkConnectedNetworks.vue";

@Component({
	components: {
		VCol,
		VRow,
		VContainer,
		VSection,
		PageHeader,
		InstanceNetworkPrimaryAddress,
		InstanceNetworkAssignmentFailedAlert,
		InstanceNetworkHostname,
		InstanceNetworkConnectedNetworks
	}
})
export default class InstanceNetworkView extends Vue {
	@Inject()
	private readonly instance!: Instance;
}
</script>
