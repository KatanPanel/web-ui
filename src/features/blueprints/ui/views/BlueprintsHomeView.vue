<template>
	<VContainer>
		<PageHeader>
			<template #title>
				<span v-t="'blueprints.home.title'" />
			</template>
			<template #subtitle>
				<span v-t="'blueprints.home.subtitle'" />
			</template>
		</PageHeader>
		<!--		<VButton variant="primary">Import</VButton>-->
		<VCard>
			<EmptyState icon="ScriptOutline">
				<h6 v-t="'blueprints.empty-state.title'" />
				<p v-t="'blueprints.empty-state.description'" />
			</EmptyState>
		</VCard>
	</VContainer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import EmptyState from "@/features/shared/ui/components/EmptyState.vue";
import VButton from "@/features/shared/ui/components/design-system/button/VButton.vue";
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";

@Component({
	components: { EmptyState, VContainer, PageHeader, VButton, VCard }
})
export default class BlueprintsHomeView extends Vue {}
</script>

<style lang="scss" module></style>
