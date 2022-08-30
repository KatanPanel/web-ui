<template>
	<VContainer>
		<PageHeader>
			<template #title>
				<span v-t="'instances.network.title'" />
			</template>
			<!--			<VAlert variant="info">-->
			<!--				<template #description> Abcdefghijklmnopqrstuvwxyz </template>-->
			<!--			</VAlert>-->
		</PageHeader>
		<VAlert v-if="isNetworkAssignmentFailedStatus()" variant="error">
			<template #title>Network assignment failed</template>
			<template #description>Descriptioosodsoso</template>
		</VAlert>
		<VFieldSet>
			<VLabel>Hostname</VLabel>
			<VInput :value="instance.runtime.network.hostname" readonly />
		</VFieldSet>
		<hr />
		<VSection>
			<VRow>
				<VCol :size="8">
					<h6>Connected networks</h6>
					<VBody2>
						Networks to which this instance is connected and are
						accessible, these networks are internal and cannot be
						changed directly.
					</VBody2>
				</VCol>
				<VCol :size="4">
					<h6>Primary address</h6>
					<VBody2>
						Remote address that is used to connect to this instance.
					</VBody2>
					<VForm>
						<VRow>
							<VCol :size="10">
								<VFieldSet>
									<VLabel
										v-t="'instances.network.host.label'"
									/>
									<VInput
										:value="instance.connection.host"
										readonly
									/>
								</VFieldSet>
							</VCol>
							<VCol :size="2">
								<VFieldSet>
									<VLabel
										v-t="'instances.network.port.label'"
									/>
									<VInput
										:value="instance.connection.port"
										readonly
									/>
								</VFieldSet>
							</VCol>
						</VRow>
					</VForm>
				</VCol>
			</VRow>
		</VSection>
	</VContainer>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Instance } from "@/features/units/models/instance.model";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VForm from "@/features/shared/ui/components/design-system/form/VForm.vue";
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import VAlert from "@/features/shared/ui/components/design-system/alert/VAlert.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import VRow from "@/features/shared/ui/components/design-system/grid/VRow.vue";
import VCol from "@/features/shared/ui/components/design-system/grid/VCol.vue";
import VBody2 from "@/features/shared/ui/components/design-system/typography/VBody2.vue";
import VBody1 from "@/features/shared/ui/components/design-system/typography/VBody1.vue";
import VSection from "@/features/shared/ui/components/design-system/grid/VSection.vue";
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";

@Component({
	components: {
		VBody2,
		VBody1,
		VCol,
		VRow,
		VContainer,
		VAlert,
		VInput,
		VLabel,
		VFieldSet,
		VForm,
		VSection,
		PageHeader,
		VCard
	}
})
export default class InstanceNetworkView extends Vue {
	@Inject()
	private readonly instance!: Instance;

	isNetworkAssignmentFailedStatus(): boolean {
		return this.instance.status === "network-assignment-failed";
	}

	isOnDefaultNetwork(): boolean {
		return true;
	}
}
</script>
