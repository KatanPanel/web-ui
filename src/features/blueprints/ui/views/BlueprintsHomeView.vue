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
		<BlueprintsHomeListing />
	</VContainer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import BlueprintsHomeListing from "@/features/blueprints/components/home/BlueprintsHomeListing.vue";

@Component({
	components: { VContainer, PageHeader, BlueprintsHomeListing }
})
export default class BlueprintsHomeView extends Vue {}
</script>

<style lang="scss" module></style>
