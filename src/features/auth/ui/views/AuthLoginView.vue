<template>
	<AuthLayout>
		<h4 v-t="'auth.login.title'" />
		<VBody2 v-t="'auth.login.subtitle'" :class="$style.description" />
		<VAlert :class="$style.alert" :variant="'error'" v-if="errorCode">
			<!--<template #title>-->
			<!--	<span v-t="'auth.login.error-title'" />-->
			<!--</template>-->
			<template #description>
				<span v-t="`error.${errorCode}`" />
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
						v-model="username"
					/>
				</VLabel>
				<VLabel>
					<span v-t="'auth.login.password-label'" />
					<VInput
						autocomplete="current-password"
						type="password"
						required="true"
						v-model="password"
					/>
				</VLabel>
			</VFieldSet>
			<VButton
				type="submit"
				:disabled="loading"
				:class="$style.loginButton"
				:variant="'primary'"
				:block="true"
				v-t="'auth.login.submit-button'"
			/>
		</VForm>
	</AuthLayout>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import authPresenter from "@/features/auth/auth.presenter";
import VButton from "@/features/platform/ui/components/button/VButton.vue";
import VFieldSet from "@/features/platform/ui/components/form/VFieldSet.vue";
import VForm from "@/features/platform/ui/components/form/VForm.vue";
import VBody2 from "@/features/platform/ui/components/typography/VBody2.vue";
import AuthLayout from "@/features/auth/ui/layouts/AuthLayout.vue";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";
import VInput from "@/features/platform/ui/components/form/VInput.vue";
import VAlert from "@/features/platform/ui/components/alert/VAlert.vue";
import { HttpError } from "@/features/platform/api/error.model";
import logService from "@/features/platform/api/log.service";

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
	username = "";
	password = "";
	loading = false;
	errorCode: number | null = null;

	performLogin() {
		if (this.loading) return;

		this.loading = true;
		this.errorCode = null;

		authPresenter
			.login(this.username, this.password)
			.then(() => {
				this.$router.push({ path: "/" });
			})
			.catch((error: HttpError) => {
				// TODO handle error properly, show error alert
				logService.error("Failed to log in", error.code);
				this.errorCode = error.code;
			})
			.finally(() => {
				this.loading = false;
			});
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
