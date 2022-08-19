<template>
	<InstanceConsole v-if="!fullscreen" @fullscreen="toggleFullscreen" />
	<InstanceConsoleFullscreen v-else @fullscreen="toggleFullscreen" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import InstanceConsole from "@/features/units/ui/components/instances/console/InstanceConsole.vue";
import InstanceConsoleFullscreen from "@/features/units/ui/components/instances/console/InstanceConsoleFullscreen.vue";

@Component({
	components: { InstanceConsoleFullscreen, InstanceConsole }
})
export default class InstanceConsoleView extends Vue {
	fullscreen = true;

	toggleFullscreen(): void {
		this.fullscreen = !this.fullscreen;
	}
}
</script>

<style lang="scss" module></style>
