<template>
	<i18n-t :keypath="createTranslationKey()">
		<template v-if="change.oldValue" #oldValue>
			<span :class="$style.mark" v-text="change.oldValue" />
		</template>
		<template v-if="change.newValue" #newValue>
			<span :class="$style.mark" v-text="change.newValue" />
		</template>
	</i18n-t>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { AuditLogEntryChange } from "@/features/units/models/audit-log.model";

@Component
export default class UnitAuditLogEntryListItemChange extends Vue {
	@Prop({ type: Object, required: true })
	private readonly change!: AuditLogEntryChange;

	createTranslationKey(): string {
		return `units.audit-log.change.pattern.${this.change.key}`;
	}
}
</script>

<style lang="scss" module>
.mark {
	font-weight: 600;
	color: var(--kt-content-neutral-high);
}
</style>
