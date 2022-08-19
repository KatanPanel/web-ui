<template>
	<div :class="$style.root">
		<router-view />
	</div>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Unit } from "@/features/units/models/unit.model";

@Component
export default class UnitView extends Vue {
	@Inject()
	private readonly unit!: Unit;
}
</script>
<style lang="scss" module>
.root {
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 2.4rem;
}
</style>
