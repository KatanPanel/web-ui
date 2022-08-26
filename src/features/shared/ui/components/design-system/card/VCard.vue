<template>
	<div class="card" :class="{ hoverable: hoverable }">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";

@Component
export default class VCard extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly hoverable!: boolean;
}
</script>

<style lang="scss" scoped>
.card {
	border-radius: 8px;
	padding: 8px;
	background-color: var(--kt-background-surface);
	box-shadow: 0 0 1px rgba(0, 0, 0, 0.12), 0 3px 4px -1px rgba(0, 0, 0, 0.04);

	&.hoverable:hover {
		cursor: pointer;
		background-color: var(--kt-background-surface-hover);
	}
}
</style>
