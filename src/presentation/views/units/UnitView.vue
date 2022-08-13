<template>
	<HomeLayout>
		<VContainer>
			<h4>Unit {{ getUnitId }}</h4>
		</VContainer>
	</HomeLayout>
</template>
<script lang="ts">
import VContainer from "@/presentation/components/design-system/grid/VContainer.vue";
import HomeLayout from "@/presentation/layouts/home/HomeLayout.vue";
import { Component, Vue } from "vue-facing-decorator";

@Component({
	components: {
		VContainer,
		HomeLayout
	}
})
export default class UnitView extends Vue {
	get getUnitId(): string {
		return this.$route.params.unitId as string;
	}
}
</script>
