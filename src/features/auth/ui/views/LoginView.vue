<template>
	<AuthLayout>
		<h4 v-t="'auth.login.title'" />
		<VBody2 v-t="'auth.login.subtitle'" :class="$style.description" />
		<VAlert :class="$style.alert" variant="error" v-if="errorTranslationText">
			<template #description>
				<span v-t="errorTranslationText" />
			</template>
		</VAlert>
		<VForm @submit.prevent="performLogin">
			<VFieldSet>
				<VLabel>
					<span v-t="'auth.login.username-label'" />
					<VInput
						autocomplete="username"
						type="text"
						required="true"
						v-model="credentials.username"
					/>
				</VLabel>
				<VLabel>
					<span v-t="'auth.login.password-label'" />
					<VInput
						autocomplete="current-password"
						type="password"
						required="true"
						v-model="credentials.password"
					/>
				</VLabel>
			</VFieldSet>
			<VButton
				type="submit"
				variant="primary"
				block="true"
				:disabled="loginBeingPerformed"
				:class="$style.loginButton"
				v-t="'auth.login.submit-button'"
			/>
		</VForm>
	</AuthLayout>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import VButton from "@/features/platform/ui/components/button/VButton.vue";
import VFieldSet from "@/features/platform/ui/components/form/VFieldSet.vue";
import VForm from "@/features/platform/ui/components/form/VForm.vue";
import VBody2 from "@/features/platform/ui/components/typography/VBody2.vue";
import AuthLayout from "@/features/auth/ui/layouts/AuthLayout.vue";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";
import VInput from "@/features/platform/ui/components/form/VInput.vue";
import VAlert from "@/features/platform/ui/components/alert/VAlert.vue";
import { HttpError } from "@/features/platform/api/error.model";
import authService from "@/features/auth/api/services/auth.service";

@Component({
	components: {
		VAlert,
		VInput,
		VLabel,
		AuthLayout,
		VBody2,
		VForm,
		VFieldSet,
		VButton
	}
})
export default class AuthLoginView extends Vue {

	credentials = { username: "", password: "" };
	errorTranslationText: string | null = null

	/**
	 * Becomes true when the client clicks on "Log In" button.
	 * Prevents double login action by consecutive clicks.
	 **/
	loginBeingPerformed = false;

	performLogin() {
		if (this.loginBeingPerformed)
			return;

		this.errorTranslationText = null;

		authService
			.login(this.credentials.username, this.credentials.password)
			.then(() => { this.$router.push({ path: "/" }) })
			.catch((error: HttpError) => { this.errorTranslationText = `error.${error.code}` })
			.finally(() => { this.loginBeingPerformed = false });
	}
}
</script>
<style lang="scss" module>
.loginButton {
	margin-top: 2.4rem;
}

.description {
	margin-top: 0.4rem;
	margin-bottom: 1.6rem;
	color: var(--kt-content-neutral);
}

.alert {
	margin-bottom: 2.4rem !important;
}

form {
	padding-top: 0.8rem;
}
</style>
