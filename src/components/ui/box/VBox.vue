<template>
	<div
		:class="{
			'v--box-outlined': outlined,
			'v--box-no-shadow': noShadow,
			...getColorClasses,
		}"
		class="v--box"
	>
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Coloured } from "@/mixins/ui/coloured";
import { mixins } from "vue-class-component";

@Component
export default class VBox extends mixins(Coloured) {
	@Prop({ type: Boolean, default: false })
	private readonly outlined!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly noShadow!: boolean;
}
</script>
