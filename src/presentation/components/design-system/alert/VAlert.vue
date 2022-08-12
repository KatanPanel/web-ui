<template>
	<div class="alert" :class="`alert--variant-${variant}`">
		<div class="alert__icon">
			<Component :is="getComponent" />
		</div>
		<div class="alert__header">
			<div class="alert__title">
				<slot>Title</slot>
			</div>
			<div class="alert__description" v-if="$slots.description">
				<slot name="description"> Description</slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import AlertCircleOutlineIcon from "vue-material-design-icons/AlertCircleOutline.vue";
import { isUndefined } from "@/utils";

@Component({
	components: { AlertCircleOutlineIcon }
})
export default class VAlert extends Vue {
	@Prop({ type: String }) readonly variant!: "default" | "error";

	get getComponent() {
		let path: string | undefined = undefined;
		if (this.variant == "error") path = "AlertCircleOutline";

		if (!isUndefined(path))
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			return require(/* webpackChunkName: "icon-[request]" */
			"vue-material-design-icons/" + path + ".vue").default;

		throw new Error(`No icon defined to variant: ${this.variant}`);
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
}

.alert__title {
	font-size: 14px;
	font-weight: 500;
	padding-top: 1.2rem;
	padding-right: $base-padding;
}

.alert__icon {
	padding: $base-padding;
}

.alert__description {
	font-size: 13px;
	margin-top: 4px;
	padding-bottom: $base-padding;
	padding-right: $base-padding;
}

.alert--variant-error {
	background-color: var(--kt-content-negative-overlay);
	box-shadow: inset 0 0 0 1.5px var(--kt-content-negative-overlay);

	.alert__title,
	.alert__icon {
		color: var(--kt-content-negative);
	}
}
</style>
