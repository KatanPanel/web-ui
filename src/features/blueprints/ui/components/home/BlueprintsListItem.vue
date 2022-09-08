<template>
	<li :class="$style.root">
		<router-link :to="createLink()">
			<VCard reduced>
				{{ name }}
				<p>{{ blueprintId }}</p>
			</VCard>
		</router-link>
	</li>
</template>

<script lang="ts">
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";
import { Component, Prop, Vue } from "vue-facing-decorator";
import { RouteLocationRaw } from "vue-router";
import { BLUEPRINTS_ROUTES } from "@/features/blueprints/routing/blueprints.routes";

@Component({
	components: { VCard }
})
export default class BlueprintsListItem extends Vue {
	@Prop({ type: String, required: true })
	readonly blueprintId!: string;

	@Prop({ type: String, required: true })
	readonly name!: string;

	createLink(): RouteLocationRaw {
		return { name: BLUEPRINTS_ROUTES };
	}
}
</script>

<style lang="scss" module>
.root {
	list-style: none;
}
</style>
