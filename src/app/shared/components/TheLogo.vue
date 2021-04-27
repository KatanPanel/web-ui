<template>
	<img
		v-if="!containerized"
		:src="`/img/logo-${color}.png`"
		alt="Katan Logo"
		class="logo"
	/>
	<div
		v-else
		:style="{ backgroundImage: `/img/logo-${color}.png` }"
		class="logo"
		title="Katan Logo"
	/>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TheLogo extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly white!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly filled!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly containerized!: boolean;

	get color(): string {
		return this.white ? "white" : this.filled ? "white-filled" : "blue";
	}
}
</script>
