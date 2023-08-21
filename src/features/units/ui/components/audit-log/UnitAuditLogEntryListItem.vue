<template>
	<VCard role="listitem" :reduced="true" :class="$style.root">
		<UnitAuditLogEntryListItemAvatar
			:avatar-url="actor.avatar"
			:subject="actor.username"
		/>
		<div :class="$style.info">
			<UnitAuditLogEntryListItemTitle
				:actor-name="actor.username"
				:event="entry.event"
			/>
			<UnitAuditLogEntryListItemTimestamp :timestamp="entry.createdAt" />

			<ul v-if="entry.changes.length !== 0" :class="$style.changes">
				<li
					v-for="change in entry.changes"
					:key="createUniqueKeyForChange(change.key)"
				>
					<UnitAuditLogEntryListItemChange :change="change" />
				</li>
			</ul>
		</div>
	</VCard>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { AuditLogEntry } from "@/features/units/api/models/audit-log.model";
import VCard from "@/features/platform/ui/components/card/VCard.vue";
import Avatar from "@/features/platform/ui/components/Avatar.vue";
import { Account } from "@/features/account/api/models/account.model";
import UnitAuditLogEntryListItemTitle from "@/features/units/ui/components/audit-log/UnitAuditLogEntryListItemTitle.vue";
import UnitAuditLogEntryListItemTimestamp from "@/features/units/ui/components/audit-log/UnitAuditLogEntryListItemTimestamp.vue";
import UnitAuditLogEntryListItemAvatar from "@/features/units/ui/components/audit-log/UnitAuditLogEntryListItemAvatar.vue";
import UnitAuditLogEntryListItemChange from "@/features/units/ui/components/audit-log/UnitAuditLogEntryListItemChange.vue";

@Component({
	components: {
		Avatar,
		VCard,
		UnitAuditLogEntryListItemTitle,
		UnitAuditLogEntryListItemTimestamp,
		UnitAuditLogEntryListItemAvatar,
		UnitAuditLogEntryListItemChange
	}
})
export default class UnitAuditLogEntryListItem extends Vue {
	@Prop({ type: Object, required: true })
	private readonly entry!: AuditLogEntry;

	@Prop({ type: Object })
	private readonly actor!: Account;

	createUniqueKeyForChange(key: string): string {
		return `change-${key}`;
	}
}
</script>

<style lang="scss" module>
.root {
	display: flex;
	flex-direction: row;
	user-select: none;
}

.actorAvatar {
	width: 40px;
	height: 40px;
}

.info {
	display: flex;
	flex-direction: column;
	margin-left: 1.2rem;
	color: var(--kt-content-neutral-high);
}

.infoTitle {
	font-size: 15px;
	color: var(--kt-content-neutral);
}

.infoTimestamp {
	font-size: 12px;
	color: var(--kt-content-neutral-low);
}

.infoMark {
	font-weight: 600;
	color: var(--kt-content-neutral-high);
}

.changes {
	margin-top: 0.8rem;
	color: var(--kt-content-neutral);
	font-size: 14px;
}
</style>
