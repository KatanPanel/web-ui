<template>
	<AuthLayout>
		<h4>{{ $t("auth.login.title") }}</h4>
		<VBody2 class="description">{{ $t("auth.login.subtitle") }}</VBody2>
		<VAlert v-if="errorCode" class="alert" variant="error">
			{{ $t("auth.login.error-title") }}
			<template v-slot:description>
				{{ $t(`error.${errorCode}`) }}
			</template>
		</VAlert>
		<VForm @submit.prevent="performLogin">
			<VFieldSet>
				<VLabel>
					{{ $t("auth.login.username-label") }}
					<VInput
						v-model="username"
						autocomplete="username"
						required
						type="text"
					/>
				</VLabel>
				<VLabel>
					{{ $t("auth.login.password-label") }}
					<VInput
						v-model="password"
						autocomplete="current-password"
						required
						type="password"
					/>
				</VLabel>
			</VFieldSet>
			<VButton
				:disabled="loading"
				block
				class="login-button"
				type="submit"
				variant="primary"
			>
				{{ $t("auth.login.submit-button") }}
			</VButton>
		</VForm>
	</AuthLayout>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import authPresenter from "@/features/auth/ui/auth.presenter";
import VButton from "@/features/shared/ui/components/design-system/button/VButton.vue";
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import VForm from "@/features/shared/ui/components/design-system/form/VForm.vue";
import VBody2 from "@/features/shared/ui/components/design-system/typography/VBody2.vue";
import AuthLayout from "@/features/auth/ui/layouts/AuthLayout.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import VAlert from "@/features/shared/ui/components/design-system/alert/VAlert.vue";
import { HttpError } from "@/features/shared/models/error.model";
import logService from "@/features/shared/data/log.service";

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
<style lang="scss" scoped>
.login-button {
	margin-top: 2.4rem;
}

.description {
	margin-bottom: 1.8rem;
	color: var(--kt-content-neutral-low);
}

.alert {
	margin-bottom: 2.4rem;
}
</style>
