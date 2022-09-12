<template>
	<section
		v-show="isActive"
		:id="`tabpanel-${id}`"
		:aria-hidden="!isActive"
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
	@Prop({ type: String, required: true }) readonly id!: string;
	@Prop({ type: String, required: true }) readonly label!: string;
	@Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
	@Prop({ type: String }) readonly icon!: string;

	@Inject()
	private readonly addTab!: (tab: Tab) => void;

	@Inject()
	private readonly removeTab!: (id: string) => void;

	@Inject()
	private readonly tabs!: Tab[];

	get isActive(): boolean {
		return this.tabs.find((tab) => tab.isActive)?.hash === this.hash;
	}

	get computedId(): string {
		return this.id.toLowerCase().replace(/ /g, "-");
	}

	get hash(): string {
		return `#${this.disabled ? "" : this.computedId}`;
	}

	beforeMount() {
		this.addTab({
			id: this.computedId,
			index: this.tabs.length,
			name: this.id,
			label: this.label,
			hash: this.hash,
			isActive: false,
			isDisabled: this.disabled,
			icon: this.icon
		});
	}

	beforeUnmount() {
		this.removeTab(this.computedId);
	}
}
</script>
