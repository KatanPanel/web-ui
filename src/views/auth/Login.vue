<template>
	<div>
		<h2 class="v--text-align-center v--m-bottom-0">
			<b>{{ $t("views.login.title") }}</b>
		</h2>
		<p class="v--text-align-center v--text-muted">
			{{ $t("views.login.please-identify") }}
		</p>
		<p class="error v--text-error" v-if="error">
			{{ $t(`errors.${error}`) }}
		</p>
		<v-form class="v--m-top-4" @submit.native.prevent="performLogin">
			<v-input-group>
				<v-label>{{ $t("views.login.fields.username") }}</v-label>
				<v-input
					v-model="username"
					:label="'username'"
					:required="true"
					type="text"
					autocomplete="username"
					maxlength="32"
					minlength="2"
				/>
			</v-input-group>
			<v-input-group class="v--m-top-1">
				<v-label>{{ $t("views.login.fields.password") }}</v-label>
				<v-input
					v-model="password"
					:label="'password'"
					type="password"
					autocomplete="current-password"
					maxlength="32"
				/>
			</v-input-group>
			<v-flex-box class="v--m-top-4 v--flex-justify-end v--flex-column">
				<v-button
					:disabled="isLocked"
					:full-width="true"
					:primary="true"
					type="submit"
				>
					{{ $t("views.login.fields.confirm") }}
				</v-button>
				<v-button
					v-if="isLoggedIn"
					:disabled="isLocked"
					:full-width="true"
					:outlined="true"
					:primary="true"
					class="v--m-top-1"
					type="button"
					@click.native="continueAs"
				>
					{{
						$t("views.login.fields.confirm-logged-in", {
							username: getAccountUsername
						})
					}}
				</v-button>
			</v-flex-box>
		</v-form>
		<div class="version-info">
			{{ $config.toVersionInfoString() }}
		</div>
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
import { AUTH_MODULE } from "@/store";
import { AUTH_LOGIN, AUTH_VERIFY } from "@/store/modules/auth/actions";
import { AxiosError } from "axios";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VInputIcon from "@/components/ui/form/VInputIcon.vue";
import { generateMetaInfo } from "@/utils/component";
import { AUTH_LOG_TAG } from "@/services/logging";
import { dispatch, get } from "@/utils/vuex";
import { MetaInfo } from "vue-meta";
import { GET_ACCOUNT, IS_LOGGED_IN } from "@/store/modules/auth/getters";
import { AUTH_TOKEN_KEY } from "@/api/auth";

@Component<Login>({
	components: {
		VInputIcon,
		VIcon,
		VFlexBox,
		VInput,
		VLabel,
		VInputGroup,
		VForm,
		VButton
	},
	metaInfo(): MetaInfo {
		return generateMetaInfo("login");
	}
})
export default class Login extends Vue {
	private username = "";
	private password = "";
	private isLocked = false;
	private error: string | null = null;

	get getAccountUsername(): string {
		return get(AUTH_MODULE, GET_ACCOUNT).username;
	}

	get isLoggedIn(): boolean {
		return get(AUTH_MODULE, IS_LOGGED_IN);
	}

	private performLogin(): void {
		if (this.isLocked) return;

		this.isLocked = true;
		this.error = null;

		dispatch(AUTH_MODULE, AUTH_LOGIN, {
			username: this.username,
			password: this.password
		})
			.then(async (token: string) => {
				this.$storage.set(AUTH_TOKEN_KEY, token);

				await dispatch(AUTH_MODULE, AUTH_VERIFY, { token });
				await this.$router.replace({ name: "home" });
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
					this.$log.error({
						tag: AUTH_LOG_TAG,
						message: `Authentication error: ${code}`,
						args: [err]
					});
				}

				this.error = code;
			})
			.finally(() => (this.isLocked = false));
	}

	private continueAs() {
		if (this.isLocked) return;

		this.isLocked = true;
		this.$router.replace({ name: "home" }).finally(() => {
			this.isLocked = false;
		});
	}
}
</script>
<style lang="scss" scoped>
.version-info {
	position: fixed;
	left: 50%;
	transform: translateX(-50%);
	bottom: 1rem;
	text-align: center;
	width: 100%;
	opacity: 0.38;
	font-size: 12px;
	user-select: none;
}
</style>
