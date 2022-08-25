<template>
	<VCard :hoverable="true" :class="$style.root">
		<router-link :to="getTargetUnitLocation">
			<h6>{{ name }}</h6>
			<p>{{ unitId }}</p>
		</router-link>
	</VCard>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { RouteLocationRaw } from "vue-router";
import { UNIT_ROUTE } from "@/features/units/routing/units.routes";
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";

@Component({
	components: { VCard }
})
export default class HomeUnitsListItem extends Vue {
	@Prop({ type: String, required: true })
	private readonly unitId!: string;

	@Prop({ type: String, required: true })
	private readonly name!: string;

	get getTargetUnitLocation(): RouteLocationRaw {
		return {
			name: UNIT_ROUTE,
			params: {
				unitId: this.unitId
			}
		};
	}
}
</script>
<style lang="scss" module>
.root {
	&:not(:last-child) {
		margin-bottom: 8px;
	}

	a {
		text-decoration: none;
	}
}
</style>
