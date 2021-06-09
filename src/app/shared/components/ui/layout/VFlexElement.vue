<template>
	<div :style="{ flexGrow: grow, flexBasis: flexBasis }">
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VFlexElement extends Vue {
	@Prop({ type: [Number, String] })
	private readonly grow!: string | number;

	@Prop({
		type: [String, Number],
		validator(value: any): boolean {
			return (
				typeof value === "number" ||
				value in ["auto", "inherit", "initial", "revert", "unset"]
			);
		}
	})
	private readonly basis!: string | number;

	get flexBasis(): string {
		return typeof this.basis === "number" ? `${this.basis}%` : this.basis;
	}

}
</script>
