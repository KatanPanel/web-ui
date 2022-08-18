<template>
	<li :class="$style.root">
		<VCard :class="$style.card">
			<Avatar
				:src="undefined"
				:label="`Avatar of ${entry.targetId}`"
				:class="$style.actorAvatar"
			/>
			<div :class="$style.info">
				<div :class="$style.info__title">
					{{ entry.event }} Title here
				</div>
				<time
					:datetime="entry.createdAt"
					:class="$style.info__timestamp"
					>{{ $d(entry.createdAt) }}</time
				>
			</div>
		</VCard>
	</li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { AuditLogEntry } from "@/features/units/models/audit-log.model";
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";
import Avatar from "@/features/shared/ui/components/Avatar.vue";

@Component({
	components: { Avatar, VCard }
})
export default class UnitAuditLogEntry extends Vue {
	@Prop({ type: Object, required: true })
	private readonly entry!: AuditLogEntry;
}
</script>

<style lang="scss" module>
.root {
	&:not(:last-child) {
		margin-bottom: 8px;
	}
}

.card {
	display: flex;
	flex-direction: row;
}

.actorAvatar {
}

.info {
	display: flex;
	flex-direction: column;
}

.info__title {
	font-size: 14px;
}

.info__timestamp {
	font-size: 12px;
	color: var(--kt-content-neutral-low);
}
</style>
