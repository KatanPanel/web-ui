<template>
  <AuthLayout>
    <h4 v-t="'auth.login.title'" />
    <VBody2
      v-t="'auth.login.subtitle'"
      :class="$style.description"
    />
    <VAlert
      v-if="errorTranslationText"
      :class="$style.alert"
      variant="error"
    >
      <template #description>
        <span v-t="errorTranslationText" />
      </template>
    </VAlert>
    <VForm
      @submit.prevent="performLogin"
    >
      <VFieldSet>
        <VLabel>
          <span v-t="'auth.login.username-label'" />
          <VInput
            v-model="credentials.username"
            type="text"
            required="true"
            autocomplete="username"
          />
        </VLabel>
        <VLabel>
          <span v-t="'auth.login.password-label'" />
          <VInput
            v-model="credentials.password"
            type="password"
            required="true"
            autocomplete="current-password"
          />
        </VLabel>
      </VFieldSet>
      <VLayout gap="sm">
        <VButton
          v-t="'auth.login.submit-button'"
          type="submit"
          variant="primary"
          block
          :disabled="loginBeingPerformed"
          :class="$style.loginButton"
        />
        <VButton
          v-if="currentAccountName"
          v-t="{
            path: 'auth.login.continue-as-button',
            args: { name: currentAccountName }
          }"
          variant="default"
          block
          @click="navigateToIndex"
        />
      </VLayout>
    </VForm>
  </AuthLayout>
</template>
<script setup lang="ts">
import VButton from "@/modules/platform/ui/components/button/VButton.vue"
import VForm from "@/modules/platform/ui/components/form/VForm.vue"
import VLabel from "@/modules/platform/ui/components/form/VLabel.vue"
import VFieldSet from "@/modules/platform/ui/components/form/VFieldSet.vue"
import VAlert from "@/modules/platform/ui/components/alert/VAlert.vue"
import VBody2 from "@/modules/platform/ui/components/typography/VBody2.vue"
import AuthLayout from "@/modules/auth/ui/layouts/AuthLayout.vue"
import VInput from "@/modules/platform/ui/components/form/VInput.vue"
import { computed, reactive, ref } from "vue"
import authService from "@/modules/auth/api/services/auth.service"
import type { HttpError } from "@/modules/platform/api/models/error.model"
import { useRouter } from "vue-router"
import { useAccountsStore } from "@/modules/accounts/accounts.store"
import VLayout from "@/modules/platform/ui/components/grid/VLayout.vue"

const router = useRouter()

// State
const credentials = reactive({ username: "", password: "" })
const errorTranslationText = ref<string | null>(null)
const loginBeingPerformed = ref<boolean>(false)
const currentAccountName = useAccountsStore().account?.username

// Functions
function performLogin() {
    if (loginBeingPerformed.value) return;

    loginBeingPerformed.value = true;
    errorTranslationText.value = null;

    authService
        .login(credentials.username, credentials.password)
        .then(navigateToIndex)
        .catch((error: HttpError) => {
            errorTranslationText.value =
                error.code === "ERR_NETWORK"
                    ? "auth.login.network-error"
                    : `error.${error.code}`;
        })
        .finally(() => {
            loginBeingPerformed.value = false;
        });
}

function navigateToIndex() {
    router.push("/")
}
</script>
<style lang="scss" module>
.loginButton {
	margin-top: var(--space-lg);
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
