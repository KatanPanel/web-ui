<template>
	<div
		:active="isOpen"
		class="v--dropdown"
		v-click-outside="close"
		tabindex="0"
		@keyup.enter.stop="toggle"
		@click.stop="toggle"
	>
		<v-flex-box>
			<slot />
			<div v-if="!isOpen" key="closed" class="v--dropdown-caret-icon">
				<v-icon name="caret-down" />
			</div>
			<div v-else key="open" class="v--dropdown-caret-icon">
				<v-icon name="caret-up" />
			</div>
		</v-flex-box>
		<ul
			v-cloak
			ref="list"
			:class="[`drop${direction}`]"
			:style="{ visibility: isOpen ? 'visible' : 'hidden' }"
			class="v--dropdown-item-list"
		>
			<slot name="items" />
		</ul>
	</div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";

@Component<VDropdown>({
	components: { VFlexBox, VIcon },
	beforeMount(): void {
		window.addEventListener("resize", this.calculateDirection);
		window.addEventListener("scroll", this.calculateDirection);
	},
	mounted(): void {
		this.calculateDirection();
	},
	beforeDestroy(): void {
		window.removeEventListener("resize", this.calculateDirection);
		window.removeEventListener("scroll", this.calculateDirection);
	}
})
export default class VDropdown extends Vue {
	isOpen = false;
	direction = "down";

	@Ref("list")
	readonly list!: HTMLElement;

	calculateDirection(): void {
		const windowHeight = window.innerHeight;
		const listHeight = this.list.offsetHeight;
		const position = this.$el.getBoundingClientRect().y;
		this.direction = position + listHeight >= windowHeight ? "up" : "down";
	}

	toggle(): void {
		this.isOpen = !this.isOpen;
		this.$emit("toggle", this.isOpen);
	}

	close(): void {
		if (!this.isOpen) return;

		this.isOpen = false;
		this.$emit("toggle", this.isOpen);
	}
}
</script>
