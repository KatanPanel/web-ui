<template>
	<div :active="isOpen" class="v--dropdown" @click="toggle">
		<slot />
		<div v-show="isOpen" class="v--dropdown-item-list">
			<slot name="items" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class VDropdown extends Vue {
	isOpen = false;

	toggle(e: MouseEvent): void {
		e.stopPropagation();
		this.isOpen = !this.isOpen;
	}
}
</script>
