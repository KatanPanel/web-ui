<template>
	<img
		v-svg-inline
		:alt="`${name} icon`"
		:src="`/icons/${name}_${color}_${dp}dp.svg`"
		class="v--icon"
	/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VIcon extends Vue {
	@Prop({ type: String, required: true })
	private readonly name!: string;

	@Prop({ type: Number, default: 24 })
	private readonly dp!: number;

	@Prop({ type: String, default: "black" })
	private readonly color!: string;
}
</script>
