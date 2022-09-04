<template>
	<Resource
		@loaded="onLoad"
		:resource="getResource"
		empty-state-title="units.audit-log.empty-state.title"
		empty-state-description="units.audit-log.empty-state.description"
		empty-state-icon="ClipboardTextOffOutline"
	>
		<ul role="list">
			<UnitAuditLogEntryListItem
				v-for="entry in auditLog.entries"
				:entry="entry"
				:actor="getMatchingActor(entry)"
				:key="entry.id"
				:title="entry.id"
			/>
		</ul>
	</Resource>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import {
	AuditLog,
	AuditLogEntry
} from "@/features/units/models/audit-log.model";
import UnitAuditLogEntryListItem from "@/features/units/ui/components/audit-log/UnitAuditLogEntryListItem.vue";
import Resource from "@/features/shared/ui/components/Resource.vue";
import unitsPresenter from "@/features/units/ui/units.presenter";

@Component({
	components: {
		Resource,
		UnitAuditLogEntryListItem
	}
})
export default class UnitAuditLogEntryList extends Vue {
	@Prop({ type: String, required: true })
	private readonly unitId!: string;

	auditLog!: AuditLog;

	getResource(): Promise<AuditLog> {
		return unitsPresenter.getAuditLog(this.unitId);
	}

	onLoad(auditLog: AuditLog) {
		this.auditLog = auditLog;
	}

	getMatchingActor(entry: AuditLogEntry): unknown | undefined {
		return this.auditLog?.actors.find(
			(actor) => actor.id === entry.actorId?.toString()
		);
	}
}
</script>

<style lang="scss" module></style>
