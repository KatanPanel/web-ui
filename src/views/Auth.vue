<!--
  - Copyright (c) 2020-present Katan
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  - copies of the Software, and to permit persons to whom the Software is
  - furnished to do so, subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  - IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  - FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  - AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  - LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  - OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  - SOFTWARE.
  -->

<template>
	<v-container
		class="v--flex v--flex-justify-center v--flex-align-center v--full-height"
	>
		<transition name="v--transition-slow-fade" mode="out-in">
			<div
				class="wallpaper"
				:style="{
					'background-image': `url(${currentWallpaper})`,
				}"
			/>
		</transition>
		<v-flex-box class="login-box">
			<div
				class="login-left"
				:style="{
					'background-image': `url(${currentWallpaper})`,
				}"
			>
				<div class="overlay" />
				<div class="content">
					<the-logo color="white" />
				</div>
			</div>
			<div class="login-right v--flex-child">
				<Login />
			</div>
		</v-flex-box>
	</v-container>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import VContainer from "@/components/ui/layout/VContainer.vue";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import { MetaInfo } from "vue-meta";
import TheLogo from "@/components/TheLogo.vue";
import Login from "@/components/auth/Login.vue";
import { mixins } from "vue-class-component";
import { AuthMixin } from "@/common/internal/mixins/auth";
import SwitchAccount from "@/components/auth/SwitchAccount.vue";
import OAuth from "@/components/auth/OAuth.vue";
import VTabs from "@/components/ui/tab/VTabs.vue";
import VTab from "@/components/ui/tab/VTab.vue";
import VTabView from "@/components/ui/tab/VTabView.vue";

@Component<Auth>({
	components: {
		VTabView,
		VTab,
		VTabs,
		OAuth,
		SwitchAccount,
		Login,
		TheLogo,
		VFlexBox,
		VContainer,
	},
	metaInfo(): MetaInfo {
		return {
			title: this.$i18n.t("titles.login") as string,
		};
	},
	beforeCreate(): void {
		this.currentWallpaperIndex = Math.floor(Math.random() * 6);
	},
})
export default class Auth extends mixins(AuthMixin) {
	private currentWallpaperIndex!: number;

	private get currentWallpaper(): string {
		return `/img/games/wallpapers/${this.currentWallpaperIndex}.jpg`;
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
	z-index: 1;
}
</style>
<style lang="scss">
.login-box {
	background-color: var(--kt-foreground);
	min-height: 35.4%;
	min-width: 75%;
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

		.v--katan-logo {
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

	.login-right {
		margin: 36px;
		position: relative;

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
</style>
