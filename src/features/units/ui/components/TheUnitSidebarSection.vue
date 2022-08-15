<template>
	<div :class="$style.root">
		<div :class="$style.label">
			<VIcon :name="displayIcon" :class="$style.icon" />
			<span :class="$style.text">{{ displayLabel }}</span>
		</div>
		<ul :class="$style.items">
			<slot />
		</ul>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import VIcon from "@/features/shared/ui/components/design-system/icon/VIcon.vue";

@Component({
	components: { VIcon, VLabel }
})
export default class TheUnitSidebarSection extends Vue {
	@Prop({ type: String, required: true })
	private readonly displayIcon!: string;

	@Prop({ type: String, required: true })
	private readonly displayLabel!: string;
}
</script>

<style lang="scss" module>
.root {
	margin: 24px 0;
	display: flex;
	flex-direction: column;
}

.label {
	display: flex;
	flex-direction: row;
	align-items: center;
	user-select: none;
	margin-bottom: 4px;
}

.icon {
	width: 20px;
	height: 20px;
	margin-right: 12px;
	align-self: baseline;
}

.icon,
.text {
	color: var(--kt-content-neutral-low);
	display: inline-block;
}

.text {
	font-size: 14px;
}

.items {
	margin: 0 20px;
}
</style>
