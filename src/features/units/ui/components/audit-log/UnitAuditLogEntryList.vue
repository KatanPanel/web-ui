<template>
	<LoadingState v-if="isLoading" />
	<ErrorState v-else-if="error" />
	<EmptyState
		v-else-if="isEmpty"
		:align-y="true"
		icon="ClipboardTextOffOutline"
	>
		<h4 v-t="'units.audit-log.empty-state.title'" />
		<p v-t="'units.audit-log.empty-state.description'" />
	</EmptyState>
	<ul v-else role="list">
		<UnitAuditLogEntryListItem
			v-for="entry in auditLog.entries"
			:entry="entry"
			:actor="getMatchingActor(entry)"
			:key="entry.id"
			:title="entry.id"
		/>
	</ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import {
	AuditLog,
	AuditLogEntry
} from "@/features/units/models/audit-log.model";
import EmptyState from "@/features/shared/ui/components/EmptyState.vue";
import LoadingState from "@/features/shared/ui/components/LoadingState.vue";
import ErrorState from "@/features/shared/ui/components/ErrorState.vue";
import unitsPresenter from "@/features/units/ui/units.presenter";
import UnitAuditLogEntryListItem from "@/features/units/ui/components/audit-log/UnitAuditLogEntryListItem.vue";

@Component({
	components: {
		LoadingState,
		EmptyState,
		ErrorState,
		UnitAuditLogEntryListItem
	}
})
export default class UnitAuditLogEntryList extends Vue {
	@Prop({ type: String, required: true })
	private readonly unitId!: string;

	isLoading = true;
	isEmpty = false;
	auditLog: AuditLog | null = null;
	error: unknown = undefined;

	created() {
		this.loadAuditLog();
	}

	private loadAuditLog(): void {
		this.isLoading = true;
		this.auditLog = null;

		unitsPresenter
			.getAuditLog(this.unitId)
			.then((auditLog) => (this.auditLog = auditLog))
			.catch((error) => (this.error = error))
			.finally(() => {
				this.isEmpty =
					this.auditLog == null || this.auditLog.entries.length === 0;
				this.isLoading = false;
			});
	}

	getMatchingActor(entry: AuditLogEntry): unknown | undefined {
		return this.auditLog?.actors.find(
			(actor) => actor.id === entry.actorId?.toString()
		);
	}
}
</script>

<style lang="scss" module></style>
