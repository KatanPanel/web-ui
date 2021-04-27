<template>
	<div
		@click.stop="toggle"
		tabindex="0"
		v-click-outside="close"
		:active="isOpen"
		class="v--dropdown"
		@keyup.enter.stop="toggle"
	>
		<slot />
		<div class="v--dropdown-item-list-mask">
			<div v-show="isOpen" class="v--dropdown-item-list">
				<slot name="items" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VDropdown extends Vue {
	private isOpen = false;

	public toggle(): void {
		this.isOpen = !this.isOpen;
		this.$emit("toggle", this.isOpen);
	}

	public close(): void {
		if (!this.isOpen) return;

		this.isOpen = false;
		this.$emit("toggle", this.isOpen);
	}
}
</script>
