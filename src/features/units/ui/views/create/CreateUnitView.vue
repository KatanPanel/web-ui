<template>
	<div :class="$style.root">
		<h2 :class="$style.title">Create unit</h2>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class CreateUnitView extends Vue {}
</script>

<style lang="scss" module>
.root {
	background-color: var(--kt-content-primary);
	color: var(--kt-content-primary-oncolor);
	height: 100%;
	padding: 4.8rem;
}

.title {
	text-align: center;
	font-weight: 700;
	user-select: none;
}
</style>
