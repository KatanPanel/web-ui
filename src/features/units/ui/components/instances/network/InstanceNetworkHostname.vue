<template>
	<VCard :flat="true">
		<VFieldSet>
			<VLabel v-t="'instances.network.hostname.title'" />
			<VBody2 v-t="'instances.network.hostname.subtitle'" />
			<VInput :value="instance.runtime.network.hostname" :on-surface="true" readonly />
		</VFieldSet>
	</VCard>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Instance } from "@/features/units/models/instance.model";
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import VBody2 from "@/features/shared/ui/components/design-system/typography/VBody2.vue";
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";

@Component({
	components: { VCard, VFieldSet, VLabel, VInput, VBody2 }
})
export default class InstanceNetworkHostname extends Vue {
	@Inject()
	private readonly instance!: Instance;
}
</script>
