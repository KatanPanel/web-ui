<template>
	<VContainer>
		<h4>Welcome</h4>
		<HomeUnitsList />
	</VContainer>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import HomeUnitsList from "@/features/home/ui/components/HomeUnitsList.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";

@Component({
	components: {
		VContainer,
		HomeUnitsList
	}
})
export default class HomeView extends Vue {}
</script>
