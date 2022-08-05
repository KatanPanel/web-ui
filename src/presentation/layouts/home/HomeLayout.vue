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
import TheSidebar from "@/presentation/components/TheSidebar.vue";
import TheHeader from "@/presentation/components/TheHeader.vue";

@Component({
	components: { TheHeader, TheSidebar }
})
export default class HomeLayout extends Vue {
}
</script>
<style lang="scss" module>
.root {
	display: flex;
	height: 100%;
	background-color: var(--kt-background-surface);
}

.body {
	flex-grow: 1;
}
</style>
