<template>
	<component
		:is="tag"
		@click="toggle"
		:class="{ 'v--dropdown-active': isOpen, [ELEMENT_CLASS]: true }"
	>
		<slot />
		<transition name="v--dropdown-transition" mode="out-in">
			<div class="v--dropdown-item-list" v-if="isOpen">
				<slot name="items" />
			</div>
		</transition>
	</component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VDropdown extends Vue {
	private readonly ELEMENT_CLASS = "v--dropdown";
	@Prop({ type: String, required: true }) private readonly tag!: string;

	isOpen = false;

	toggle(e: MouseEvent): void {
		const target = e.target as HTMLElement;
		if (
			!target ||
			(!target.classList.contains(this.ELEMENT_CLASS) &&
				!target.parentElement!.classList.contains(this.ELEMENT_CLASS))
		)
			return;

		this.isOpen = !this.isOpen;
	}
}
</script>
<style lang="scss">
.v--dropdown {
	&:not(.v--dropdown-active):after {
		content: "";
		display: inline-block;
		vertical-align: middle;
		margin-right: 10px;
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 5px solid #fff;
	}

	&.v--dropdown-active:after {
		content: "";
		display: inline-block;
		vertical-align: middle;
		margin-right: 10px;
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-bottom: 5px solid #fff;
	}

	.v--dropdown-item-list {
		position: absolute;
		display: flex;
		flex-direction: column;
		color: var(--nav-dropdown-text-color);
		background: var(--app-foreground);
		border-radius: 8px;
		box-shadow: rgba(0, 0, 0, 0.12) 4px 4px 4px 0;
		width: max-content;
		transition: all 0.4s ease;

		.v--dropdown-item {
			margin: 0 !important;
			padding: 8px;

			&:hover {
				background-color: rgba(0, 0, 0, 0.06);
			}
		}
	}

	.v--dropdown-transition-enter,
	.v--dropdown-transition-leave-to {
		opacity: 0;
		transform: translateY(10px);
	}
}
</style>
