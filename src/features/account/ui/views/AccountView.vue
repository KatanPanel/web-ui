<template>
	<VContainer>
		<PageHeader :no-divider="true">
			<template #title> Account </template>
		</PageHeader>
		<VForm>
			<AccountBasicInfo />
		</VForm>
	</VContainer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import PageHeader from "@/features/platform/ui/components/PageHeader.vue";
import VContainer from "@/features/platform/ui/components/grid/VContainer.vue";
import VForm from "@/features/platform/ui/components/form/VForm.vue";
import { Account } from "@/features/account/api/account.model";
import { getModule } from "vuex-module-decorators";
import AccountStore from "@/features/account/account.store";
import AccountBasicInfo from "@/features/account/ui/components/AccountBasicInfo.vue";
import { computed } from "vue";

@Component({
	provide(this: AccountView) {
		return {
			account: computed(() => this.account)
		};
	},
	components: {
		PageHeader,
		VContainer,
		VForm,
		AccountBasicInfo
	}
})
export default class AccountView extends Vue {
	get account(): Account {
		// TODO use presenter
		return getModule(AccountStore).getAccount;
	}
}
</script>

<style lang="scss" scoped></style>
