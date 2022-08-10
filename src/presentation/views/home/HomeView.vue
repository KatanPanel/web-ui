<template>
	<HomeLayout>
		<h4>Welcome, {{ $katan.getUser().username }}</h4>
	</HomeLayout>
</template>
<script>
import { Component, Vue } from "vue-facing-decorator";
import HomeLayout from "@/presentation/layouts/home/HomeLayout";
import HomeSidebarInfo from "@/presentation/components/home/HomeSidebarInfo";

@Component({
	components: { HomeSidebarInfo, HomeLayout }
})
export default class HomeView extends Vue {}
</script>
