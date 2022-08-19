<template>
	<div
		:class="$style.root"
		:style="{
			backgroundImage: `url(${this.source})`
		}"
		:aria-label="label"
		role="figure"
	/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { isUndefined } from "@/utils";

@Component
export default class Avatar extends Vue {
	@Prop({ type: String, required: true })
	private readonly src?: string | undefined;

	@Prop({ type: String, required: true })
	private readonly label!: string;

	get source(): string {
		return isUndefined(this.src) ? "/img/logo-black.svg" : this.src;
	}
}
</script>

<style lang="scss" module>
.root {
	width: 100%;
	height: 100%;
	min-height: 40px;
	min-width: 40px;
	box-shadow: 0 0 4px 0 RGB(0 0 0 / 12%) inset;
	margin-right: 16px;
	border-radius: 50%;
	background-size: cover;
	background-position: center;
	background-color: var(--kt-background-surface-high);
}
</style>
