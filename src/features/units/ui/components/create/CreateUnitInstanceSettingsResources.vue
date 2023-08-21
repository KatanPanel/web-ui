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
import VFieldSet from "@/features/platform/ui/components/form/VFieldSet.vue";
import { Component, Vue } from "vue-facing-decorator";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";
import VInput from "@/features/platform/ui/components/form/VInput.vue";
import VCard from "@/features/platform/ui/components/card/VCard.vue";
import VCol from "@/features/platform/ui/components/grid/VCol.vue";
import VRow from "@/features/platform/ui/components/grid/VRow.vue";
import VBody2 from "@/features/platform/ui/components/typography/VBody2.vue";
import VIcon from "@/features/platform/ui/components/icon/VIcon.vue";
import VSection from "@/features/platform/ui/components/grid/VSection.vue";

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
