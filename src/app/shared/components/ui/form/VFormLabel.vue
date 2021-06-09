<template>
	<label :class="$style.component">
		<slot />
	</label>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VFormLabel extends Vue {
}
</script>
<style lang="scss" module>
.component {
	display: block;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 700;
	user-select: none;
	margin-bottom: 6px;
}
</style>
