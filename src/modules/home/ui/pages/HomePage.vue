<template>
  <VContainer>
    <h1
      v-t="{
        path: 'home.title',
        args: { username: account.username }
      }"
    />
  </VContainer>
</template>

<script setup lang="ts">
import { useAccountsStore } from "@/modules/accounts/accounts.store"
import VContainer from "@/modules/platform/ui/components/grid/VContainer.vue"

const account = useAccountsStore().getAccount
</script>