<template>
	<VCard :hoverable="true" :class="$style.root">
		<router-link :to="getTargetUnitLocation" :class="$style.link">
			<Avatar :class="$style.icon" :src="null" label="Server icon" />
			<div :class="$style.info">
				<h6>{{ name }}</h6>
			</div>
		</router-link>
	</VCard>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { RouteLocationRaw } from "vue-router";
import { UNIT_ROUTE } from "@/features/units/routing/units.routes";
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";
import Avatar from "@/features/shared/ui/components/Avatar.vue";

@Component({
	components: { VCard, Avatar }
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
.root:not(:last-child) {
	margin-bottom: 0.8rem;
}

.link {
	text-decoration: none;
	display: flex;
	flex-direction: row;
}

.icon {
	width: auto;
	margin-right: 1.2rem;
}

.info {
	flex-grow: 1;
	align-self: center;
}
</style>
