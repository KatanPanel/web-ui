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
import VFieldSet from "@/features/platform/ui/components/form/VFieldSet.vue";
import { Component, Vue } from "vue-facing-decorator";
import VInput from "@/features/platform/ui/components/form/VInput.vue";
import VCard from "@/features/platform/ui/components/card/VCard.vue";
import VBody2 from "@/features/platform/ui/components/typography/VBody2.vue";
import VAlert from "@/features/platform/ui/components/alert/VAlert.vue";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";

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
