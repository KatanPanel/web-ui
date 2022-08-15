<template>
	<h4>Welcome, {{ $katan.getUser().username }}</h4>
	<HomeUnitsList />
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import HomeUnitsList from "@/features/home/ui/components/HomeUnitsList.vue";

@Component({
	components: {
		HomeUnitsList
	}
})
export default class HomeView extends Vue {}
</script>
