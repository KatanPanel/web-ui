<template>
	<AuthLayout>
		<AuthLogin v-if="!authStore.isLoggedIn" />
		<AuthLoginProceed v-else :username="authStore.account.username" />
	</AuthLayout>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import { generateMetaInfo } from "@/app/shared/utils/builtin";
import AuthLayout from "@/app/auth/layouts/AuthLayout.vue";
import { inject } from "inversify-props";
import { AuthStore } from "@/app/auth/auth.store";
import AuthLogin from "@/app/auth/components/AuthLogin.vue";
import AuthLoginProceed from "@/app/auth/components/AuthLoginProceed.vue";

@Component<Login>({
	components: { AuthLoginProceed, AuthLogin, AuthLayout },
	metaInfo(): MetaInfo {
		return generateMetaInfo(this.$i18n, "login");
	}
})
export default class Login extends Vue {
	@inject() private readonly authStore!: AuthStore;
}
</script>
