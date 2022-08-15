<template>
	<aside class="root">
		<div class="logo">
			<router-link to="/"><TheLogo :black="true" /></router-link>
		</div>
		<div class="items">
			<ul>
				<li>
					<router-link :to="linkToAbout()">
						<VIcon name="Information" />
					</router-link>
				</li>
				<li>
					<a href="#">
						<VIcon name="Apps" />
					</a>
				</li>
				<li>
					<a href="#">
						<VIcon name="Plus" />
					</a>
				</li>
			</ul>
		</div>
		<div class="items">
			<ul>
				<li>
					<a :href="appWebsite" target="_blank">
						<VIcon name="HelpCircleOutline" />
					</a>
				</li>
			</ul>
		</div>
	</aside>
</template>
<style lang="scss" module></style>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import TheLogo from "@/features/shared/ui/components/TheLogo.vue";
import VIcon from "@/features/shared/ui/components/design-system/icon/VIcon.vue";
import configService from "@/features/shared/data/config.service";
import { RouteLocationRaw } from "vue-router";
import { ABOUT_ROUTE } from "@/features/home/routing/home.routes";

@Component({
	components: { TheLogo, VIcon }
})
export default class TheSidebar extends Vue {
	private readonly appWebsite = configService.appWebsite;

	linkToAbout(): RouteLocationRaw {
		return { name: ABOUT_ROUTE };
	}
}
</script>
<style lang="scss" scoped>
.root {
	background-color: var(--kt-background-surface);
	border-right: 1px solid var(--kt-border-low);
	padding: 20px 0;
	display: flex;
	flex-direction: column;
}

.logo {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 4px;
	padding: 0 12px;

	img {
		width: 48px;
		height: 48px;
		border-radius: 8px;
	}
}

.items {
	flex-grow: 1;
	margin-top: 24px;
	display: flex;
	justify-content: center;
	align-items: baseline;

	&:last-child {
		align-items: flex-end;
	}

	ul li {
		display: flex;
		justify-content: center;

		&:not(:last-child) {
			margin-bottom: 16px;
		}

		a {
			padding: 6px;
			border-radius: 8px;

			&:hover {
				background-color: var(--kt-content-neutral-overlay);
			}

			:deep(svg) {
				width: 24px;
				height: 24px;
			}
		}
	}
}
</style>
