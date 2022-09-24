<template>
	<span :class="$style.root"><slot /></span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VOverline extends Vue {}
</script>
<style lang="scss" module>
.root {
	font-family: var(--kt-body-font);
	font-weight: 400;
	font-size: 9px;
	letter-spacing: 1.5px;
}
</style>
