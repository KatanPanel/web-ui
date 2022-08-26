<template>
	<div
		:class="[
			$style.root,
			{
				[$style.alignedY]: alignY
			}
		]"
	>
		<VIcon :name="icon" :class="$style.icon" />
		<div :class="$style.text">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import VIcon from "@/features/shared/ui/components/design-system/icon/VIcon.vue";

@Component({
	components: { VIcon }
})
export default class EmptyState extends Vue {
	@Prop({ type: String, required: true })
	private readonly icon!: string;

	@Prop({ type: Boolean, default: false })
	private readonly alignY!: boolean;
}
</script>

<style lang="scss" module>
.root {
	margin: 4.8rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	user-select: none;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
}

.alignedY {
	top: 50%;
	transform: translate(-50%, 50%);
}

.icon svg {
	opacity: 0.38;
	width: 128px;
	height: 128px;
	margin-bottom: 1.2rem;
}

.text {
	text-align: center;
	color: var(--kt-content-neutral-low);

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: 600 !important;
	}

	p {
		font-weight: initial;
		margin-top: 0.4rem;
	}
}
</style>
