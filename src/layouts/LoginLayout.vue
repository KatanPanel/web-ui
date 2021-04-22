<template>
	<main class="v--layout-login">
		<v-container
			class="v--flex v--flex-justify-center v--flex-align-center v--full-height"
		>
			<transition mode="out-in" name="v--transition-slow-fade">
				<div
					:style="{
						'background-image': `url(${currentWallpaper})`
					}"
					class="wallpaper"
				/>
			</transition>
			<v-flex-box class="login-box">
				<div
					:style="{
						'background-image': `url(${currentWallpaper})`
					}"
					class="login-left"
				>
					<div class="overlay" />
					<div class="content">
						<TheLogo :white="true" />
					</div>
				</div>
				<div class="login-right">
					<slot />
				</div>
			</v-flex-box>
		</v-container>
	</main>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VContainer from "@/components/ui/layout/VContainer.vue";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import TheLogo from "@/components/TheLogo.vue";

@Component<LoginLayout>({
	components: { TheLogo, VFlexBox, VContainer },
	beforeCreate(): void {
		// TODO: use server static content
		this.currentWallpaperIndex = Math.floor(Math.random() * 6);
	}
})
export default class LoginLayout extends Vue {
	private currentWallpaperIndex!: number;

	private get currentWallpaper(): string {
		return `/img/games/wallpapers/${this.currentWallpaperIndex}.jpg`;
	}
}
</script>
<style lang="scss" scoped>
@import "../assets/styles/abstracts/variables";

.v--layout-login {
	height: 100%;

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
	}

	.login-box {
		background-color: var(--kt-background);
		min-width: 65%;
		align-items: normal;
		box-shadow: rgba(0, 0, 0, 0.12) 0 0 10px 5px;
		z-index: 1;

		.login-left {
			position: relative;
			background-size: cover;
			background-attachment: scroll;
			background-position: center;
			width: 40%;

			.overflow {
				content: "";
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				z-index: 1;
			}

			.logo {
				position: relative;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}

			.content {
				box-shadow: inset rgba(0, 0, 0, 0.24) 0 0 100px 50px;
				z-index: 2;
				height: 100%;
			}
		}

		@media (max-width: map-get($breakpoints, "medium")) {
			.login-left {
				display: none;
			}
		}

		.login-right {
			padding: 36px;
			position: relative;
			flex: 1;

			.header {
				align-items: baseline;
				margin-bottom: 18px;

				h2 {
					color: var(--kt-text-color);
					margin-bottom: 0;
				}

				p {
					color: var(--kt-muted-color);
					font-size: 16px;
				}
			}

			.body {
				margin-bottom: 18px;
			}

			.footer {
				position: absolute;
				bottom: 0;
				width: 100%;
			}

			.error {
				font-size: 14px;
				margin-bottom: 6px;
			}

			.submit {
				.forgot-password {
					font-size: 14px;
					color: var(--kt-muted-color);
				}

				.v--button[type="submit"] {
					float: right;
				}
			}
		}
	}
}
</style>
