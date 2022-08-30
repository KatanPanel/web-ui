<template>
	<div
		:class="[$style.root, { [$style.root__disabled]: disabled }]"
		:aria-disabled="disabled"
		:aria-labelledby="label"
		v-if="!disabled"
	>
		<VLabel v-text="label" :class="$style.label" :aria-label="label" />
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";

@Component({
	components: { VLabel }
})
export default class TheUnitSidebarSection extends Vue {
	@Prop({ type: String, required: true })
	private readonly label!: string;

	@Prop({ type: Boolean, required: true, default: false })
	private readonly disabled!: boolean;
}
</script>

<style lang="scss" module>
.root {
	display: flex;
	flex-direction: column;

	&:first-child {
		margin-top: 2.4rem;
	}
}

.root__disabled {
	opacity: 0.38;
	cursor: not-allowed;
}

.label {
	margin: 2.4rem 2.4rem 0.4rem;
	display: inline-block;
	color: var(--kt-content-neutral);
	font-size: 12px;
	font-weight: 700;
}
</style>
