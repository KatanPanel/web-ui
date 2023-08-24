<template>TODO</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Unit } from "@/features/units/api/models/unit.model";
import Avatar from "@/features/platform/ui/components/Avatar.vue";

@Component({
	components: { Avatar }
})
export default class TheUnitSidebarStatus extends Vue {
	@Inject()
	private readonly unit!: Unit;
}
</script>

<style lang="scss" module>
.root {
	display: flex;
	flex-direction: row;
	margin: 2.4rem 2.4rem 1.6rem;
	background-color: var(--kt-background-surface);
	border-radius: 8px;
	border: 1px solid var(--kt-border-medium);
}

.icon {
	margin: 1.2rem 0 1.2rem 1.2rem;
	width: 40px;
	height: 40px;
}

.info {
	display: flex;
	justify-content: center;
	flex-grow: 1;
	flex-direction: column;
}

.name {
	margin: 1.2rem 1.2rem 0 1.2rem;
	font-size: 14px;
	font-weight: 700;
}

.label {
	margin: 0 1.2rem 1.2rem 1.2rem;
	font-size: 12px;
	color: var(--kt-content-neutral);
}
</style>
