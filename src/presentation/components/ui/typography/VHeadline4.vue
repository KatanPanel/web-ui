<template>
	<div :class="$style.root">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VHeadline4 extends Vue {}
</script>
<style lang="scss" module>
.root {
	font-family: var(--kt-headline-font);
	font-weight: 400;
	font-size: 43px;
	letter-spacing: 0.25px;
	margin: 0.16em 0;
	user-select: none;
}
</style>
