<template>
	<h4>
		<b>{{ $t("units.audit-log.title") }}</b>
		<VCard v-if="auditLog">
			<div
				:key="entry.id"
				v-for="entry in auditLog.entries"
				class="auditlog"
			>
				{{ entry.id }}
			</div>
		</VCard>
	</h4>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import { AuditLog } from "@/features/units/models/audit-log.model";
import VCard from "@/features/shared/ui/components/design-system/card/VCard.vue";
import unitsPresenter from "@/features/units/ui/units.presenter";
import { Unit } from "@/features/units/models/unit.model";

@Component({
	components: { VCard }
})
export default class UnitAuditLogView extends Vue {
	auditLog: AuditLog | null = null;

	get unit(): Unit {
		return unitsPresenter.getCurrentUnitOrThrow;
	}

	created() {
		unitsPresenter
			.getAuditLog(this.unit.id)
			.then((auditLog) => (this.auditLog = auditLog));
	}
}
</script>

<style lang="scss" scoped></style>
