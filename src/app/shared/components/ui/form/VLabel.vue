<template>
	<div :class="$style.component">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VLabel extends Vue {
}
</script>
<style lang="scss" module>
.component {
	display: inline-block;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 700;
	margin-bottom: 6px;
	user-select: none;
}
</style>
