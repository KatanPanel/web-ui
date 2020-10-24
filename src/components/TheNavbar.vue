<template>
	<v-container>
		<div class="v--navbar">
			<div class="v--navbar-logo">
				<router-link tag="li" :to="{ name: HOME_ROUTE }">
					<img src="/img/katan-logo.png" alt="Katan Logo" >
				</router-link>
			</div>
			<ul class="v--navbar-content">
				<router-link tag="li" :to="{ name: HOME_ROUTE }">
					<a v-t="'navigation.home'" />
				</router-link>
				<li>
					<a
						v-t="'navigation.docs'"
						href="https://github.com/KatanPanel/Katan"
					/>
				</li>
				<li>
					<a
						v-t="'navigation.support'"
						href="https://github.com/KatanPanel/Katan/issues"
					/>
				</li>
				<li>
					<a
						v-t="'navigation.community'"
						href="https://discord.gg/ey8dwsv"
					/>
				</li>
				<li>
					<a
						v-t="'navigation.devs'"
						href="https://github.com/KatanPanel/Katan/wiki"
					/>
				</li>
			</ul>
			<ul class="v--navbar-content">
				<router-link
					v-if="!isLoggedIn"
					:to="{ name: LOGIN_ROUTE }"
					tag="li"
				>
					<a v-t="'navigation.login'" />
				</router-link>
				<router-link v-else :to="{ name: '' }" tag="li">
					<a v-t="'navigation.account'" />
					test
				</router-link>
				<li class="v--navbar-divider">|</li>
				<li class="v--navbar-theme" @click="switchTheme">
					<a href="#" v-if="currentTheme !== 'dark'" key="light-theme"
						>🌞</a
					>
					<a href="#" v-else key="dark-theme">🌛</a>
				</li>
				<li>
					<img
						:src="`/img/flags/${currentLanguage.tag}.png`"
						:alt="`${currentLanguage.name} Flag`"
						class="v--navbar-flag"
					>
				</li>
			</ul>
		</div>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VContainer from "@/components/ui/layout/VContainer.vue";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/router";
import { AUTH_MODULE } from "@/store";
import { IS_AUTHENTICATED } from "@/store/auth/getters";
import { GET_LANGUAGE, GET_THEME } from "@/store/getters";
import { AppLanguage } from "@/store/state";
import { SWITCH_THEME } from "@/store/actions";

@Component({
	components: { VContainer },
})
export default class TheNavbar extends Vue {
	private readonly HOME_ROUTE = HOME_ROUTE;
	private readonly LOGIN_ROUTE = LOGIN_ROUTE;

	get isLoggedIn(): boolean {
		return this.$store.getters[AUTH_MODULE.concat("/", IS_AUTHENTICATED)];
	}

	get currentLanguage(): AppLanguage {
		return this.$store.getters[GET_LANGUAGE];
	}

	get currentTheme(): string {
		return this.$store.getters[GET_THEME];
	}

	private switchTheme(): void {
		this.$store.dispatch(SWITCH_THEME);
	}
}
</script>
<style lang="scss" scoped>
.v--navbar {
	position: absolute;
	top: 8px;
	display: inline-flex;
	flex-wrap: wrap;
	width: 100%;
	z-index: 1001;

	&.v--navbar-vertical {
		left: 0;
		top: 0;

		.v--navbar-content {
			margin-left: 0;

			&:last-child {
				justify-content: initial;
			}
		}
	}

	.v--navbar-logo,
	.v--navbar-logo img {
		position: relative;
		width: 96px;
		height: 96px;
	}

	.v--navbar-content {
		position: relative;
		display: flex;
		flex: 1 0 auto;
		align-items: center;
		list-style-type: none;
		margin-left: 36px;

		&:last-child {
			justify-content: flex-end;
		}

		li {
			position: relative;
			font-size: 16px;
			margin-left: 32px;

			&:hover {
				cursor: pointer;
			}

			&:first-child {
				margin-left: 0;
			}

			a {
				font-weight: 500;
				color: var(--nav-text-color);
				vertical-align: middle;
			}
		}
	}

	.v--navbar-flag {
		width: 40px;
		height: 40px;
		vertical-align: middle;
		margin-right: 8px;
		border-radius: 4px;
	}

	.v--navbar-theme a {
		font-size: 36px;
		margin-right: -12px;
		text-decoration: none;
	}

	.v--navbar-divider {
		color: #fff;
		opacity: 0.18;
	}
}
</style>
