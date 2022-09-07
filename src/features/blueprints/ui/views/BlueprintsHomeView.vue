<template>
	<VContainer>
		<PageHeader>
			<template #title>
				<span v-t="'blueprints.home.title'" />
			</template>
			<template #subtitle>
				<span v-t="'blueprints.home.subtitle'" />
			</template>
			<VButton @click="onImportClick" variant="primary" :flat="true"
				>Import from remote source</VButton
			>
		</PageHeader>
		<BlueprintsHomeListing />
	</VContainer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import BlueprintsHomeListing from "@/features/blueprints/ui/components/home/BlueprintsHomeListing.vue";
import VButton from "@/features/shared/ui/components/design-system/button/VButton.vue";
import ImportBlueprintModal from "@/features/blueprints/ui/components/ImportBlueprintModal.vue";

@Component({
	components: { VButton, VContainer, PageHeader, BlueprintsHomeListing }
})
export default class BlueprintsHomeView extends Vue {
	onImportClick() {
		this.$vfm.show({
			component: ImportBlueprintModal
		});
	}
}
</script>

<style lang="scss" module></style>
