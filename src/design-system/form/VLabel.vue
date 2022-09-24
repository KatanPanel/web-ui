<template>
	<label
		:class="[
			$style.root,
			{
				[$style.onColor]: onColor,
				[$style.high]: high,
				[$style.required]: required
			}
		]"
	>
		<slot />
	</label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";

@Component
export default class VLabel extends Vue {
	@Prop({ type: Boolean })
	private readonly onColor!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly required!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly high!: boolean;
}
</script>
<style lang="scss" module>
.root {
	font-family: var(--kt-headline-font);
	color: var(--kt-content-neutral);
	font-size: 12px;
	font-weight: 700;
	line-height: 21.75px;
	letter-spacing: 0.285px;
	text-transform: uppercase;
	user-select: none;
	margin-bottom: 0.2rem;

	&:not(:first-child) {
		margin-top: 16px;
	}
}

.high {
	color: var(--kt-content-neutral-high);
}

.onColor {
	color: var(--kt-content-primary-oncolor);
}

.required::after {
	content: "*";
	position: relative;
	display: inline-block;
	color: var(--kt-content-negative);
	font-size: 14px;
}
</style>
