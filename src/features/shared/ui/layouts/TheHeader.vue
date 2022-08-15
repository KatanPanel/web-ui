<template>
	<header :class="$style.root">
		<div :class="$style.search_bar">
			<VInput :class="$style.search_bar__input" placeholder="Search" />
		</div>
		<div :class="$style.account_info">
			<router-link
				to="/"
				:class="$style.account_info__avatar"
				title="Account"
			/>
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
<style lang="scss" module>
.root {
	background-color: var(--kt-background-surface);
	//padding: 24px;
	display: flex;
	border-bottom: 1px solid var(--kt-border-low);
}

.search_bar {
	flex-grow: 1;
}

.search_bar__input {
	border-radius: 0;
}

.account_info {
	margin-left: 8px;
	width: 32px;
	height: 32px;
}

.account_info__avatar {
	box-shadow: 0 0 4px 0 RGB(0 0 0 / 12%) inset;
	border-radius: 50%;
}
</style>
