<template>
	<div class="login">
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
			<div class="body">
				<v-input-group class="v--flex v--flex-row">
					<v-input-icon>
						<v-icon name="user" />
					</v-input-icon>
					<div class="v--flex-child">
						<v-label
							>{{ $t("modules.login.fields.username") }}
						</v-label>
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
						<v-label
							>{{ $t("modules.login.fields.password") }}
						</v-label>
						<v-input
							type="password"
							maxlength="32"
							value=""
							v-model="password"
						/>
					</div>
				</v-input-group>
			</div>
			<v-flex-box class="v--flex-align-center submit">
				<a href="#" target="_blank" class="forgot-password"
					>Outros métodos de log-in</a
				>
				<div class="v--flex-child">
					<v-button type="submit" :disabled="isLocked">
						<span v-if="!isLocked" key="config">{{
							$t("modules.login.fields.confirm")
						}}</span>
						<span v-else key="loading"> ... </span>
					</v-button>
				</div>
			</v-flex-box>
		</v-form>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VButton from "@/components/ui/button/VButton.vue";
import VForm from "@/components/ui/form/VForm.vue";
import VInputGroup from "@/components/ui/form/VInputGroup.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VInput from "@/components/ui/form/VInput.vue";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import { AUTH_TOKEN_KEY } from "@/store/auth";
import { AUTH_MODULE } from "@/store";
import { AUTH_LOGIN, AUTH_VERIFY } from "@/store/auth/actions";
import { AxiosError } from "axios";
import { PANEL_ROUTE } from "@/router";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VInputIcon from "@/components/ui/form/VInputIcon.vue";

@Component({
	components: {
		VInputIcon,
		VIcon,
		VFlexBox,
		VInput,
		VLabel,
		VInputGroup,
		VForm,
		VButton,
	},
})
export default class Login extends Vue {
	private username = "";
	private password = "";
	private isLocked = false;
	private error: string | null = null;

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

				this.$router.redirect(PANEL_ROUTE);
			})
			.catch((err: AxiosError) => {
				const data = err.response?.data;
				const code =
					data?.code ||
					err.response?.status ||
					err?.code ||
					(err?.toJSON() as any | never)?.message ||
					"0";
				if (this.$isDevelopmentMode) {
					console.error(err.toJSON());
				}

				this.error = code;
			})
			.then(() => (this.isLocked = false));
	}
}
</script>
