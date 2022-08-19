<template>
	<div :class="$style.root">
		<VButton @click="onFullscreenButtonClick">Fullscreen</VButton>
		<pre>
			<code v-for="i in 10" :key="`line-${i}`">
			Text {{ i }}
		</code>
		</pre>
	</div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-facing-decorator";
import VButton from "@/features/shared/ui/components/design-system/button/VButton.vue";

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
