<template>
	<span :class="$style.root"><slot /></span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VCaption extends Vue {}
</script>
<style lang="scss" module>
.root {
	font-family: var(--kt-body-font);
	font-weight: 400;
	font-size: 11px;
	letter-spacing: 0.4px;
}
</style>
