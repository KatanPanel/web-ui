<template>
	<div :class="$style.root">
		<slot />
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";

@Component
export default class VHorizontalStepperItem extends Vue {
	@Prop({ type: String, required: true })
	readonly name!: string;
}
</script>

<style module lang="scss">
.root {
}
</style>
