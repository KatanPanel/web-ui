<template>
	<AuthLayout>
		<h4>{{ $t("auth.login.title") }}</h4>
		<VBody2 class="description">{{ $t("auth.login.subtitle") }}</VBody2>
		<VAlert variant="danger" class="alert" v-if="errorCode">
			<template v-slot:description>
				{{ $t(`error.${errorCode}`) }}
			</template>
		</VAlert>
		<VForm @submit.prevent="performLogin">
			<VFieldSet>
				<VLabel>
					{{ $t("auth.login.username-label") }}
					<VInput
						type="text"
						autocomplete="username"
						v-model="username"
						required
					/>
				</VLabel>
				<VLabel>
					{{ $t("auth.login.password-label") }}
					<VInput
						type="password"
						autocomplete="current-password"
						v-model="password"
						required
					/>
				</VLabel>
			</VFieldSet>
			<VButton
				:disabled="loading"
				class="login-button"
				variant="primary"
				type="submit"
				block
			>
				{{ $t("auth.login.submit-button") }}
			</VButton>
		</VForm>
	</AuthLayout>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import authPresenter from "@/data/presenters/auth.presenter";
import VButton from "@/presentation/components/ui/button/VButton.vue";
import VFieldSet from "@/presentation/components/ui/form/VFieldSet.vue";
import VForm from "@/presentation/components/ui/form/VForm.vue";
import VBody2 from "@/presentation/components/ui/typography/VBody2.vue";
import AuthLayout from "@/presentation/layouts/auth/AuthLayout.vue";
import VLabel from "@/presentation/components/ui/form/VLabel.vue";
import VInput from "@/presentation/components/ui/form/VInput.vue";
import VAlert from "@/presentation/components/ui/alert/VAlert.vue";
import { HttpError } from "@/domain/models/error.model";
import logService from "@/data/services/log.service";

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
	margin-bottom: 3.6rem;
	color: var(--kt-content-neutral-low);
}

.alert {
	margin-bottom: 0.8rem;
}
</style>
