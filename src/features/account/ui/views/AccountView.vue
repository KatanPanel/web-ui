<template>Current account: {{ account.id }}</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import { Account } from "@/features/account/models/account.model";

@Component
export default class AccountView extends Vue {
	get account(): Account {
		return this.$katan.getUser();
	}
}
</script>

<style lang="scss" scoped></style>
