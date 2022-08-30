<template>
	<div :class="$style.root">
		<div :class="$style.block">
			<div :class="$style.details">
				<h4><b>Overview</b></h4>
				<div :class="$style.analytics">
					<VLabel :on-color="true">Server Information</VLabel>
					<p></p>
				</div>
			</div>
			<!--			<div :class="$style.updateCheck">-->
			<!--				<div class="icon" />-->
			<!--				<div class="title">Checking for updates...</div>-->
			<!--			</div>-->
		</div>
		<VContainer :class="$style.container">
			<PageHeader>
				<template #title>Welcome</template>
			</PageHeader>

			<HomeUnitsList />
		</VContainer>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import HomeUnitsList from "@/features/home/ui/components/HomeUnitsList.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";

@Component({
	components: {
		VLabel,
		VContainer,
		HomeUnitsList,
		PageHeader
	}
})
export default class HomeView extends Vue {}
</script>
<style lang="scss" module>
.root {
	display: flex;
	flex-grow: 1;
}

.block {
	float: left;
	width: 360px;
	background-color: var(--kt-content-primary);
	color: var(--kt-content-primary-oncolor);
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.details {
	padding: 3.6rem 2.4rem;
}

.container {
	flex-shrink: 0;
}

.updateCheck {
	background-color: var(--kt-content-primary-oncolor);
	color: initial;
	border-radius: 8px;
	margin: 1.6rem;
	padding: 0.8rem;
}

.analytics {
	margin-top: 1.8rem;
}
</style>
