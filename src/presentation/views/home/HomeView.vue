<template>
	<HomeLayout>
		<VContainer>
			<h4>Welcome, {{ $katan.getUser().username }}</h4>
			<MenuIcon />
		</VContainer>
	</HomeLayout>
</template>
<script>
import { Component, Vue } from "vue-facing-decorator";
import HomeLayout from "@/presentation/layouts/home/HomeLayout";
import HomeSidebarInfo from "@/presentation/components/home/HomeSidebarInfo";
import VContainer from "@/presentation/components/design-system/grid/VContainer";
import VButton from "@/presentation/components/design-system/button/VButton";
import VBody1 from "@/presentation/components/design-system/typography/VBody1";
import MenuIcon from "vue-material-design-icons/Menu.vue";

@Component({
	components: {
		VBody1,
		VButton,
		VContainer,
		HomeSidebarInfo,
		HomeLayout,
		MenuIcon
	}
})
export default class HomeView extends Vue {}
</script>
