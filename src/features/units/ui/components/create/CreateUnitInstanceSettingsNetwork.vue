<template>
	<VCard :flat="true">
		<VRow>
			<VCol :size="6">
				<VFieldSet>
					<VLabel v-t="'units.create.instance.network.ip.label'" />
					<VInput placeholder="127.0.0.1" :on-surface="true" />
				</VFieldSet>
			</VCol>
			<VCol :size="6">
				<VFieldSet>
					<VLabel v-t="'units.create.instance.network.port.label'" />
					<VInput placeholder="25565" :on-surface="true" />
				</VFieldSet>
			</VCol>
		</VRow>
		<VSection>
			<VFieldSet>
				<VLabel v-t="'units.create.instance.network.hostname.label'" />
				<VBody2
					v-t="'units.create.instance.network.hostname.description'"
				/>
				<VInput :on-surface="true" />
			</VFieldSet>
		</VSection>
	</VCard>
</template>

<script lang="ts">
import VFieldSet from "@/design-system/form/VFieldSet.vue";
import { Component, Vue } from "vue-facing-decorator";
import VLabel from "@/design-system/form/VLabel.vue";
import VInput from "@/design-system/form/VInput.vue";
import VCard from "@/design-system/card/VCard.vue";
import VCol from "@/design-system/grid/VCol.vue";
import VRow from "@/design-system/grid/VRow.vue";
import VBody2 from "@/design-system/typography/VBody2.vue";
import VIcon from "@/design-system/icon/VIcon.vue";
import VSection from "@/design-system/grid/VSection.vue";

@Component({
	components: {
		VRow,
		VCol,
		VCard,
		VInput,
		VLabel,
		VFieldSet,
		VBody2,
		VIcon,
		VSection
	}
})
export default class CreateUnitInstanceSettingsNetwork extends Vue {}
</script>
