<template>
	<img :src="`/img/logo-${color}.png`" alt="Katan Logo" class="logo" />
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TheLogo extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly white!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly filled!: boolean;

	public get color(): string {
		return this.white ? "white" : this.filled ? "filled" : "blue";
	}
}
</script>
