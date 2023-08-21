<template>
	<div :class="$style.root">
		<TheSidebar />
		<div :class="$style.body">
			<TheHeader />
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import TheSidebar from "@/features/platform/ui/components/TheSidebar.vue";
import TheHeader from "@/features/platform/ui/components/TheHeader.vue";

@Component({
	components: { TheHeader, TheSidebar }
})
export default class RootLayout extends Vue {}
</script>
<style lang="scss" module>
.root {
	display: flex;
	height: 100%;
}

.body {
	display: flex;
	flex-grow: 1;
	flex-direction: column;
}
</style>
