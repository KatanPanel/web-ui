<template>
	<div class="auth-layout">
		<div class="auth-container">
			<div :style="wallpaperStyle" class="wallpaper" />
			<v-flex-box class="auth-box">
				<div :style="wallpaperStyle" class="auth-image">
					<div class="content">
						<TheLogo :white="true" />
					</div>
				</div>
				<div class="auth-content">
					<slot />
					<v-flex-box :justify="'flex-end'">
						<v-dropdown class="auth-language-dropdown">
							<div class="auth-language" tabindex="0">
								{{ i18nService.current.name }}
								<v-icon class="caret-icon" name="caret-down" />
							</div>
							<template #items>
								<v-dropdown-item
									v-for="language in i18nService.supportedLanguages"
									:key="language.tag"
									@click="i18nService.loadLanguage0(language)"
								>
									<span v-text="language.name" />
								</v-dropdown-item>
							</template>
						</v-dropdown>
					</v-flex-box>
				</div>
			</v-flex-box>
		</div>
		<div class="game-name">
			{{ wallpaper.name }}
		</div>
		<div class="version-info">
			{{ configService.toVersionInfoString() }}
		</div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheLogo from "@/app/shared/components/TheLogo.vue";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";
import { inject } from "inversify-props";
import { ConfigService } from "@/app/shared/services/config";
import { I18nService } from "@/app/shared/services/i18n";
import VDropdown from "@/app/shared/components/ui/dropdown/VDropdown.vue";
import VDropdownItem from "@/app/shared/components/ui/dropdown/VDropdownItem.vue";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import VFlexElement from "@/app/shared/components/ui/layout/VFlexElement.vue";

@Component({
	components: {
		VFlexElement,
		VIcon,
		VDropdownItem,
		VDropdown,
		TheLogo,
		VFlexBox
	},
	beforeMount(): void {
		(this as LoginLayout).updateWallpaper();
	}
})
export default class AuthLayout extends Vue {
	wallpaper: any | null = null;
	@inject() private readonly configService!: ConfigService;
	@inject() private readonly i18nService!: I18nService;

	get illustrations(): any[] {
		return require("@/assets/illustrations");
	}

	get wallpaperStyle(): { backgroundImage: string } {
		return {
			backgroundImage: `url(/img/games/illustrations/${this.wallpaper.file})`
		};
	}

	updateWallpaper(): void {
		this.wallpaper = this.illustrations[
			Math.floor(Math.random() * this.illustrations.length)
		];
	}
}
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/abstracts/variables";

.auth-layout {
	height: 100%;

	.version-info {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 1rem;
		text-align: center;
		width: 100%;
		opacity: 0.38;
		font-size: 12px;
		user-select: none;
		color: #fff;
		z-index: 1001;
		font-weight: 600;
	}

	.game-name {
		position: absolute;
		bottom: 0;
		right: 0;
		color: #fff;
		z-index: 1001;
		opacity: 0;
		margin: 1rem;
		font-size: 16px;
		user-select: none;
		font-weight: 600;
		transition: all 0.3s ease;

		&:hover {
			opacity: 0.54;
		}
	}

	.wallpaper {
		position: fixed;
		top: -25px;
		right: -25px;
		left: -25px;
		bottom: -25px;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		overflow: auto;
		box-shadow: inset #000 0 0 250px 50px;
		filter: blur(15px);
		z-index: 1;
		transition: all 0.3s ease;
	}

	.auth-container {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.auth-box {
		align-items: normal;
		box-shadow: rgba(0, 0, 0, 0.12) 0 0 10px 5px;
		z-index: 1;
		min-width: 60%;
		max-width: 95%;

		.auth-image {
			position: relative;
			background-size: cover;
			background-attachment: scroll;
			background-position: center;
			background-repeat: no-repeat;
			width: 40%;
			transition: all 0.3s ease;

			.content {
				box-shadow: inset rgba(0, 0, 0, 1) 0 0 14rem -7rem;
				z-index: 2;
				height: 100%;

				.logo {
					position: relative;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					user-select: none;
					max-width: 50%;
				}
			}
		}

		@media (max-width: map-get($breakpoints, "medium")) {
			.auth-image {
				display: none;
			}
		}

		.auth-content {
			background-color: var(--kt-background);
			padding: 36px 36px 24px;
			position: relative;
			flex: 1;
			display: flex;
			flex-direction: column;

			::v-deep {
				.auth-title {
					margin-bottom: 24px;
					text-align: center;
				}

				.auth-subtitle {
					color: var(--kt-muted-color);
					margin-bottom: 24px;
					cursor: default;
					text-align: center;
				}
			}

			.auth-language-dropdown {
				margin-top: 24px;
			}

			.auth-language {
				font-size: 14px;
				color: var(--kt-muted-darker-color);
				display: inline-flex;
				align-items: center;
				user-select: none;

				&:focus,
				&:hover {
					color: var(--kt-muted-color);
					cursor: pointer;
				}

				.caret-icon {
					width: 8px;
					height: 8px;
					margin-left: 4px;
				}
			}
		}
	}
}
</style>
