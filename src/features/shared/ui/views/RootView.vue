<template>
	<RootLayout>
		<VContainer>
			<router-view />
		</VContainer>
	</RootLayout>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import RootLayout from "@/features/shared/ui/layouts/RootLayout.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import VButton from "@/features/shared/ui/components/design-system/button/VButton.vue";
import VBody1 from "@/features/shared/ui/components/design-system/typography/VBody1.vue";

@Component({
	components: {
		VBody1,
		VButton,
		VContainer,
		RootLayout
	}
})
export default class RootView extends Vue {}
</script>
