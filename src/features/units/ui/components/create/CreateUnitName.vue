<template>
	<VCard>
		<VRow>
			<VCol size="8">
				<VFieldSet>
					<VLabel required> Unit name</VLabel>
					<VInput
						required
						on-surface
						auto-focus
						@update:model-value="onNameChange"
					/>
				</VFieldSet>
			</VCol>
			<VCol size="4">
				<VFieldSet>
					<VLabel required>Select Template</VLabel>
					<VInput
						required
						on-surface
						@update:model-value="onTemplateChange"
					/>
				</VFieldSet>
			</VCol>
		</VRow>
	</VCard>
</template>

<script lang="ts">
import VFieldSet from "@/features/platform/ui/components/form/VFieldSet.vue";
import VCard from "@/features/platform/ui/components/card/VCard.vue";
import VInput from "@/features/platform/ui/components/form/VInput.vue";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";
import { Component, Vue } from "vue-facing-decorator";
import VRow from "@/features/platform/ui/components/grid/VRow.vue";
import VCol from "@/features/platform/ui/components/grid/VCol.vue";

@Component({
	components: { VCol, VRow, VCard, VFieldSet, VLabel, VInput },
	emits: ["update:name", "update:template"]
})
export default class CreateUnitName extends Vue {
	onNameChange(name: string) {
		this.$emit("update:name", name);
	}

	onTemplateChange(template: string) {
		this.$emit("update:template", template);
	}
}
</script>

<style lang="scss" scoped></style>
