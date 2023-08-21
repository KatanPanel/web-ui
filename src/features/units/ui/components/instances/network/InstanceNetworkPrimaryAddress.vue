<template>
	<VCard :flat="true" :class="$style.root">
		<VLabel v-t="'instances.network.primary-address.title'" />
		<VBody2 v-t="'instances.network.primary-address.subtitle'" />
		<VRow>
			<VCol :size="9">
				<VFieldSet>
					<VLabel v-t="'instances.network.primary-address.host'" />
					<VInput
						:value="instance.connection.host"
						:on-surface="true"
						readonly
					/>
				</VFieldSet>
			</VCol>
			<VCol :size="3">
				<VFieldSet>
					<VLabel v-t="'instances.network.primary-address.port'" />
					<VInput
						:value="instance.connection.port"
						:on-surface="true"
						readonly
					/>
				</VFieldSet>
			</VCol>
		</VRow>
	</VCard>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import VBody2 from "@/features/platform/ui/components/typography/VBody2.vue";
import VRow from "@/features/platform/ui/components/grid/VRow.vue";
import VCol from "@/features/platform/ui/components/grid/VCol.vue";
import VFieldSet from "@/features/platform/ui/components/form/VFieldSet.vue";
import VInput from "@/features/platform/ui/components/form/VInput.vue";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";
import { Instance } from "@/features/units/api/models/instance.model";
import VCard from "@/features/platform/ui/components/card/VCard.vue";
import VSection from "@/features/platform/ui/components/grid/VSection.vue";

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
<style lang="scss" module>
.root {
	background-color: var(--kt-content-primary);
	color: var(--kt-content-primary-oncolor);

	p,
	label {
		color: var(--kt-content-primary-oncolor);
	}
}
</style>
