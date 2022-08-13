<template>
	<aside class="root">
		<div class="logo">
			<TheLogo :black="true" />
		</div>
		<div class="items">
			<ul>
				<li>
					<a href="#">
						<VIcon name="HelpCircleOutline" />
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
import TheLogo from "@/presentation/components/TheLogo.vue";
import VIcon from "@/presentation/components/design-system/icon/VIcon.vue";
import configService from "@/data/services/config.service";

@Component({
	components: { TheLogo, VIcon }
})
export default class TheSidebar extends Vue {
	private readonly appWebsite = configService.appWebsite;
}
</script>
<style lang="scss" scoped>
.root {
	background-color: var(--kt-background-surface);
	border-right: 1px solid var(--kt-border-low);
	padding: 24px 0;
	display: flex;
	flex-direction: column;
	align-items: stretch;
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

	&:last-child {
		align-items: flex-end;
	}

	ul li {
		display: flex;
		justify-content: center;

		a {
			color: var(--kt-content-neutral-high);

			&:hover {
				color: var(--kt-content-primary-overlay);
			}
		}
	}

	:deep(svg) {
		width: 32px;
		height: 32px;
	}
}
</style>
