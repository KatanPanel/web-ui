<template>
	<div :class="`v--col-${size}`">
		<slot />
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";

@Component
export default class VCol extends Vue {
	@Prop({ type: Number, required: true }) private readonly size!: number;
}
</script>
<style lang="scss" scoped>
[class*="v--col-"] {
	min-height: 1px;
	width: 100%;
	float: left;
	box-sizing: border-box;
}

@media (min-width: 550px) {
	[class*="v--col-"] {
		margin-left: 2%;

		&:first-child {
			margin-left: 0;
		}
	}
	.v--col-1 {
		width: 6.5%;
	}
	.v--col-2 {
		width: 15%;
	}
	.v--col-3 {
		width: 23.5%;
	}
	.v--col-4 {
		width: 32%;
	}
	.v--col-5 {
		width: 40.5%;
	}
	.v--col-6 {
		width: 49%;
	}
	.v--col-7 {
		width: 57.5%;
	}
	.v--col-8 {
		width: 66%;
	}
	.v--col-9 {
		width: 74.5%;
	}
	.v--col-10 {
		width: 83%;
	}
	.v--col-11 {
		width: 91.5%;
	}
	.v--col-12 {
		width: 100%;
		margin-left: 0;
	}
	.v--col-2:nth-of-type(6n + 1),
	.v--col-3:nth-of-type(4n + 1),
	.v--col-4:nth-of-type(3n + 1),
	.v--col-6:nth-of-type(2n + 1) {
		margin-left: 0;
		clear: both;
	}
}
</style>
