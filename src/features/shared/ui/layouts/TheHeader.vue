<template>
	<header :class="$style.root">
		<div :class="$style.search_bar">
			<VInput :class="$style.search_bar__input" placeholder="Search" />
		</div>
		<div :class="$style.account_info">
			<router-link :to="routeToAccount" title="My Account">
				<Avatar :src="undefined" :label="`Account avatar`" />
			</router-link>
		</div>
	</header>
</template>
<style lang="scss" module></style>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import Avatar from "@/features/shared/ui/components/Avatar.vue";
import { RouteLocationRaw } from "vue-router";
import { ACCOUNT_ROUTE } from "@/features/account/routing/accounts.routes";

@Component({
	components: { Avatar, VInput }
})
export default class TheSidebar extends Vue {
	readonly routeToAccount: RouteLocationRaw = {
		name: ACCOUNT_ROUTE
	};
}
</script>
<style lang="scss" module>
.root {
	margin: 2.4rem 1.6rem;
	display: flex;
	//box-shadow: 0 0 1px rgba(0, 0, 0, 0.12), 0 6px 12px -2px rgba(0, 0, 0, 0.04);
	background-color: var(--kt-background-body);
}

.search_bar {
	flex-grow: 1;
	margin-right: 4.8rem;
}

.search_bar__input {
	background-color: var(--kt-background-surface);
}

.account_info {
	width: 32px;
	height: 32px;
}
</style>
