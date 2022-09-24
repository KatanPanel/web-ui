<template>
	<li :class="$style.root">
		<VCard flat>
			<div :class="$style.header">
				<div :class="$style.iconWrapper">
					<div :class="$style.icon">
						<Avatar label="Blueprint icon" :src="icon" />
					</div>
				</div>
				<div :class="$style.details">
					<h5 :class="$style.name" v-text="name" />
				</div>
			</div>
			<div :class="$style.description" v-text="description" />
		</VCard>
	</li>
</template>

<script lang="ts">
import VCard from "@/design-system/card/VCard.vue";
import { Component, Prop, Vue } from "vue-facing-decorator";
import { RouteLocationRaw } from "vue-router";
import { BLUEPRINTS_ROUTES } from "@/features/blueprints/routing/blueprints.routes";
import Avatar from "@/features/shared/ui/components/Avatar.vue";

@Component({
	components: { VCard, Avatar }
})
export default class BlueprintsListItem extends Vue {
	@Prop({ type: String, required: true })
	readonly blueprintId!: string;

	@Prop({ type: String, required: true })
	readonly name!: string;

	@Prop({ type: String })
	readonly icon!: string;

	@Prop({ type: String, required: true })
	readonly description!: string;

	createLink(): RouteLocationRaw {
		return { name: BLUEPRINTS_ROUTES };
	}
}
</script>

<style lang="scss" module>
.root {
	list-style: none;
	margin-bottom: 0.8rem;
	text-decoration: none;
	border: 2px solid transparent;
	border-radius: 8px;

	&:hover {
		border-color: var(--kt-content-primary);
	}
}

.iconWrapper {
	background-color: var(--kt-content-primary);
	border-radius: 50%;
	position: relative;
	flex-basis: 40px;
}

.icon {
	width: 64px;
	height: 64px;
}

.header {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;
	align-content: stretch;
	position: relative;
	user-select: none;
}

.details {
	flex-grow: 1;
	margin-left: 2.4rem;
}

.name {
	font-weight: 700;
	margin-top: 0.8rem;
}

.description {
	color: var(--kt-content-neutral);
	margin-top: 0.8rem;
}
</style>
