<template>
	<v-container class="v--flex v--flex-justify-center v--full-height">
		<v-box class="v--box-fit">
			<v-box-header>
				<h4>Sign In</h4>
				<p class="v-text--error" v-if="error" v-text="error" />
			</v-box-header>
			<v-box-body>
				<v-form @submit.native.prevent="onFormSubmit">
					<v-input-group>
						<v-label>Username</v-label>
						<v-input
							type="text"
							minlength="2"
							maxlength="32"
							required
							v-model="username"
						/>
					</v-input-group>
					<v-input-group>
						<v-label>Password</v-label>
						<v-input
							type="password"
							maxlength="32"
							value=""
							v-model="password"
						/>
					</v-input-group>
					<v-input-group>
						<v-flex-box class="v--flex-justify-end">
							<v-button
								type="submit"
								:disabled="
									$helpers.voca.isBlank(username) || isLocked
								"
							>
								Continue
							</v-button>
						</v-flex-box>
					</v-input-group>
				</v-form>
			</v-box-body>
		</v-box>
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
import { HOME_ROUTE } from "@/router";
import {AxiosError} from "axios";

@Component<Login>({
	components: {
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
		VBox
	},
	metaInfo(): MetaInfo {
		return {
			title: "Login"
		};
	}
})
export default class Login extends Vue {
	username = "";
	password = "";
	isLocked = false;

	// must be null due to reactivity
	error: string | null = null;

	onFormSubmit(e: Event): void {
		e.preventDefault();
		this.isLocked = true;
		this.$store
			.dispatch(AUTH_MODULE.concat("/", AUTH_LOGIN), {
				username: this.username,
				password: this.password
			})
			.then(async (token: string) => {
				/*
				starting the login process from here, the authorization token is received and now it is mandatory
				that the verification be done using the token, there is no self-validation due to a possible fast
				invalidation of the token for any reason on the part of the server.
			 */
				this.$storage.set(AUTH_TOKEN_KEY, token);

				// eslint-disable-next-line no-useless-catch
				try {
					await this.$store.dispatch(
						AUTH_MODULE.concat("/", AUTH_VERIFY)
					);
					// this.$router.redirect(HOME_ROUTE);
				} catch (e) {
					throw e;
				}
			})
			.catch((err: AxiosError) => {
				let message: string
				const data = err.response?.data

				// filters some error codes due to the convention and for future translations.
				switch (data.code) {
					case 2002:
					case 2004: {
						message = "Invalid username or password.";
						break;
					}
					default: {
						console.warn("Unhandled error code:", data.code);
						message = data.message;
					}
				}

				this.error = message;
			})
			.then(() => this.isLocked = false);
	}
}
</script>
