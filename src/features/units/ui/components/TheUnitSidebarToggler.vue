<template>
	<div :class="$style.root">
		<div :class="$style.wrapper">
			<VIcon :class="$style.icon" name="Stop" />
		</div>
	</div>
</template>

<script lang="ts">
import VIcon from "@/features/shared/ui/components/design-system/icon/VIcon.vue";
import { Component, Vue } from "vue-facing-decorator";

@Component({
	components: { VIcon }
})
export default class TheUnitSidebarToggler extends Vue {}
</script>

<style lang="scss" module>
.root {
	transform: translateX(-50%);
	position: absolute;
	left: calc(72px + 240px);
	top: 2.4rem;
	background: var(--kt-background-body);
	width: 40px;
	height: 40px;
	border-radius: 50%;
	display: flex;
	justify-content: center;

	&:hover {
		cursor: pointer;

		.icon {
			color: var(--kt-content-negative-hover);
		}
	}
}

.wrapper {
	align-self: center;
	background-color: var(--kt-content-negative-overlay);
	border-radius: 50%;
	width: 32px;
	height: 32px;
}

.icon {
	color: var(--kt-content-negative);
	position: relative;
	display: block;
	top: 50%;
	transform: translateY(-50%);

	svg {
		width: 24px;
		height: 24px;
	}
}
</style>
