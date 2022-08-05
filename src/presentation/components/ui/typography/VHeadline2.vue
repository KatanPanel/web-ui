<template>
	<div :class="$style.root">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VHeadline2 extends Vue {}
</script>
<style lang="scss" module>
.root {
	font-family: var(--kt-headline-font);
	font-weight: 300;
	font-size: 77px;
	letter-spacing: -0.5px;
	margin: 0.75em 0;
}
</style>
