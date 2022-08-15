<template>
	<section
		v-show="isActive"
		:id="`tabpanel-${id}`"
		:aria-hidden="!isActive"
		:class="$style.root"
		:tabindex="isActive ? 0 : -1"
		role="tabpanel"
	>
		<slot />
	</section>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue } from "vue-facing-decorator";
import { Tab } from "@/features/shared/ui/components/design-system/tabs/VTabList.vue";

@Component
export default class VTab extends Vue {
	@Prop({ type: String, required: true })
	readonly id!: string;

	@Prop({ type: String, required: true })
	private readonly label!: string;

	@Prop({ type: Boolean, default: false })
	private readonly isDisabled!: boolean;

	@Inject({ from: "addTab" })
	private readonly addTab!: (tab: Tab) => void;

	@Inject({ from: "removeTab" })
	private readonly removeTab!: (id: string) => void;

	@Inject({ from: "tabs" })
	private readonly tabs!: Tab[];

	get isActive(): boolean {
		return this.tabs.find((tab) => tab.isActive)?.hash === this.hash;
	}

	get computedId(): string {
		return this.id.toLowerCase().replace(/ /g, "-");
	}

	get hash(): string {
		return `#${this.isDisabled ? "" : this.computedId}`;
	}

	beforeMount() {
		this.addTab({
			id: this.computedId,
			index: this.tabs.length,
			name: this.id,
			label: this.label,
			hash: this.hash,
			isActive: false,
			isDisabled: this.isDisabled
		});
	}

	beforeUnmount() {
		this.removeTab(this.computedId);
	}
}
</script>
<style lang="scss" module>
.root {
}
</style>
