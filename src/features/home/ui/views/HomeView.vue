<template>
	<HomeLayout>
		<VContainer>
			<h4>Welcome, {{ $katan.getUser().username }}</h4>
			<HomeUnitsList />
		</VContainer>
	</HomeLayout>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import HomeLayout from "@/features/shared/ui/layouts/DefaultLayout.vue";
import HomeSidebarInfo from "@/features/home/ui/components/HomeSidebarInfo.vue";
import HomeUnitsList from "@/features/home/ui/components/units-list/HomeUnitsList.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import VButton from "@/features/shared/ui/components/design-system/button/VButton.vue";
import VBody1 from "@/features/shared/ui/components/design-system/typography/VBody1.vue";

@Component({
	components: {
		VBody1,
		VButton,
		VContainer,
		HomeSidebarInfo,
		HomeLayout,
		HomeUnitsList
	}
})
export default class HomeView extends Vue {}
</script>
