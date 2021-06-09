<template>
	<div class="auth-layout">
		<div class="auth-container">
			<div class="auth-box">
				<div class="auth-logo">
					<TheLogo :match-theme="true" class="auth-logo" />
				</div>
				<div class="auth-content-body">
					<slot />
				</div>
				<!-- <v-flex-box :justify="'flex-end'"
				class="auth-language-box">
					<v-dropdown class="auth-language-dropdown">
						<div class="auth-language">
							{{ userSettingsPresenter.getSettings.language.name }}
						</div>
						<template #items>
							<v-dropdown-item
								v-for="language in i18nService.getSupportedLanguages"
								:key="language.tag"
								@click="i18nService.loadLanguage0(language)"
							>
								<span v-text="language.name" />
							</v-dropdown-item>
						</template>
					</v-dropdown>
				</v-flex-box> -->
			</div>
			<div :style="{
				backgroundImage: `url(/img/games/illustrations/${wallpaper.file})`
			}" class="auth-right">
				<div class="game-name">
					{{ wallpaper.name }}
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheLogo from "@/app/shared/components/TheLogo.vue";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";
import { inject } from "inversify-props";
import VDropdown from "@/app/shared/components/ui/dropdown/VDropdown.vue";
import VDropdownItem from "@/app/shared/components/ui/dropdown/VDropdownItem.vue";
import { UserSettingsPresenter } from "@/app/user-settings/user-settings.presenter";

@Component<AuthLayout>({
	components: {
		VDropdownItem,
		VDropdown,
		TheLogo,
		VFlexBox
	},
	beforeMount(): void {
		this.updateWallpaper();
	}
})
export default class AuthLayout extends Vue {
	@inject()
	private readonly userSettingsPresenter!: UserSettingsPresenter;

	wallpaper: any | null = null;

	updateWallpaper(): void {
		const illustrations: any[] = require("@/assets/illustrations");
		this.wallpaper =
			illustrations[Math.floor(Math.random() * illustrations.length)];
	}
}
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/abstracts/variables";

.auth-layout {
	height: 100%;

	.auth-container {
		display: flex;
		align-items: center;
		height: 100%;

		.auth-right {
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

			&:hover .game-name,
			&:hover .version-info {
				opacity: 1;
			}

			@media (max-width: map-get($breakpoints, "medium")) {
				& {
					display: none;
				}
			}

			.game-name {
				position: absolute;
				bottom: 0;
				right: 0;
				color: #fff;
				z-index: 1001;
				opacity: 0;
				margin: 12px;
				font-size: 18px;
				user-select: none;
				font-weight: 600;
				transition: opacity 500ms;
			}
		}

		.auth-box {
			align-items: normal;
			z-index: 1;
			background: var(--kt-background-secondary);
			position: relative;
			left: 0;
			height: 100%;
			padding: 72px;
			width: 35%;
			max-width: 35%;

			@media (max-width: map-get($breakpoints, "medium")) {
				& {
					width: 100%;
					max-width: 100%;
					padding: 24px;
				}
			}

			.auth-logo {
				max-width: 50px;
				max-height: 50px;
				position: relative;
				margin-bottom: 144px;
			}

			@media (max-width: map-get($breakpoints, "medium")) {
				.auth-image {
					display: none;
				}
			}

			.auth-content-body {
				margin-bottom: 24px;
			}

			.auth-language-box {
				position: absolute;
				bottom: 0;
				right: 0;
				margin: 24px 48px;
				display: flex;
				font-size: 13px;
				font-weight: 400;

				@media (max-width: map-get($breakpoints, "medium")) {
					& {
						position: relative;
						justify-content: center;
					}
				}

				.auth-language-dropdown {
					&:hover {
						text-decoration: underline;
						cursor: pointer;
						color: var(--kt-muted-color);
					}

					&:focus {
						color: var(--kt-muted-color);
					}

					.auth-language {
						display: inline-flex;
						align-items: center;
						user-select: none;
					}
				}
			}
		}
	}
}
</style>
