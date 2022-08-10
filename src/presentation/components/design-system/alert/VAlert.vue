<template>
	<div :class="[$style.root, `alert--variant-${variant}`]">
		<div class="alert__icon">
			<Component :is="getComponent" />
		</div>
		<div class="alert__title">
			<slot>Title</slot>
		</div>
		<div class="alert__description" v-if="$slots.description">
			<slot name="description"> Description</slot>
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
			return require(/* webpackChunkName: "icon-[request]" */
			"vue-material-design-icons/" + path + ".vue").default;

		throw new Error(`No icon defined to variant: ${this.variant}`);
	}
}
</script>
<style lang="scss" module>
.root {
	background-color: var(--kt-background-surface-high);
	box-shadow: inset 0 0 0 1.5px var(--kt-border-low);
	border-radius: 8px;
}
</style>
<style lang="scss" scoped>
$base-padding: 1.2rem;

.alert__title {
	padding: $base-padding;
	font-size: 14px;
	font-weight: 500;
}

.alert__description {
	font-size: 12px;
	margin-top: 4px;
	padding: $base-padding;
	padding-top: 0;
}

.alert--variant-error {
	background-color: var(--kt-content-negative-overlay);
	box-shadow: inset 0 0 0 1.5px var(--kt-content-negative-overlay);

	.alert__title {
		color: var(--kt-content-negative);
	}
}
</style>
