<template>
	<div :class="$style.root">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VHeadline1 extends Vue {}
</script>
<style lang="scss" module>
.root {
	font-family: var(--kt-headline-font);
	font-weight: 300;
	font-size: 123px;
	letter-spacing: -1.5px;
	margin: 0.67em 0;
}
</style>
