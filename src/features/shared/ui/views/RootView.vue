<template>
	<component :is="getLayout()">
		<router-view />
	</component>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import RootLayout from "@/features/shared/ui/layouts/RootLayout.vue";

@Component({
	components: {
		RootLayout
	}
})
export default class RootView extends Vue {
	getLayout(): unknown {
		return this.$route.meta.layout ?? RootLayout;
	}
}
</script>
