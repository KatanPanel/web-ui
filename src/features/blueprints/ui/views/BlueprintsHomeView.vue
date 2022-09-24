<template>
	<PageHeader :class="$style.header">
		<template #title>
			<span v-t="'blueprints.home.title'" :class="$style.header__title" />
		</template>
		<template #subtitle>
			<span v-t="'blueprints.home.subtitle'" />
		</template>
		<VButton variant="primary" :flat="true" @click="onImportClick">
			Import from remote source
		</VButton>
	</PageHeader>
	<div :class="$style.backdrop" />
	<div :class="$style.body">
		<div :class="$style.body__filters" />
		<div :class="$style.body__contents">
			<h6>Available locally</h6>
			<BlueprintsList />
			<BlueprintsList />
			<BlueprintsList />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VContainer from "@/design-system/grid/VContainer.vue";
import BlueprintsList from "@/features/blueprints/ui/components/home/BlueprintsList.vue";
import VButton from "@/design-system/button/VButton.vue";
import ImportBlueprintModal from "@/features/blueprints/ui/components/ImportBlueprintModal.vue";

@Component({
	components: { VButton, VContainer, PageHeader, BlueprintsList }
})
export default class BlueprintsHomeView extends Vue {
	onImportClick() {
		this.$vfm.show({
			component: ImportBlueprintModal
		});
	}
}
</script>

<style lang="scss" module>
.backdrop {
	background-image: url(https://wallpaperset.com/w/full/f/9/0/90893.jpg);
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	height: 240px;
	margin-left: 72px;
	z-index: -1;
}

.header {
	padding: 0 4.8rem;
}

.header__title {
	font-size: 43px;
	font-weight: 700;
	color: var(--kt-content-primary-oncolor);
}

.body {
	display: flex;
	flex-direction: row;
	position: relative;
	flex-grow: 1;
	overflow-y: hidden;
}

.body__filters {
	background-color: var(--kt-background-surface);
	height: 100%;
	padding: 0 2.4rem;
	position: relative;
}

.body__contents {
	padding: 2.4rem 4.8rem;
	flex-grow: 1;
	overflow-y: auto;
}
</style>
