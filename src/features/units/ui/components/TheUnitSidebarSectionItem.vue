<template>
	<li v-if="href" :class="$style.root">
		<router-link :to="href" :class="$style.link" class="link">
			<VIcon :name="icon" :class="$style.icon" />
			<span :class="$style.text" class="text">
				<slot />
			</span>
		</router-link>
	</li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { RouteLocationRaw } from "vue-router";
import VIcon from "@/features/shared/ui/components/design-system/icon/VIcon.vue";

@Component({
	components: { VIcon }
})
export default class TheUnitSidebarSectionItem extends Vue {
	@Prop({ type: Object, required: true })
	private readonly href!: RouteLocationRaw | undefined;

	@Prop({ type: String, required: true })
	private readonly icon!: string;
}
</script>

<style lang="scss" module>
.root {
	&:not(:last-child) {
		margin-bottom: 0.4rem;
	}
}

.link {
	text-decoration: none;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-weight: 600;
	font-size: 14px;
	border-left: 2px solid transparent;
	padding: 0.8rem 1.6rem;
	color: var(--kt-content-neutral-low);
}

.icon {
	width: 24px;
	height: 24px;
	margin-right: 1.2rem;
	flex-shrink: 0;
}

.text {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	align-self: center;
	top: 2px;
	position: relative;
	font-weight: 600;
	font-family: var(--kt-headline-font);
}
</style>
<style lang="scss" scoped>
.link {
	&:not(.router-link-exact-active):hover {
		background-color: var(--kt-background-surface-high);
		color: var(--kt-content-neutral);
	}

	&.router-link-exact-active {
		color: var(--kt-content-primary);
		border-left: 2px solid var(--kt-content-primary);
		background-color: var(--kt-content-primary-overlay);

		.text {
			color: initial !important;
			font-weight: 700;
		}
	}
}
</style>
