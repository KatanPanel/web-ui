<template>
	<div class="root">
		<div class="left_side">
			<TheLogo :black="true" class="logo" />
			<div class="content">
				<slot />
			</div>
			<div class="copyright">
				&copy; 2020 - {{ new Date().getFullYear() }}&nbsp;
				<span>Katan</span>
			</div>
		</div>
		<div class="right_side" />
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import TheLogo from "@/features/shared/ui/components/TheLogo.vue";

@Component({
	components: { TheLogo }
})
export default class AuthLayout extends Vue {}
</script>
<style lang="scss" scoped>
// TODO remove it from here
@import "@/assets/styles/abstracts/_variables";

.root {
	display: flex;
	align-items: center;
	height: 100%;
}

.container {
	display: flex;
	align-items: center;
	height: 100%;
}

.left_side {
	align-items: normal;
	z-index: 1;
	background: var(--kt-background-surface);
	position: relative;
	left: 0;
	height: 100%;
	width: 30%;
	max-width: 30%;
	box-shadow: RGB(0 0 0 / 24%) 4px 0 8px 0;
	padding: 4.8rem 7.2rem;

	@media (max-width: map-get($breakpoints, "medium")) {
		& {
			width: 100%;
			max-width: 100%;
			padding: 24px;
		}
	}

	.logo {
		max-width: 64px;
		position: relative;
		border-radius: 8px;
	}

	.copyright {
		margin: 12px 0;
		opacity: 0.38;
		font-size: 12px;
		user-select: none;
		position: absolute;
		bottom: 0;
	}

	.content {
		margin-top: 96px;
	}
}

.right_side {
	position: relative;
	flex: 1;
	display: flex;
	height: 100%;
	flex-direction: row;
	align-items: flex-end;
	overflow: hidden;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	background-image: url("@/assets/media/illustrations/2601286834.jpg");
	padding: 24px 48px;

	&:hover .game_name,
	&:hover .version_info {
		opacity: 1;
	}

	@media (max-width: map-get($breakpoints, "medium")) {
		& {
			display: none;
		}
	}
}
</style>
