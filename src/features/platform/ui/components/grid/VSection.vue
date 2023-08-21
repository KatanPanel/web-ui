<template>
	<section :class="$style.root">
		<slot />
	</section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VSection extends Vue {}
</script>

<style lang="scss" module>
.root {
	margin-top: 2.4rem;
}
</style>
