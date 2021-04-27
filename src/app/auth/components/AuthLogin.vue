<template>
	<div>
		<h4 class="auth-title" v-text="$t('views.login.title')" />
		<p v-if="error" class="error v--text-error">
			{{ $t(`errors.${error}`) }}
		</p>
		<v-form @submit.prevent="login">
			<v-input-group>
				<v-form-label>
					{{ $t("views.login.fields.username") }}
					<v-input
						v-model="credentials.username"
						aria-required="true"
						autocomplete="username"
						maxlength="32"
						required
						spellcheck="false"
						type="text"
					/>
				</v-form-label>
			</v-input-group>
			<v-input-group>
				<v-form-label>
					{{ $t("views.login.fields.password") }}
					<v-input
						v-model="credentials.password"
						autocomplete="current-password"
						maxlength="32"
						spellcheck="false"
						type="password"
					/>
				</v-form-label>
			</v-input-group>
			<v-flex-box class="v--m-top-4 v--flex-justify-end v--flex-column">
				<v-button
					:disabled="lock"
					:full-width="true"
					:primary="true"
					type="submit"
				>
					<span v-if="!lock">{{
							$t("views.login.fields.confirm")
						}}</span>
					<Loading v-else />
				</v-button>
			</v-flex-box>
		</v-form>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AxiosError } from "axios";
import { AuthStore } from "@/app/auth/auth.store";
import VInputIcon from "@/app/shared/components/ui/form/VInputIcon.vue";
import Loading from "@/app/shared/components/Loading.vue";
import VLabel from "@/app/shared/components/ui/form/VLabel.vue";
import VInputGroup from "@/app/shared/components/ui/form/VInputGroup.vue";
import VInput from "@/app/shared/components/ui/form/VInput.vue";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import VForm from "@/app/shared/components/ui/form/VForm.vue";
import VButton from "@/app/shared/components/ui/button/VButton.vue";
import AuthLayout from "@/app/auth/layouts/AuthLayout.vue";
import { inject } from "inversify-props";
import { ConfigService } from "@/app/shared/services/config";
import VFormLabel from "@/app/shared/components/ui/form/VFormLabel.vue";

@Component({
	components: {
		VFormLabel,
		AuthLayout,
		Loading,
		VInputIcon,
		VIcon,
		VFlexBox,
		VInput,
		VLabel,
		VInputGroup,
		VForm,
		VButton
	}
})
export default class AuthLogin extends Vue {
	credentials = {
		username: "",
		password: ""
	};
	lock = false;
	error: string | null = null;
	@inject() private readonly authStore!: AuthStore;
	@inject() private readonly configService!: ConfigService;

	private login(): void {
		this.withLock(() => {
			this.error = null;
			return this.authStore
				.login({
					username: this.credentials.username,
					password: this.credentials.password
				})
				.then(async (token: string) => this.loginCompleted(token))
				.catch((err: AxiosError) => this.loginFailed(err));
		});
	}

	private withLock(fn: () => Promise<unknown>) {
		if (this.lock) return;

		this.lock = true;
		fn().finally(() => {
			this.lock = false;
		});
	}

	private async loginCompleted(token: string): Promise<void> {
		await this.authStore.verify({ token });
		await this.$router.replace({ name: "home" });
	}

	private loginFailed(error: AxiosError): void {
		let code =
			error.response?.data?.code || error.response?.status || error?.code;

		if (!code) {
			const raw = error.toString();
			code = raw.substring(raw?.indexOf(" ") + 1, raw.length);
		}

		this.error = code || "Network Error";
	}
}
</script>
