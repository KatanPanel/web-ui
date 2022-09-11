<template>
	<VContainer>
		<h2 :class="$style.title">Create unit</h2>
<!--		<CreateUnitName />-->
		<CreateUnitInstanceSettings />
	</VContainer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import CreateUnitInstanceSettings from "@/features/units/ui/components/create/CreateUnitInstanceSettings.vue";
import CreateUnitName from "@/features/units/ui/components/create/CreateUnitName.vue";

@Component({
	components: {
		VContainer,
		CreateUnitName,
		CreateUnitInstanceSettings
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

.mainCard {
	background-color: var(--kt-content-primary);
	color: var(--kt-content-primary-oncolor);

	label {
		color: var(--kt-content-primary-oncolor);
	}
}
</style>
