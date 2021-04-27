<template>
	<div
		:class="{
			[$style.containerized]: containerized,
			[$style['display-flex']]: !inline,
			[$style['display-inline']]: inline,
			[$style['direction-column']]: column,
			[$style['align-center']]: alignCenter,
			[$style[`justify-${justify}`]]: justify
		}"
	>
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VFlexBox extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly containerized!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly inline!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly column!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly alignCenter!: boolean;

	@Prop({ type: String, default: "normal" })
	private readonly justify!: "flex-end" | "space-between";
}
</script>
<style lang="scss" module>
.containerized {
	width: 100%;
	max-width: 100%;
}

.display-flex {
	display: flex;
}

.display-inline {
	display: inline-flex;
}

.direction-column {
	flex-direction: column;
}

.align-center {
	align-items: center;
	align-content: center;
}

.justify-normal {
	justify-content: normal;
}

.justify-space-between {
	justify-content: space-between;
}

.justify-flex-end {
	justify-content: flex-end;
}
</style>
