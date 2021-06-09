<template>
	<component
		:is="tag"
		:active="isOpen"
		v-bind="{ 'aria-hidden': !isOpen }"
		v-click-outside="close"
		:tabindex="isOpen ? 0 : -1"
		@click="toggle"
		class="v--dropdown"
	>
		<v-flex-box>
			<slot />
			<div
				v-if="!hideCaret && !isOpen"
				key="closed"
				class="v--dropdown-caret-icon"
			>
				<v-icon name="caret-down" />
			</div>
			<div
				v-else-if="!hideCaret && isOpen"
				key="open"
				class="v--dropdown-caret-icon"
			>
				<v-icon name="caret-up" />
			</div>
		</v-flex-box>
		<ul
			ref="list"
			:class="[`drop${direction}`]"
			:style="{
				visibility: isOpen ? 'visible' : 'hidden',
				right: offsetX
			}"
			class="v--dropdown-item-list"
		>
			<slot name="items" />
		</ul>
	</component>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";

@Component<VDropdown>({
	components: { VFlexBox, VIcon },
	mounted(): void {
		this.$nextTick(() => this.calculateDirection());
		window.addEventListener("resize", this.calculateDirectionIfOpen);
		window.addEventListener("scroll", this.calculateDirectionIfOpen);
	},
	destroyed(): void {
		window.removeEventListener("resize", this.calculateDirectionIfOpen);
		window.removeEventListener("scroll", this.calculateDirectionIfOpen);
	}
})
export default class VDropdown extends Vue {
	offsetX = "auto";
	@Prop({ type: String, default: "div" })
	private readonly tag!: string;
	@Prop({ type: Boolean, default: false })
	private readonly hideCaret!: boolean;

	isOpen = false;
	direction = "down";
	@Ref()
	private readonly list!: HTMLElement;

	private calculateDirectionIfOpen(): void {
		if (!this.isOpen) return;

		this.$nextTick(() => {
			this.calculateDirection();
		});
	}

	private calculateDirection(): void {
		const windowWidth = window.innerWidth;
		const listWidth = this.list.offsetWidth;
		const positionX = this.$el.getBoundingClientRect().x;

		const offset = positionX + listWidth;
		const result = offset - windowWidth;
		if (result >= 0) this.offsetX = `${result}px`;
		else this.offsetX = "auto";

		const windowHeight = window.innerHeight;
		const listHeight = this.list.offsetHeight;
		const positionY = this.$el.getBoundingClientRect().y;
		this.direction = positionY + listHeight >= windowHeight ? "up" : "down";
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
<style lang="scss" scoped>
.v--dropdown {
	position: relative;
	z-index: 1001;
	display: inline;

	.v--dropdown-with-caret {
		&:not([active]):after {
			content: "";
			display: inline-block;
			vertical-align: middle;
			margin-right: 10px;
			width: 0;
			height: 0;
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			border-top: 5px solid var(--app-text-inverse-color);
		}

		&[active]:after {
			content: "";
			display: inline-block;
			vertical-align: middle;
			margin-right: 10px;
			width: 0;
			height: 0;
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			border-bottom: 5px solid var(--app-text-inverse-color);
		}
	}

	.v--dropdown-caret-icon {
		display: inline-block;
		margin-left: 4px;

		svg {
			width: 8px;
			height: 8px;
		}
	}

	.v--dropdown-item-list {
		position: fixed;
		display: flex;
		flex-direction: column;
		background: var(--kt-background-secondary);
		box-shadow: var(--kt-shadow) 1px 1px 6px 0px;
		border-radius: 4px;
		width: max-content;
		list-style: none;
		z-index: 1001;
		padding: 4px;

		&.dropdown {
			transform: translateY(15%);
		}

		&.dropup {
			bottom: 100%;
			transform: translateY(-20%);
			right: 0;
		}
	}
}
</style>
