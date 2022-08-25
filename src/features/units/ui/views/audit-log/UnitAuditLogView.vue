<template>
	<PageHeader>
		<template #title><span v-t="'units.audit-log.title'" /></template>
		<template #subtitle><span v-t="'units.audit-log.subtitle'" /></template>
	</PageHeader>
	<ul v-if="auditLog">
		<UnitAuditLogEntry
			v-for="entry in auditLog.entries"
			:entry="entry"
			:key="entry.id"
			:title="entry.id"
		/>
	</ul>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { AuditLog } from "@/features/units/models/audit-log.model";
import unitsPresenter from "@/features/units/ui/units.presenter";
import { Unit } from "@/features/units/models/unit.model";
import logService from "@/features/shared/data/log.service";
import UnitAuditLogEntry from "@/features/units/ui/components/audit-log/UnitAuditLogEntry.vue";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";

@Component({
	components: { PageHeader, UnitAuditLogEntry }
})
export default class UnitAuditLogView extends Vue {
	@Inject()
	private readonly unit!: Unit;

	auditLog: AuditLog | null = null;

	created() {
		unitsPresenter.getAuditLog(this.unit.id).then((auditLog) => {
			this.auditLog = auditLog;
			logService.log("Audit log fetched", auditLog);
		});
	}
}
</script>

<style lang="scss" module></style>
