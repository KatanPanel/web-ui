<template>
	<VContainer>
		<PageHeader>
			<template #title>{{ $t("blueprints.home.title") }}</template>
		</PageHeader>
	</VContainer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";

@Component({
	components: { VContainer, PageHeader }
})
export default class BlueprintsHomeView extends Vue {}
</script>

<style lang="scss" module></style>
