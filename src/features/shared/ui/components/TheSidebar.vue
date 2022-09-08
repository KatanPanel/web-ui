<template>
	<aside :class="$style.root" role="complementary">
		<div :class="$style.logo">
			<router-link to="/"><TheLogo :black="true" /></router-link>
		</div>
		<div :class="$style.items">
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
					<router-link :to="linkToBlueprints()">
						<VIcon name="ScriptTextOutline" />
					</router-link>
				</li>
				<li>
					<router-link :to="linkToUsers()">
						<VIcon name="AccountMultipleOutline" />
					</router-link>
				</li>
			</ul>
		</div>
		<div :class="$style.items">
			<ul>
				<li>
					<a :href="appWebsite" target="_blank">
						<VIcon name="HelpCircleOutline" />
					</a>
				</li>
				<li>
					<router-link :to="linkToAccount()" :class="$style.account">
						<Avatar
							:class="$style.accountAvatar"
							:src="undefined"
							label="Account avatar"
						/>
					</router-link>
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
import { BLUEPRINTS_ROUTES } from "@/features/blueprints/routing/blueprints.routes";
import { ACCOUNT_ROUTE } from "@/features/account/routing/accounts.routes";
import Avatar from "@/features/shared/ui/components/Avatar.vue";
import { USERS_ROUTE } from "@/features/users/routing/users.routes";

@Component({
	components: { TheLogo, Avatar, VIcon }
})
export default class TheSidebar extends Vue {
	private readonly appWebsite = configService.appWebsite;

	linkToAbout(): RouteLocationRaw {
		return { name: ABOUT_ROUTE };
	}

	linkToBlueprints(): RouteLocationRaw {
		return { name: BLUEPRINTS_ROUTES };
	}

	linkToAccount(): RouteLocationRaw {
		return { name: ACCOUNT_ROUTE };
	}

	linkToUsers(): RouteLocationRaw {
		return { name: USERS_ROUTE };
	}
}
</script>
<style lang="scss" module>
.root {
	//border-right: 1px solid var(--kt-border-low);
	padding: 1.6rem 0;
	display: flex;
	flex-direction: column;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
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

.account {
}

.accountAvatar {
	max-height: 24px;
}
</style>
