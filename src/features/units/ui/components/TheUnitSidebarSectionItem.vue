<template>
	<li :class="$style.root">
		<router-link :to="href"><slot /></router-link>
	</li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { RouteLocationRaw } from "vue-router";

@Component
export default class TheUnitSidebarSectionItem extends Vue {
	@Prop({ type: Object, required: true })
	private readonly href!: RouteLocationRaw;
}
</script>

<style lang="scss" module>
.root {
	&:not(:last-child) {
		margin-bottom: 0.4rem;
	}

	a {
		text-decoration: none;
		border-radius: 8px;
		padding: 0.8rem 1.6rem 0.8rem 1.2rem;
		margin: 0 0.4rem;
		display: block;
		font-weight: 600;
		font-size: 14px;

		&:hover {
			background-color: var(--kt-background-surface-high);
		}
	}
}
</style>
<style lang="scss" scoped>
.router-link-exact-active {
	background-color: var(--kt-background-surface-high);
}
</style>
