<template>
	<div :class="[$style.root, `alert--variant-${variant}`]">
		<div class="alert__icon">
			<VIcon name="alert-circle-outline" />
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
import VIcon from "@/presentation/components/ui/icon/VIcon.vue";

@Component({
	components: { VIcon },
})
export default class VButton extends Vue {
	@Prop({ type: String }) readonly variant!: "default" | "error";
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

.alert--variant-danger {
	background-color: var(--kt-content-negative-overlay);
	box-shadow: inset 0 0 0 1.5px var(--kt-content-negative-overlay);

	.alert__title {
		color: var(--kt-content-negative);
	}
}
</style>
