<template>
	<div :class="`alert--variant-${variant}`" class="alert">
		<div class="alert__icon">
			<VIcon :name="getIconName" />
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
	@Prop({ type: String }) readonly variant!: "default" | "info" | "error";

	get getIconName(): string {
		let name: string | undefined = undefined;
		if (this.variant === "info") name = "InformationOutline";
		if (this.variant === "error") name = "AlertCircleOutline";

		if (isUndefined(name))
			throw new Error(`No icon defined to variant: ${this.variant}`);

		return name;
	}
}
</script>
<style lang="scss" scoped>
$base-padding: 1.2rem;

.alert {
	background-color: var(--kt-background-surface-high);
	box-shadow: inset 0 0 0 1.5px var(--kt-border-low);
	border-radius: 8px;
	display: flex;
	margin-bottom: 0.8rem;
}

.alert__title {
	font-size: 15px;
	font-weight: 600;
	padding-top: 1.2rem;
	padding-right: $base-padding;
}

.alert__header {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.alert__icon {
	padding: $base-padding;
}

.alert__description {
	font-size: 13px;
	font-weight: 500;
	margin-top: 4px;
	padding: $base-padding $base-padding $base-padding 0;
}

.alert__title + .alert__description {
	padding: 0;
	padding-bottom: $base-padding;
}

.alert--variant-error {
	background-color: var(--kt-content-negative-overlay);
	box-shadow: inset 0 0 0 1.5px var(--kt-content-negative-overlay);

	.alert__icon {
		color: var(--kt-content-negative);
	}
}

.alert--variant-info {
	background-color: var(--kt-content-primary-overlay);
	box-shadow: inset 0 0 0 1.5px var(--kt-content-primary-overlay);

	.alert__icon {
		color: var(--kt-content-primary);
	}
}
</style>
