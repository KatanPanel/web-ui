<template></template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";

@Component
export default class VIcon extends Vue {
	@Prop({ type: String, required: true }) private readonly name!: string;

	get getIcon(): any {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		return require(`@/assets/icons/${this.name}.svg`).default;
	}
}
</script>
