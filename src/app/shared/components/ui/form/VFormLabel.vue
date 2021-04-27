<template>
	<label class="v--form-label">
		<slot />
	</label>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VFormLabel extends Vue {
}
</script>
<style lang="scss" scoped>
.v--form-label {
	display: block;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 700;
	color: var(--kt-muted-darker-color);
	cursor: default;
	gap: 8px;

	input {
		margin-top: 6px;
	}
}
</style>
