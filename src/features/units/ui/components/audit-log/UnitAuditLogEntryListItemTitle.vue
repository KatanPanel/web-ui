<template>
	<div :class="$style.root">
		<i18n-t :keypath="createTranslationKey()">
			<template #actor>
				<span :class="$style.mark" v-text="actorName" />
			</template>
		</i18n-t>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { AuditLogEvent } from "@/features/units/models/audit-log.model";

@Component
export default class UnitAuditLogEntryListItemTitle extends Vue {
	@Prop({ type: String, required: true })
	private readonly actorName!: string;

	@Prop({ required: true })
	private readonly event!: AuditLogEvent;

	createTranslationKey(): string {
		return `units.audit-log.entry.pattern.${this.event}`;
	}
}
</script>

<style lang="scss" module>
.root {
	font-size: 15px;
	color: var(--kt-content-neutral);
}

.mark {
	color: var(--kt-content-neutral-high);
}
</style>
