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
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 8px;
	padding: 8px;
	background-color: var(--kt-background-surface);
	box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.12),
		0px 3px 4px -1px rgba(0, 0, 0, 0.04);

	&.hoverable:hover {
		cursor: pointer;
		box-shadow: inset 0 0 0 1.5px var(--kt-border-medium);
	}
}
</style>
