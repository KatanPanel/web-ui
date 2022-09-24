<template>
	<VCard :flat="true" :scrollable="true">
		<h5 v-t="'units.create.instance.resources.title'" />
		<VBody2>
			<i18n-t keypath="units.create.instance.resources.subtitle" />
		</VBody2>
		<VSection>
			<VRow>
				<VCol :size="3">
					<h6 :class="$style.titleWithIcon">
						<VIcon name="Ruler" />
						<span
							v-t="'units.create.instance.resources.memory.title'"
						/>
					</h6>
				</VCol>
				<VCol :size="9">
					<VCard :reduced="true" :outlined="true">
						<VFieldSet>
							<VLabel
								v-t="
									'units.create.instance.resources.memory.limit.label'
								"
							/>
							<VBody2
								v-t="
									'units.create.instance.resources.memory.limit.description'
								"
							/>
							<VInput
								type="number"
								value="1024"
								:on-surface="true"
								hint="MB"
								placeholder="1024"
							/>
						</VFieldSet>
					</VCard>
				</VCol>
			</VRow>
		</VSection>
		<VSection>
			<VRow>
				<VCol :size="3">
					<h6 :class="$style.titleWithIcon">
						<VIcon name="Memory" />
						<span
							v-t="'units.create.instance.resources.cpu.title'"
						/>
					</h6>
				</VCol>
				<VCol :size="9">
					<VCard :reduced="true" :outlined="true">
						<VFieldSet>
							<VLabel
								v-t="
									'units.create.instance.resources.cpu.limit.label'
								"
							/>
							<VInput type="number" :on-surface="true" />
						</VFieldSet>
					</VCard>
				</VCol>
			</VRow>
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
export default class CreateUnitInstanceSettingsResources extends Vue {}
</script>
<style lang="scss" module>
.titleWithIcon {
	vertical-align: middle;
	svg {
		color: var(--kt-content-primary);
		margin-bottom: 0.25rem;
		margin-right: 0.4rem;
		margin-left: -0.2rem;
	}
}
</style>
