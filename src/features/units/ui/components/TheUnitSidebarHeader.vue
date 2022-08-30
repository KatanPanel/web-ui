<template>
	<div :class="$style.root">
		<div :class="$style.wrapper">
			<div :class="$style.info">
				<div :class="$style.name">
					{{ unit.name }}
				</div>
				<div :class="$style.label">Workspace</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Unit } from "@/features/units/models/unit.model";

@Component
export default class TheUnitSidebarHeader extends Vue {
	@Inject()
	private readonly unit!: Unit;
}
</script>

<style lang="scss" module>
.root {
	display: flex;
	flex-direction: column;
	margin-top: 2.4rem;
	margin-bottom: 4.8rem;
	background-color: var(--kt-content-primary);
}

.wrapper {
	display: flex;
	flex-direction: row;
	width: 100%;
}

.info {
	flex-grow: 1;
	align-self: center;
	user-select: none;
	margin-left: 2.4rem;
}

.name {
	font-size: 22px;
	color: var(--kt-content-primary-oncolor);
	font-family: var(--kt-headline-font);
	font-weight: 700;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.label {
	font-size: 12px;
	font-weight: 500;
	color: var(--kt-content-neutral-low);
	margin-top: 0.4rem;
}
</style>
