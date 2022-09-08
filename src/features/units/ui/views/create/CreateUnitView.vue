<template>
	<VContainer>
		<h2 :class="$style.title">Create unit</h2>
		<VRow>
			<VCol :size="6">
				<VLabel>Unit name</VLabel>
				<VInput />
			</VCol>
			<VCol :size="6">
				<VSection>
					<VFieldSet>
						<VLabel>IP address</VLabel>
						<VBody2>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation ullamco laboris nisi ut aliquip
							ex ea commodo consequat
						</VBody2>
						<VInput placeholder="127.0.0.1" />
					</VFieldSet>
				</VSection>
				<VSection>
					<VFieldSet>
						<VLabel>Port</VLabel>
						<VInput placeholder="25565" />
					</VFieldSet>
				</VSection>
			</VCol>
		</VRow>
	</VContainer>
</template>

<script lang="ts">
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import VSection from "@/features/shared/ui/components/design-system/grid/VSection.vue";
import { Component, Vue } from "vue-facing-decorator";
import VRow from "@/features/shared/ui/components/design-system/grid/VRow.vue";
import VCol from "@/features/shared/ui/components/design-system/grid/VCol.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";
import VForm from "@/features/shared/ui/components/design-system/form/VForm.vue";
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import VBody2 from "@/features/shared/ui/components/design-system/typography/VBody2.vue";

@Component({
	components: {
		VForm,
		VFieldSet,
		VSection,
		VRow,
		VCol,
		VContainer,
		VLabel,
		VInput,
		PageHeader,
		VCard,
		VBody2
	}
})
export default class CreateUnitView extends Vue {}
</script>

<style lang="scss" module>
.title {
	text-align: center;
	font-weight: 700;
	user-select: none;
	margin: 3.6rem 0;
}
</style>
