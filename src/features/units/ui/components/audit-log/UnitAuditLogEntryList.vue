<template>
	<Resource
		:resource="getResource"
		empty-state-title="units.audit-log.empty-state.title"
		empty-state-description="units.audit-log.empty-state.description"
		empty-state-icon="ClipboardTextOffOutline"
		@loaded="onLoad"
	>
		<ul role="list">
			<UnitAuditLogEntryListItem
				v-for="entry in auditLog.entries"
				:key="entry.id"
				:entry="entry"
				:actor="getMatchingActor(entry)"
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
} from "@/features/units/api/models/audit-log.model";
import UnitAuditLogEntryListItem from "@/features/units/ui/components/audit-log/UnitAuditLogEntryListItem.vue";
import Resource from "@/features/platform/ui/components/Resource.vue";
import unitsService from "@/features/units/api/units.service";

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
		return unitsService.getAuditLogs(this.unitId);
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
