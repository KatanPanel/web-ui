<template>
	<aside :class="$style.root" role="complementary">
		<div :class="$style.logo">
			<router-link to="/">
				<TheLogo :black="true" />
			</router-link>
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
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import TheLogo from "@/features/platform/ui/components/TheLogo.vue";
import VIcon from "@/features/platform/ui/components/icon/VIcon.vue";
import { RouteLocationRaw } from "vue-router";
import { ABOUT_ROUTE } from "@/features/home/home.routes";
import { BLUEPRINTS_ROUTES } from "@/features/blueprints/blueprints.routes";
import { ACCOUNT_ROUTE } from "@/features/account/accounts.routes";
import Avatar from "@/features/platform/ui/components/Avatar.vue";
import { USERS_ROUTE } from "@/features/users/users.routes";

@Component({
	components: { TheLogo, Avatar, VIcon }
})
export default class TheSidebar extends Vue {
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
<style lang="scss" module></style>
<style lang="scss" module>
.root {
	padding: 1.6rem 0;
	display: flex;
	flex-direction: column;
	background-color: var(--kt-background-surface);
	border-right: 1px solid var(--kt-border-low);
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
			color: var(--kt-content-neutral-high);

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
