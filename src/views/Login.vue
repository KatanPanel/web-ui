<template>
	<v-container
		class="v--flex v--flex-justify-center v--flex-align-center v--full-height"
	>
		<transition name="v--transition-slow-fade" mode="out-in">
			<div
				class="wallpaper"
				:style="{
					'background-image': `url(/img/games/wallpapers/${currentWallpaperIndex}.jpg)`
				}"
			/>
		</transition>
		<v-flex-box class="login-box">
			<div
				class="login-left"
				:style="{
					'background-image': `url(/img/games/wallpapers/${currentWallpaperIndex}.jpg)`
				}"
			>
				<div class="overlay" />
				<div class="content">
					<a href="/"
						><img
							src="/img/katan-icon-white.png"
							alt="Katan logo"
							class="logo"
					></a>
				</div>
			</div>
			<div class="login-right v--flex-child">
				<div class="header">
					<h2>
						<b>{{ $t("modules.login.title") }}</b>
					</h2>
					<p>{{ $t("modules.login.credentials-needed") }}</p>
				</div>
				<p class="error v--text-error" v-if="error">
					{{ $t(`errors.${error}`) }}
				</p>
				<v-form @submit.native.prevent="performLogin">
					<v-input-group class="v--flex v--flex-row">
						<v-input-icon>
							<v-icon name="user" />
						</v-input-icon>
						<div class="v--flex-child">
							<v-label>{{
								$t("modules.login.fields.username")
							}}</v-label>
							<v-input
								type="text"
								minlength="2"
								maxlength="32"
								required
								v-model="username"
							/>
						</div>
					</v-input-group>
					<v-input-group class="v--flex v--flex-row">
						<v-input-icon>
							<v-icon name="password" />
						</v-input-icon>
						<div class="v--flex-child">
							<v-label>{{
								$t("modules.login.fields.password")
							}}</v-label>
							<v-input
								type="password"
								maxlength="32"
								value=""
								v-model="password"
							/>
						</div>
					</v-input-group>
					<v-flex-box class="v--flex-align-center v--m-top-5 submit">
						<a href="#" class="forgot-password">{{
							$t("modules.login.forgot-password")
						}}</a>
						<div class="v--flex-child">
							<v-button type="submit" :disabled="isLocked">
								<span v-if="!isLocked">{{
									$t("modules.login.fields.confirm")
								}}</span>
								<loading :size="'20px'" v-else />
							</v-button>
						</div>
					</v-flex-box>
				</v-form>
			</div>
		</v-flex-box>
	</v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VBox from "@/components/ui/box/VBox.vue";
import VContainer from "@/components/ui/layout/VContainer.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VBoxHeader from "@/components/ui/box/VBoxHeader.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VButton from "@/components/ui/button/VButton.vue";
import VForm from "@/components/ui/form/VForm.vue";
import VInputGroup from "@/components/ui/form/VInputGroup.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VInput from "@/components/ui/form/VInput.vue";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import { MetaInfo } from "vue-meta";
import { AUTH_TOKEN_KEY } from "@/store/auth";
import { AUTH_MODULE } from "@/store";
import { AUTH_LOGIN, AUTH_VERIFY } from "@/store/auth/actions";
import { AxiosError } from "axios";
import { HOME_ROUTE } from "@/router";
import Loading from "@/components/Loading.vue";
import { mixins } from "vue-class-component";
import { AppMixin } from "@/mixins/app";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VInputIcon from "@/components/ui/form/VInputIcon.vue";

const MAX_WALLPAPERS = 5;

@Component<Login>({
	components: {
		VInputIcon,
		VIcon,
		Loading,
		VFlexBox,
		VInput,
		VLabel,
		VInputGroup,
		VForm,
		VButton,
		VBoxBody,
		VBoxHeader,
		VCol,
		VRow,
		VContainer,
		VBox,
	},
	metaInfo(): MetaInfo {
		return {
			title: (this as Vue).$i18n.t("pages-title.login")! as string,
		};
	},
})
export default class Login extends mixins<AppMixin>(AppMixin) {
	private username = "";
	private password = "";
	private isLocked = false;
	private error: string | null = null;
	private currentWallpaperIndex!: number;

	beforeCreate(): void {
		this.currentWallpaperIndex = Math.floor(Math.random() * MAX_WALLPAPERS);
	}

	private performLogin(): void {
		if (this.isLocked) return;

		this.isLocked = true;
		this.error = null;
		this.$store
			.dispatch(AUTH_MODULE.concat("/", AUTH_LOGIN), {
				username: this.username,
				password: this.password,
			})
			.then(async (token: string) => {
				// there is no self-validation due to a possible fast
				// invalidation for any reason by the server.
				this.$storage.set(AUTH_TOKEN_KEY, token);

				await this.$store.dispatch(
					AUTH_MODULE.concat("/", AUTH_VERIFY),
					{
						token: token,
					}
				);
				this.$router.redirect(HOME_ROUTE);
			})
			.catch((err: AxiosError) => {
				const data = err.response?.data;
				if (this.$isDevelopmentMode) console.log(err);

				this.error =
					data?.code || err.response?.status || err.code || 0;
			})
			.then(() => (this.isLocked = false));
	}
}
</script>
<style lang="scss" scoped>
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
	z-index: -1;
}
</style>
<style lang="scss">
.login-box {
	background-color: var(--app-foreground);
	min-height: 25%;
	min-width: 75%;
	align-items: normal;
	box-shadow: rgba(0, 0, 0, 0.12) 0 0 10px 5px;

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
			background-color: rgba(0, 0, 0, 0.54);
			z-index: 1;
		}

		.logo {
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.content {
			background-color: rgba(0, 0, 0, 0.2);
			z-index: 2;
			height: 100%;
		}
	}

	.login-right {
		padding: 48px;

		.header {
			align-items: baseline;
			margin-bottom: 24px;
			text-align: center;
			line-height: 1.4;

			h2 {
				color: var(--app-text-color);
				margin-bottom: 0;
			}

			p {
				color: var(--muted-color);
				font-size: 16px;
			}

			.v--navbar {
				min-height: 0;
				height: auto;
			}
		}

		.error {
			font-size: 14px;
			margin-bottom: 6px;
		}

		.submit {
			.forgot-password {
				font-size: 14px;
				color: var(--muted-color);
			}

			.v--button[type="submit"] {
				float: right;
			}
		}
	}
}
</style>
