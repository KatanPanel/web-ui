<template>
	<div class="loader-container">
		<div class="loader" />
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
@keyframes loader-animation {
	0% {
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
	}
}

.loader {
	animation: loader-animation 1s linear infinite;
	min-width: 24px;
	min-height: 24px;
	position: relative;
	border: 2px solid rgba(255, 255, 255, 0.54);
	border-top-color: currentColor;
	border-radius: 50%;
	width: 100%;
	height: 100%;
}
</style>
