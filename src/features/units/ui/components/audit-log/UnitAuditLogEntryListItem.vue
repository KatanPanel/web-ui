<template>
	<div v-if="actor !== undefined" :class="$style.root" role="listitem">
		<VCard reduced :class="$style.card">
			<Avatar
				:src="actor?.avatar"
				:label="`Avatar of ${entry.targetId}`"
				:class="$style.actorAvatar"
			/>
			<div :class="$style.info">
				<div :class="$style.infoTitle">{{ createTitle() }}</div>
				<time :datetime="entry.createdAt" :class="$style.infoTimestamp">
					{{ getFormattedTimestamp(entry.createdAt) }}
				</time>
				<ul v-if="entry.changes.length !== 0" :class="$style.changes">
					<li v-for="change in entry.changes" :key="change.key">
						<i18n-t :keypath="translationKeyFor(change)">
							<template v-if="change.oldValue" #oldValue>
								<span
									v-text="change.oldValue"
									:class="$style.infoMark"
								/>
							</template>
							<template v-if="change.newValue" #newValue>
								<span
									v-text="change.newValue"
									:class="$style.infoMark"
								/>
							</template>
						</i18n-t>
					</li>
				</ul>
			</div>
		</VCard>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import {
	AuditLogEntry,
	AuditLogEntryChange
} from "@/features/units/models/audit-log.model";
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";
import Avatar from "@/features/shared/ui/components/Avatar.vue";
import { Account } from "@/features/account/models/account.model";
import dayjs from "dayjs";

@Component({
	components: { Avatar, VCard }
})
export default class UnitAuditLogEntryListItem extends Vue {
	@Prop({ type: Object, required: true })
	private readonly entry!: AuditLogEntry;

	@Prop({ type: Object })
	private readonly actor!: Account | undefined;

	createTitle(): string {
		return this.$t(`units.audit-log.entry.pattern.${this.entry.event}`, {
			user: this.actor?.username,
			unit: this.entry.targetId
		});
	}

	translationKeyFor(change: AuditLogEntryChange): string {
		return `units.audit-log.change.pattern.unit.${change.key}`;
	}

	getFormattedTimestamp(timestamp: Date): string {
		return dayjs(timestamp, "dddd") as unknown as string;
	}
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
