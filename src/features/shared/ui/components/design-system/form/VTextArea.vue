<template>
	<textarea
		:class="$style.root"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VTextArea extends Vue {}
</script>

<style lang="scss" module>
.root {
	background-color: var(--kt-background-surface);
	padding: 0.8rem;
	width: 100%;
	height: 100%;
}
</style>
