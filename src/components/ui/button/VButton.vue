<template>
	<button
		class="v--button"
		:class="{
			'v--button-flat': flat,
			'v--button-primary': primary,
			'v--button-danger': danger
		}"
	>
		<slot />
	</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VButton extends Vue {
	@Prop({ type: Boolean, default: false }) private readonly flat!: boolean;
	@Prop({ type: Boolean, default: false }) private readonly primary!: boolean;
	@Prop({ type: Boolean, default: false }) private readonly danger!: boolean;
}
</script>
