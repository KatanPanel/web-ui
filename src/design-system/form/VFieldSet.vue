<template>
	<fieldset :class="$style.root">
		<slot />
	</fieldset>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VFieldSet extends Vue {}
</script>
<style lang="scss" module>
.root {
	position: relative;
	display: flex;
	flex-direction: column;

	&:not(:last-child) {
		margin-bottom: 1.6rem;
	}

	&[disabled] {
		background-color: var(--kt-background-surface-high);
	}
}
</style>
