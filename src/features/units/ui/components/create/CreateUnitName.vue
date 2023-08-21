<template>
	<VCard flat>
		<VFieldSet>
			<VLabel required> Name </VLabel>
			<VInput
				placeholder="My Awesome Unit!"
				required
				:on-surface="true"
			/>
		</VFieldSet>
	</VCard>
</template>

<script lang="ts">
import VFieldSet from "@/features/platform/ui/components/form/VFieldSet.vue";
import VCard from "@/features/platform/ui/components/card/VCard.vue";
import VInput from "@/features/platform/ui/components/form/VInput.vue";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";
import { Component, Vue } from "vue-facing-decorator";

@Component({
	components: { VCard, VFieldSet, VLabel, VInput }
})
export default class CreateUnitName extends Vue {}
</script>

<style lang="scss" scoped></style>
