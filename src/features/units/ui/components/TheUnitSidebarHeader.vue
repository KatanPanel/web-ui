<template>
	<div :class="$style.root">
		<div :class="$style.icon">
			<Avatar :src="unit.icon" label="Unit icon" />
		</div>
		<div :class="$style.info">
			<div :class="$style.name">
				{{ unit.name }}
			</div>
			<div :class="$style.label">
				<code>{{ unit.id }}</code>
			</div>
		</div>
		<div :class="$style.statusUpdate" @click="updateStatus">
			<VIcon name="Play" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Emit, Inject, Vue } from "vue-facing-decorator";
import { Unit } from "@/features/units/api/models/unit.model";
import Avatar from "@/features/platform/ui/components/Avatar.vue";
import VIcon from "@/features/platform/ui/components/icon/VIcon.vue";
import { InstanceStatusUpdateCode } from "@/features/units/api/models/instance.model";

@Component({
	components: { Avatar, VIcon },
	emits: ["status-update"]
})
export default class TheUnitSidebarHeader extends Vue {
	@Inject()
	private readonly unit!: Unit;

	@Emit("status-update")
	updateStatus(): InstanceStatusUpdateCode {
		return 1;
	}
}
</script>

<style lang="scss" module>
.root {
	display: flex;
	flex-direction: row;
	margin-bottom: 1.6rem;
	background-color: var(--kt-content-primary);
	color: var(--kt-content-primary-oncolor);
	border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;
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
	user-select: none;
}

.name {
	margin: 1.2rem 1.2rem 0 1.2rem;
	font-size: 14px;
	font-weight: 700;
}

.label {
	margin: 0 1.2rem 1.2rem 1.2rem;
	font-size: 12px;
	color: var(--kt-content-primary-oncolor);
}

.statusUpdate {
	color: var(--kt-content-primary-oncolor);
	border-radius: 8px;
	display: inline-flex;
	align-self: center;
	margin-right: 1.6rem;
	max-height: 24px;

	&:hover {
		background-color: var(--kt-content-primary-oncolor-overlay);
		cursor: pointer;
	}
}
</style>
