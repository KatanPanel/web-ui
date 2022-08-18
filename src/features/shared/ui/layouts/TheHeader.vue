<template>
	<header :class="$style.root">
		<div :class="$style.search_bar">
			<VInput :class="$style.search_bar__input" placeholder="Search" />
		</div>
		<div :class="$style.account_info">
			<router-link :to="routeToAccount" title="My Account">
				<Avatar
					:src="account.avatar"
					:label="`${account.username} avatar`"
				/>
			</router-link>
		</div>
	</header>
</template>
<style lang="scss" module></style>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import Avatar from "@/features/shared/ui/components/Avatar.vue";
import { Account } from "@/features/account/models/account.model";
import { RouteLocationRaw } from "vue-router";
import { ACCOUNT_ROUTE } from "@/features/account/routing/accounts.routes";

@Component({
	components: { Avatar, VInput }
})
export default class TheSidebar extends Vue {
	readonly routeToAccount: RouteLocationRaw = {
		name: ACCOUNT_ROUTE
	};

	get account(): Account {
		return this.$katan.getUser();
	}
}
</script>
<style lang="scss" module>
.root {
	background-color: var(--kt-background-surface);
	padding: 24px;
	display: flex;
	//border-bottom: 1px solid var(--kt-border-low);
}

.search_bar {
	flex-grow: 1;
	margin-right: 4.8rem;
}

.search_bar__input {
}

.account_info {
	width: 32px;
	height: 32px;
}
</style>
