<template>
	<VContainer>
		<PageHeader>
			<template #title>Account</template>
		</PageHeader>
		<VForm>
			<VSection>
				<VRow>
					<VCol :size="6">
						<VFieldSet>
							<VLabel>ID</VLabel>
							<VInput type="text" :value="account.id" readonly />
						</VFieldSet>
					</VCol>
				</VRow>
			</VSection>
			<VSection>
				<VRow>
					<VCol :size="4">
						<VFieldSet>
							<VLabel>Username</VLabel>
							<VInput type="text" :value="account.username" />
						</VFieldSet>
					</VCol>
					<VCol :size="8">
						<VFieldSet>
							<VLabel>Email</VLabel>
							<VInput
								type="email"
								placeholder="example@katan.org"
								:value="account.email"
							/>
						</VFieldSet>
					</VCol>
				</VRow>
			</VSection>
		</VForm>
	</VContainer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import VForm from "@/features/shared/ui/components/design-system/form/VForm.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import VCol from "@/features/shared/ui/components/design-system/grid/VCol.vue";
import VRow from "@/features/shared/ui/components/design-system/grid/VRow.vue";
import { Account } from "@/features/account/models/account.model";
import { getModule } from "vuex-module-decorators";
import AccountStore from "@/features/account/store/account.store";
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";
import VSection from "@/features/shared/ui/components/design-system/grid/VSection.vue";

@Component({
	components: {
		PageHeader,
		VContainer,
		VForm,
		VInput,
		VFieldSet,
		VLabel,
		VRow,
		VCol,
		VCard,
		VSection
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
