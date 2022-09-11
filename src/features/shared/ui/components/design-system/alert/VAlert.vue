<template>
	<div :class="`alert--variant-${variant}`" class="alert">
		<div class="alert__icon">
			<VIcon class="alert__icon__svg" :name="getIconName()" />
		</div>
		<div class="alert__header">
			<div v-if="$slots.title" class="alert__title">
				<slot name="title">Title</slot>
			</div>
			<div v-if="$slots.description" class="alert__description">
				<slot name="description"> Description</slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { isUndefined } from "@/utils";
import VIcon from "@/features/shared/ui/components/design-system/icon/VIcon.vue";

@Component({
	components: { VIcon }
})
export default class VAlert extends Vue {
	@Prop({ type: String }) readonly variant!:
		| "default"
		| "info"
		| "error"
		| "warn";

	getIconName(): string {
		let name: string | undefined = undefined;
		if (this.variant === "default") name = "HelpCircleOutline";
		if (this.variant === "info") name = "InformationOutline";
		if (this.variant === "error") name = "AlertCircleOutline";
		if (this.variant === "warn") name = "AlertOutline";

		if (isUndefined(name))
			throw new Error(`No icon defined to variant: ${this.variant}`);

		return name;
	}
}
</script>
<style lang="scss" scoped>
$base-padding: 1.2rem;
$shadow: 1.5px;

.alert {
	background-color: var(--kt-background-surface-high);
	border: 1px solid var(--kt-border-medium);
	border-radius: 8px;
	display: flex;
}

.alert__title {
	font-size: 15px;
	font-weight: 600;
	padding-top: 1.2rem;
	padding-right: $base-padding;
	user-select: none;
}

.alert__header {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.alert__icon {
	padding: $base-padding $base-padding 0 $base-padding;
}

.alert__icon__svg :deep(svg) {
	width: 20px !important;
	height: 20px;
	vertical-align: baseline;
}

.alert__description {
	font-size: 14px;
	font-weight: 500;
	padding: $base-padding $base-padding $base-padding 0;
	user-select: none;
	color: var(--kt-content-neutral-high);
}

.alert__title + .alert__description {
	padding: 0 0 $base-padding;
}

.alert--variant-error {
	background-color: var(--kt-content-negative-overlay);
	border-color: var(--kt-content-negative-overlay);

	.alert__icon {
		color: var(--kt-content-negative);
	}
}

.alert--variant-warn {
	background-color: var(--kt-content-warn-overlay);
	border-color: var(--kt-content-warn-overlay);

	.alert__icon {
		color: var(--kt-content-warn);
	}
}

.alert--variant-info {
	background-color: var(--kt-content-primary-overlay);
	border-color: var(--kt-content-primary-overlay);

	.alert__icon {
		color: var(--kt-content-primary);
	}
}
</style>
