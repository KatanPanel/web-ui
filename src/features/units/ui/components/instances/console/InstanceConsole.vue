<template>
	<div :class="$style.root">
		<VButton @click="onFullscreenButtonClick"> Fullscreen </VButton>
	</div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-facing-decorator";
import VButton from "@/features/platform/ui/components/button/VButton.vue";

@Component({
	components: { VButton }
})
export default class InstanceConsole extends Vue {
	@Emit("fullscreen")
	onFullscreenButtonClick(): void {
		return;
	}
}
</script>

<style lang="scss" module>
.root {
	max-height: 100%;
}
</style>
