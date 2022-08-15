<template>
	<RootLayout>
		<router-view />
	</RootLayout>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import RootLayout from "@/features/shared/ui/layouts/RootLayout.vue";

@Component({
	components: {
		RootLayout
	}
})
export default class RootView extends Vue {}
</script>
