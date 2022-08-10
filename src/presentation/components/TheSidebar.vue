<template>
	<aside :class="$style.root">
		<div :class="$style.logo">
			<TheLogo :black="true" />
		</div>
	</aside>
</template>
<style lang="scss" module></style>
<script>
import { Component, Vue } from "vue-facing-decorator";
import TheLogo from "@/presentation/components/TheLogo";

@Component({
	components: { TheLogo }
})
export default class TheSidebar extends Vue {}
</script>
<style lang="scss" module>
$size: 64px;
$base-padding: 8px;

.root {
	background-color: var(--kt-background-surface);
	padding: 8px;
}

.logo {
	width: $size;
	height: $size;
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		width: 54px;
		height: 54px;
		border-radius: 8px;
	}
}
</style>
