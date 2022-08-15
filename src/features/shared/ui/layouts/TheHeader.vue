<template>
	<header class="root">
		<div class="search-bar">
			<VInput placeholder="Search" />
		</div>
		<div class="account-info">
			<router-link to="/" class="avatar" title="Account" />
		</div>
	</header>
</template>
<style lang="scss" module></style>
<script>
import { Component, Vue } from "vue-facing-decorator";
import VInput from "@/features/shared/ui/components/design-system/form/VInput";
@Component({
	components: { VInput }
})
export default class TheSidebar extends Vue {}
</script>
<style lang="scss" scoped>
.root {
	background-color: var(--kt-background-surface);
	padding: 24px;
	display: flex;
}

.search-bar {
	flex-grow: 1;
}

.account-info {
	margin-left: 8px;
	width: 40px;
	height: 40px;

	.avatar {
		box-shadow: 0 0 4px 0 RGB(0 0 0 / 12%) inset;
		border-radius: 50%;
	}
}
</style>
