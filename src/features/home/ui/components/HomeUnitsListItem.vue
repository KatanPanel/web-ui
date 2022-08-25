<template>
	<li class="root">
		<router-link :to="getTargetUnitLocation">
			<h6>{{ name }}</h6>
			<p>{{ unitId }}</p>
		</router-link>
	</li>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { RouteLocationRaw } from "vue-router";
import { UNIT_ROUTE } from "@/features/units/routing/units.routes";

@Component
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
<style lang="scss" scoped>
.root {
	box-shadow: inset 0 0 0 1.5px var(--kt-border-low);
	border-radius: 8px;

	&:hover {
		box-shadow: inset 0 0 0 1.5px var(--kt-border-medium);
	}

	&:not(:last-child) {
		margin-bottom: 8px;
	}

	a {
		text-decoration: none;
	}
}
</style>
