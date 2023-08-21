<template>
	<VCard :flat="true">
		<VFieldSet>
			<VLabel v-t="'instances.network.hostname.title'" :high="true" />
			<VBody2 v-t="'instances.network.hostname.subtitle'" />
			<VInput
				:value="instance.runtime.network.hostname"
				:on-surface="true"
				readonly
			/>
		</VFieldSet>
	</VCard>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Instance } from "@/features/units/api/models/instance.model";
import VFieldSet from "@/features/platform/ui/components/form/VFieldSet.vue";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";
import VInput from "@/features/platform/ui/components/form/VInput.vue";
import VBody2 from "@/features/platform/ui/components/typography/VBody2.vue";
import VCard from "@/features/platform/ui/components/card/VCard.vue";

@Component({
	components: { VCard, VFieldSet, VLabel, VInput, VBody2 }
})
export default class InstanceNetworkHostname extends Vue {
	@Inject()
	private readonly instance!: Instance;
}
</script>
