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
import VFieldSet from "@/design-system/form/VFieldSet.vue";
import VCard from "@/design-system/card/VCard.vue";
import VInput from "@/design-system/form/VInput.vue";
import VLabel from "@/design-system/form/VLabel.vue";
import { Component, Vue } from "vue-facing-decorator";

@Component({
	components: { VCard, VFieldSet, VLabel, VInput }
})
export default class CreateUnitName extends Vue {}
</script>

<style lang="scss" scoped></style>
