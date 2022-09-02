<template>
	<div
		:class="[
			$style.root,
			{
				[$style.root__hoverable]: hoverable,
				[$style.root__flat]: flat,
				[$style.root__reduced]: reduced
			}
		]"
	>
		<div :class="$style.title" v-if="$slots.title">
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
}
</script>

<style lang="scss" module>
.root {
	border-radius: 8px;
	padding: 2.4rem;
	background-color: var(--kt-background-surface);
	border: 1px solid var(--kt-border-low);
}

.root__hoverable:hover {
	cursor: pointer;
	background-color: var(--kt-background-surface-hover);
}

.root__flat {
	border-color: var(--kt-background-surface);
}

.root__reduced {
	padding: 1.2rem;
}

.title {
	font-weight: 600;
}
</style>
