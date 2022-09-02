<template>
	<div :class="$style.root">
		<slot />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VFlexRow extends Vue {}
</script>
<style lang="scss" module>
.root {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
</style>
