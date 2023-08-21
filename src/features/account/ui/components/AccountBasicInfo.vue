<template>
	<VCard :outlined="true">
		<VRow>
			<VCol :size="4">
				<Avatar
					label="Account avatar"
					:src="account.avatar"
					:class="$style.avatar"
				/>
			</VCol>
			<VCol :size="8">
				<VFieldSet>
					<VLabel :on-color="true"> Username </VLabel>
					<VInput type="text" :value="account.username" />
				</VFieldSet>
				<VFieldSet>
					<VLabel :on-color="true"> Email </VLabel>
					<VInput type="email" :value="account.email" />
				</VFieldSet>
			</VCol>
		</VRow>
	</VCard>
</template>

<script lang="ts">
import VCard from "@/features/platform/ui/components/card/VCard.vue";
import VCol from "@/features/platform/ui/components/grid/VCol.vue";
import VRow from "@/features/platform/ui/components/grid/VRow.vue";
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Account } from "@/features/account/api/account.model";
import VInput from "@/features/platform/ui/components/form/VInput.vue";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";
import VFieldSet from "@/features/platform/ui/components/form/VFieldSet.vue";
import Avatar from "@/features/platform/ui/components/Avatar.vue";

@Component({
	components: { VCard, VRow, VCol, VFieldSet, VLabel, VInput, Avatar }
})
export default class AccountBasicInfo extends Vue {
	@Inject()
	private readonly account!: Account;
}
</script>

<style lang="scss" module>
.avatar {
	width: 48px;
	height: 48px;
}
</style>
