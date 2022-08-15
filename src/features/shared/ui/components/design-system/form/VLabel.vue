<template>
	<label :class="$style.root">
		<slot />
	</label>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VLabel extends Vue {}
</script>
<style lang="scss" module>
.root {
	font-family: var(--kt-headline-font);
	color: var(--kt-content-neutral-low);
	font-size: 12px;
	font-weight: 600;
	line-height: 21.75px;
	letter-spacing: 0.285px;
	text-transform: uppercase;
	user-select: none;

	&:not(:first-child) {
		margin-top: 16px;
	}
}
</style>
