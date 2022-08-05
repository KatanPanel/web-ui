<template>
	<div :class="$style.root">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VHeadline3 extends Vue {}
</script>
<style lang="scss" module>
.root {
	font-family: var(--kt-headline-font);
	font-weight: 400;
	font-size: 61px;
	letter-spacing: 0;
	margin: 0.83em 0;
}
</style>
