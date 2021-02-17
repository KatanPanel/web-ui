<template>
	<component
		:is="tag"
		@click="toggle"
		:class="{ 'v--dropdown-active': isOpen }"
		class="v--dropdown"
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
import { isChildNode } from "@/common/utils/dom";

@Component<VDropdown>({
	mounted(): void {
		this.closeListener = document.addEventListener(
			"click",
			(e: MouseEvent) => {
				if (e.target && !isChildNode(this.$el, e.target as Node))
					this.isOpen = false;
			}
		);
	},
	destroyed(): void {
		document.removeEventListener("click", this.closeListener);
	},
})
export default class VDropdown extends Vue {
	@Prop({ type: String, required: true, default: "div" })
	private readonly tag!: string;
	@Prop({ type: Boolean, default: true }) private readonly closed!: boolean;

	private isOpen = !this.closed;
	closeListener!: any;

	private toggle(e: MouseEvent): void {
		if (e.target && isChildNode(this.$el, e.target as Node))
			this.isOpen = !this.isOpen;
	}
}
</script>
