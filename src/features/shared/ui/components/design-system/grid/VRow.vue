<template>
	<div :class="$style.root">
		<slot />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VRow extends Vue {}
</script>
<style lang="scss" module>
.root:after {
	content: "";
	display: table;
	clear: both;
}
</style>
