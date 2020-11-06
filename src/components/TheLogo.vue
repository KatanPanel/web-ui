<template>
	<img
		:src="`/img/logo-${color}.png`"
		alt="Katan Logo"
		class="v--katan-logo"
	/>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TheLogo extends Vue {
	@Prop({
		type: String,
		default: () => "blue",
		validator: (value: string) => value === "blue" || value === "white",
	})
	private readonly color!: string;
}
</script>
