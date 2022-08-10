<template>
	<p :class="$style.root">
		<slot />
	</p>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VBody1 extends Vue {}
</script>
<style lang="scss" module>
.root {
	font-family: var(--kt-body-font);
	font-weight: 400;
	font-size: 15px;
	letter-spacing: 0.5px;
}
</style>
