<template>
	<ul :class="$style.root">
		<slot />
	</ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class TheUnitSidebarSection extends Vue {}
</script>

<style lang="scss" module>
.root {
	margin-top: 1.2rem;
	display: flex;
	flex-direction: column;

	&:first-child {
		margin-top: 2.4rem;
	}
}
</style>
