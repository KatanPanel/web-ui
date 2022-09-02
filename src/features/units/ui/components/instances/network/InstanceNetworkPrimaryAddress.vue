<template>
	<VSection>
		<VLabel v-t="'instances.network.primary-address.title'" />
		<VBody2 v-t="'instances.network.primary-address.subtitle'" />
		<VRow>
			<VCol :size="9">
				<VFieldSet>
					<VLabel v-t="'instances.network.primary-address.host'" />
					<VInput :value="instance.connection.host" readonly />
				</VFieldSet>
			</VCol>
			<VCol :size="3">
				<VFieldSet>
					<VLabel v-t="'instances.network.primary-address.port'" />
					<VInput :value="instance.connection.port" readonly />
				</VFieldSet>
			</VCol>
		</VRow>
	</VSection>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import VBody2 from "@/features/shared/ui/components/design-system/typography/VBody2.vue";
import VRow from "@/features/shared/ui/components/design-system/grid/VRow.vue";
import VCol from "@/features/shared/ui/components/design-system/grid/VCol.vue";
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import { Instance } from "@/features/units/models/instance.model";
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";
import VSection from "@/features/shared/ui/components/design-system/grid/VSection.vue";

@Component({
	components: {
		VSection,
		VBody2,
		VRow,
		VCol,
		VFieldSet,
		VInput,
		VLabel,
		VCard
	}
})
export default class InstanceNetworkPrimaryAddress extends Vue {
	@Inject()
	private readonly instance!: Instance;
}
</script>
