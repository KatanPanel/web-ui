<template>
	<div
		class="icon"
		:class="`state__${state}`"
		:aria-label="getLabel()"
		:title="getLabel()"
	>
		<VIcon :name="getIconName()" />
	</div>
</template>

<script lang="ts">
import VIcon from "@/features/platform/ui/components/icon/VIcon.vue";
import { Component, Prop, Vue } from "vue-facing-decorator";

const UPDATE = "update";
const OK = "ok";

type States = typeof OK | typeof UPDATE;

@Component({
	components: { VIcon }
})
export default class AboutInfoUpdateState extends Vue {
	@Prop({ type: String })
	private readonly state!: States;

	getIconName(): string {
		if (this.state == UPDATE) return "Update";
		return "ShieldCheck";
	}

	getLabel(): string {
		if (this.state == UPDATE) return "Needs update";
		return "Updated";
	}
}
</script>

<style lang="scss" scoped>
.icon {
	:deep(svg) {
		width: 40px;
		height: 40px;
	}

	.state__ok :deep(svg) {
		fill: var(--kt-content-success);
	}

	.state__update :deep(svg) {
		fill: var(--kt-content-negative);
	}
}
</style>
