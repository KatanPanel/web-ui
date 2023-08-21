<template>
	<header :class="$style.root">
		<div :class="$style.account_info">
			<router-link :to="routeToAccount" title="My Account">
				<Avatar :src="undefined" :label="`Account avatar`" />
			</router-link>
		</div>
	</header>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import VInput from "@/features/platform/ui/components/form/VInput.vue";
import Avatar from "@/features/platform/ui/components/Avatar.vue";
import { RouteLocationRaw } from "vue-router";
import { ACCOUNT_ROUTE } from "@/features/account/accounts.routes";

@Component({
	components: { Avatar, VInput }
})
export default class TheSidebar extends Vue {
	readonly routeToAccount: RouteLocationRaw = {
		name: ACCOUNT_ROUTE
	};
}
</script>
<style lang="scss" module></style>
<style lang="scss" module>
.root {
	position: absolute;
	right: 0;
	margin-top: 3.2rem;
	margin-right: 4.8rem;
}

.account_info {
	width: 40px;
	height: 40px;
	max-height: 40px;
}
</style>
