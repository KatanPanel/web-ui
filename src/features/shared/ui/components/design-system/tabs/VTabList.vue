<template>
	<ul :class="$style.root" :aria-label="accessibilityLabel" role="tablist">
		<li v-for="(tab, idx) in tabs" :key="idx" role="presentation">
			<a
				@click="selectTab(tab.hash, $event)"
				:aria-controls="tab.hash"
				:aria-selected="tab.isActive"
				:href="tab.hash"
				:class="[$style.tab, { [$style.tab__active]: tab.isActive }]"
				role="tab"
			>
				{{ tab.label }}
			</a>
		</li>
	</ul>
	<slot />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";

export type Tab = {
	id: string;
	index: number;
	name: string;
	hash: string;
	label: string;
	isActive: boolean;
	isDisabled: boolean;
};

@Component({
	emits: ["changed", "clicked"],
	provide(this: VTabList) {
		console.log("provide this", this);

		return {
			tabs: this.tabs,
			addTab(tab: Tab) {
				this.tabs.push(tab);
			},
			updateTab(id: string, payload: Partial<Tab>) {
				const idx = this.tabs.findIndex((tab) => tab.id === id);
				Object.assign(this.tabs[idx], payload);
			},
			removeTab(id: string) {
				const idx = this.tabs.findIndex((tab) => tab.id === id);
				this.tabs.splice(idx, 1);
			}
		};
	}
})
export default class VTabList extends Vue {
	@Prop({ type: String, required: true })
	private readonly accessibilityLabel!: string;

	activeTabHash = "";
	lastActiveTabHash = "";
	tabs: Tab[] = [];

	mounted() {
		if (this.tabs.length === 0) return;

		window.addEventListener("hashchange", () =>
			this.selectTab(window.location.hash)
		);

		const hash = window.location.hash;
		if (this.findTab(hash)) {
			this.selectTab(hash);
			return;
		}

		this.selectTab(this.tabs[0].hash);
	}

	selectTab(hash: string, event?: Event) {
		const selectedTab = this.findTab(hash);
		if (!selectedTab) return;

		if (event && selectedTab.isDisabled) {
			event.preventDefault();
			return;
		}

		if (this.lastActiveTabHash === selectedTab.hash) {
			this.$emit("clicked", { tab: selectedTab });
			return;
		}

		this.tabs.forEach((tab) => {
			tab.isActive = tab.hash === selectedTab.hash;
		});
		this.$emit("changed", { tab: selectedTab });
		this.lastActiveTabHash = this.activeTabHash = selectedTab.hash;
	}

	findTab(hash: string) {
		return this.tabs.find((tab) => tab.hash === hash);
	}
}
</script>
<style lang="scss" module>
.root {
	position: relative;
	top: -1px;
	display: flex;
	flex-direction: row;
	margin-top: 3.2rem;
	margin-bottom: 2.4rem;
	border-bottom: 1px solid var(--kt-border-medium);
}

.tab {
	font-size: 14px;
	padding: 0.8rem 1.2rem;
	margin: 0 0.8rem;
	color: var(--kt-content-neutral-low);
	text-decoration: none;
	display: inline-block;
	border-bottom: 2px solid transparent;
}

.tab__active {
	font-weight: 600;
	color: var(--kt-content-neutral-high);
	border-color: var(--kt-content-primary);
}
</style>
