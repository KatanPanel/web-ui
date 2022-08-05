<template>
	<div :class="$style.root">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VHeadline5 extends Vue {}
</script>
<style lang="scss" module>
.root {
	font-family: var(--kt-headline-font);
	font-weight: 500;
	font-size: 31px;
	letter-spacing: 0;
	margin: 1.5em 0;
}
</style>
