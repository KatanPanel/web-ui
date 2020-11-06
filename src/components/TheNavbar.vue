<template>
	<header class="v--navbar v--scoped-nav">
		<v-container class="v--flex">
			<v-navbar-content class="v--navbar-logo">
				<li v-router-href="{ name: HOME_ROUTE }">
					<img alt="Katan Logo" src="/img/katan-icon-white.png" />
				</li>
			</v-navbar-content>
			<v-navbar-content>
				<li v-router-href="{ name: HOME_ROUTE }">
					<a v-t="'header.home'" />
				</li>
				<li>
					<a
						v-t="'header.docs'"
						href="https://github.com/KatanPanel/Katan"
					/>
				</li>
				<li>
					<a
						v-t="'header.support'"
						href="https://github.com/KatanPanel/Katan/issues"
					/>
				</li>
				<li>
					<a
						v-t="'header.community'"
						href="https://discord.gg/ey8dwsv"
					/>
				</li>
				<li>
					<a
						v-t="'header.api'"
						href="https://github.com/KatanPanel/Katan/wiki"
					/>
				</li>
			</v-navbar-content>
			<v-navbar-content>
				<li v-router-href="{ name: LOGIN_ROUTE }" v-if="!isLoggedIn">
					<a v-t="'header.login'" />
				</li>
				<router-link v-else :to="{ name: ACCOUNT_ROUTE }" tag="li">
					<a href="#">{{ $t("header.account") }}</a>
				</router-link>
				<li class="v--navbar-divider">|</li>
				<li class="v--navbar-theme" @click="switchTheme">
					<a href="#" v-if="currentTheme !== 'dark'" key="light-theme"
						>🌞</a
					>
					<a href="#" v-else key="dark-theme">🌛</a>
				</li>
				<li>
					<v-dropdown dropdown-id="menu-flags" tag="a">
						<img
							:src="`/img/flags/${currentLanguage.tag}.png`"
							:alt="`${currentLanguage.name} Flag`"
							class="v--navbar-flag"
						/>
						<template v-slot:items>
							<v-dropdown-item
								v-for="language in getSupportedLanguages"
								:key="language.tag"
								@click.native="currentLanguage = language"
							>
								<img
									:src="`/img/flags/${language.tag}.png`"
									:alt="`${language.name} Flag`"
									class="v--navbar-flag"
								/>
								<span>{{ language.name }}</span>
							</v-dropdown-item>
						</template>
					</v-dropdown>
				</li>
			</v-navbar-content>
		</v-container>
	</header>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import VContainer from "@/components/ui/layout/VContainer.vue";
import { HOME_ROUTE, LOGIN_ROUTE, PANEL_ACCOUNT_ROUTE } from "@/router";
import VDropdown from "@/components/ui/dropdown/VDropdown.vue";
import VDropdownItem from "@/components/ui/dropdown/VDropdownItem.vue";
import VNavbarContent from "@/components/ui/navbar/VNavbarContent.vue";
import { mixins } from "vue-class-component";
import { AppMixin } from "@/mixins/app";
import { AuthMixin } from "@/mixins/auth";

@Component({
	components: { VNavbarContent, VDropdownItem, VDropdown, VContainer },
})
export default class TheNavbar extends mixins<AppMixin, AuthMixin>(
	AppMixin,
	AuthMixin
) {
	private readonly HOME_ROUTE = HOME_ROUTE;
	private readonly LOGIN_ROUTE = LOGIN_ROUTE;
	private readonly ACCOUNT_ROUTE = PANEL_ACCOUNT_ROUTE;
}
</script>
