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
import HomeLayout from "@/presentation/DefaultLayout.vue";
import HomeSidebarInfo from "@/presentation/components/home/HomeSidebarInfo.vue";
import HomeUnitsList from "@/presentation/components/home/units-list/HomeUnitsList.vue";
import VContainer from "@/presentation/components/design-system/grid/VContainer.vue";
import VButton from "@/presentation/components/design-system/button/VButton.vue";
import VBody1 from "@/presentation/components/design-system/typography/VBody1.vue";

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
