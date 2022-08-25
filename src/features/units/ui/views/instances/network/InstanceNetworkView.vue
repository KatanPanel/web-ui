<template>
	<VContainer>
		<PageHeader>
			<template #title>
				<span v-t="'instances.network.title'" />
			</template>
			<VAlert variant="info">
				<template #description> Abcdefghijklmnopqrstuvwxyz </template>
			</VAlert>
		</PageHeader>
		<VAlert v-if="isNetworkAssignmentFailedStatus()" variant="error">
			<template #title>Network assignment failed</template>
			<template #description>Descriptioosodsoso</template>
		</VAlert>
		<VForm>
			<VRow>
				<VCol :size="10">
					<VFieldSet>
						<VLabel v-t="'instances.network.host.label'" />
						<VInput :value="instance.connection.host" readonly />
					</VFieldSet>
				</VCol>
				<VCol :size="2">
					<VFieldSet>
						<VLabel v-t="'instances.network.port.label'" />
						<VInput :value="instance.connection.port" readonly />
					</VFieldSet>
				</VCol>
			</VRow>
		</VForm>
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

@Component({
	components: {
		VCol,
		VRow,
		VContainer,
		VAlert,
		VInput,
		VLabel,
		VFieldSet,
		VForm,
		PageHeader
	}
})
export default class InstanceNetworkView extends Vue {
	@Inject()
	private readonly instance!: Instance;

	isNetworkAssignmentFailedStatus() {
		return this.instance.status === "network-assignment-failed";
	}
}
</script>
