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
import { isChildNode } from "@/utils/dom";

@Component
export default class VDropdown extends Vue {
	private readonly ELEMENT_CLASS = "v--dropdown";

	@Prop({ type: String, required: true }) private readonly tag!: string;

	isOpen = false;
	closeListener!: any;

	toggle(e: MouseEvent): void {
		if (e.target && isChildNode(this.$el, e.target as Node))
			this.isOpen = !this.isOpen;
	}

	mounted() {
		this.closeListener = document.addEventListener(
			"click",
			(e: MouseEvent) => {
				if (e.target && !isChildNode(this.$el, e.target as Node))
					this.isOpen = false;
			}
		);
	}

	destroyed() {
		document.removeEventListener("click", this.closeListener);
	}
}
</script>
