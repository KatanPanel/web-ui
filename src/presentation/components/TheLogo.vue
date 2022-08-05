<template>
	<img :alt="getLogoName" :aria-label="getLogoName" :src="getLogoSrc" />
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";

@Component
export default class TheLogo extends Vue {
	@Prop({ type: Boolean }) readonly black!: boolean;

	get getLogoSrc(): string {
		return `img/${this.black ? "logo-black" : "logo"}.svg`;
	}

	get getLogoName(): string {
		return "Katan logo";
	}
}
</script>
