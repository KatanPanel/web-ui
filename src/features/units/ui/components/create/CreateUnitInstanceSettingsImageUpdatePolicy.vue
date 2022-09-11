<template>
	<VCard :flat="true">
		<VLabel v-t="'units.create.instance.iup.title'" />
		<VBody2 v-t="'units.create.instance.iup.description'" />
		<VAlert variant="info">
			<template #description>
				<span v-t="'units.create.instance.iup.alert'" />
			</template>
		</VAlert>
		<VFieldSet :class="$style.fieldset">
			<VInput value="Always" readonly :on-surface="true" />
		</VFieldSet>
	</VCard>
</template>

<script lang="ts">
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import { Component, Vue } from "vue-facing-decorator";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";
import VBody2 from "@/features/shared/ui/components/design-system/typography/VBody2.vue";
import VAlert from "@/features/shared/ui/components/design-system/alert/VAlert.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";

@Component({
	components: {
		VCard,
		VBody2,
		VInput,
		VFieldSet,
		VAlert,
		VLabel
	}
})
export default class CreateUnitInstanceSettingsImageUpdatePolicy extends Vue {}
</script>
<style lang="scss" module>
.fieldset {
	margin-top: 2.4rem;
}
</style>
