<template>
	<div
		:class="[
			$style.root,
			{
				[$style.root__hoverable]: hoverable,
				[$style.root__flat]: flat,
				[$style.root__reduced]: reduced,
				[$style.root__onSurface]: onSurface,
				[$style.root__outlined]: outlined,
				[$style.root__scrollable]: scrollable
			}
		]"
	>
		<div v-if="$slots.title" :class="$style.title">
			<slot name="title" />
		</div>
		<slot />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";

@Component
export default class VCard extends Vue {
	@Prop({ type: Boolean, default: false })
	private readonly hoverable!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly flat!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly reduced!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly onSurface!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly outlined!: boolean;

	@Prop({ type: Boolean, default: false })
	private readonly scrollable!: boolean;
}
</script>

<style lang="scss" module>
.root {
	border-radius: 8px;
	padding: 2rem;
	background-color: var(--kt-background-surface);
	border: 1px solid var(--kt-border-medium);

	&:not(:last-child) {
		margin-bottom: 0.8rem;
	}
}

.root__hoverable:hover {
	cursor: pointer;
	background-color: var(--kt-background-surface-hover);
}

.root__flat {
	border-color: var(--kt-background-surface);
}

.root__onSurface {
	background-color: var(--kt-background-surface-high);
}

.root__outlined {
	background-color: transparent;
}

.root__reduced {
	padding: 1.2rem;
}

.title {
	font-weight: 600;
}

.root__scrollable {
	overflow-y: auto;
	max-height: 540px;
}
</style>
