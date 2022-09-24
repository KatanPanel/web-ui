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
import VCard from "@/design-system/card/VCard.vue";
import VCol from "@/design-system/grid/VCol.vue";
import VRow from "@/design-system/grid/VRow.vue";
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Account } from "@/features/account/models/account.model";
import VInput from "@/design-system/form/VInput.vue";
import VLabel from "@/design-system/form/VLabel.vue";
import VFieldSet from "@/design-system/form/VFieldSet.vue";
import Avatar from "@/features/shared/ui/components/Avatar.vue";

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
