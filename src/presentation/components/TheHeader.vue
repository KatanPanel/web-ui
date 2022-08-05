<template>
	<header :class="$style.root">
		Header
	</header>
</template>
<style lang="scss" module></style>
<script>
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class TheSidebar extends Vue {
}
</script>
<style lang="scss" module>
.root {
	background-color: var(--kt-background-surface-high);
}
</style>
