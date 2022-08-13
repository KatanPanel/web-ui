<template>
	<div :class="$style.root">
		<h3>Welcome, Natan!</h3>
	</div>
</template>
<script>
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class HomeSidebarInfo extends Vue {}
</script>
<style lang="scss" module>
.root {
	background-color: var(--kt-content-primary-hover);
	height: 100%;
	width: 240px;
}
</style>
