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
	margin: 24px 0;
	display: flex;
	flex-direction: column;
}
</style>
