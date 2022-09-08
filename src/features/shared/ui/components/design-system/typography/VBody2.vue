<template>
	<p :class="$style.root">
		<slot />
	</p>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VBody2 extends Vue {}
</script>
<style lang="scss" module>
.root {
	font-family: var(--kt-body-font);
	font-weight: 400;
	font-size: 14px;
	letter-spacing: 0;
	color: var(--kt-content-neutral);
	margin: 0.4rem 0 1.6rem;
	user-select: none;
}
</style>
