<template>
	<div class="v--loader" :style="{ width: size, height: size }">
		<div class="v--loader-spinner" :style="{ width: size, height: size }" />
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Loading extends Vue {
	@Prop({ type: String, default: "120px" }) private readonly size!: string;
}
</script>
<style lang="scss" scoped>
@keyframes v--loader-animation {
	0% {
		transform: rotate(0deg);
	}

	50% {
		transform: rotate(180deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

.v--loader {
	position: relative;
	transform: translateZ(0) scale(1) translateX(-50%);
	left: 50%;
	backface-visibility: hidden;

	.v--loader-spinner {
		display: inline-block;
		overflow: hidden;
		box-sizing: content-box;
		animation: v--loader-animation 1.5s linear infinite;
		top: 20px;
		left: 20px;
		border-radius: 50%;
		box-shadow: 0 2px 0 0 var(--kt-text-color);
	}
}
</style>
