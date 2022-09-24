<template>
	<div :class="`alert--variant-${variant}`" class="alert" role="alert">
		<div class="alert__icon">
			<VIcon class="alert__icon__svg" :name="getIconName()" />
		</div>
		<div class="alert__header">
			<div v-if="$slots.title" class="alert__title">
				<slot name="title"> Title </slot>
			</div>
			<div v-if="$slots.description" class="alert__description">
				<slot name="description"> Description </slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { isUndefined } from "@/utils";
import VIcon from "@/design-system/icon/VIcon.vue";

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
<style lang="scss" src="@/assets/styles/components/alert.scss" scoped />
