<template>
	<div :class="$style.root">
		<slot />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";

@Component
export default class VContainer extends Vue {}
</script>
<style lang="scss" module>
.root {
	position: relative;
	width: 100%;
	max-width: 1170px;
	margin: 0 auto;
	box-sizing: border-box;

	&:after {
		content: "";
		display: table;
		clear: both;
	}
}

// TODO fix breakpoints to container
//@media (min-width: map-get($breakpoints, "small")) {
//	.root {
//		width: 95%;
//		padding: 0;
//	}
//}
</style>
