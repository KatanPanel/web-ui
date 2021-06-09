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
	<section id="auth-continue">
		<h4 class="title" v-text="$t('views.login.continue.title')" />
		<div
			class="already-logged-box"
			tabindex="0"
			@click="continueAs"
			@keyup.enter="continueAs"
		>
			<v-flex-box :align-center="true">
				<v-flex-element :grow="1">
					<v-flex-box :align-center="true">
						<Avatar
							:alt="`${user.username} avatar`"
							:src="user.avatar"
						/>
						<div class="account-info">
							<div class="username">
								{{ user.displayName || user.username }}
							</div>
							<small class="info">
								{{
									$t("views.login.continue.last-login", {
										time: i18nService.formatDate(
											user.lastLogin,
											"PPPP"
										)
									})
								}}
							</small>
						</div>
					</v-flex-box>
				</v-flex-element>
			</v-flex-box>
		</div>
		<hr />
		<small
			class="disable-settings"
			v-text="$t('views.login.continue.disable-settings-info')"
		/>
	</section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VButton from "@/app/shared/components/ui/button/VButton.vue";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";
import VFlexElement from "@/app/shared/components/ui/layout/VFlexElement.vue";
import Avatar from "@/app/shared/components/Avatar.vue";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import { UserModel } from "@/app/user/models/user.model";
import { USER_INJECTION_KEY } from "@/app/user/user.module";
import { inject } from "inversify-props";
import { I18nService } from "@/app/shared/services/i18n.service";
import AuthLayout from "@/app/auth/layouts/AuthLayout.vue";

@Component({
	components: { AuthLayout, VIcon, Avatar, VFlexElement, VFlexBox, VButton }
})
export default class AuthContinue extends Vue {
	@inject(USER_INJECTION_KEY)
	private readonly user!: UserModel;

	@inject()
	private readonly i18nService!: I18nService;

	continueAs() {
		this.$router.push({ name: "home" });
	}
}
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/abstracts/variables";

.already-logged-box {
	padding: 8px;
	margin-top: 12px;
	margin-bottom: 12px;
	border-radius: 4px;
	border: 1px solid var(--kt-border-color);
	background-color: var(--kt-background-secondary);

	&:hover,
	&:focus {
		border-color: var(--kt-border-accent);
		cursor: pointer;
	}

	.avatar {
		width: 48px;
		height: 48px;
	}

	.account-info {
		margin-left: 18px;
		padding: 4px 0;
		flex: 1;

		.username {
			font-size: 16px;
			font-weight: 600;
		}

		.info {
			color: var(--kt-muted-color);
		}
	}
}

.disable-settings {
	display: block;
	color: var(--kt-muted-darker-color);
	margin-bottom: 12px;
	line-height: 1.4;
	text-align: justify;
	cursor: default;
}

.title {
	font-weight: 300;
	margin-bottom: 24px;
}
</style>
