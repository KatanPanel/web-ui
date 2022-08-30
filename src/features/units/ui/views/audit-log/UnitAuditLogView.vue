<template>
	<VContainer>
		<PageHeader>
			<template #title>
				<span v-t="'units.audit-log.title'" />
			</template>
			<template #subtitle>
				<span v-t="'units.audit-log.subtitle'" />
			</template>
		</PageHeader>
		<VAlert variant="info" :class="$style.alert">
			<template #description>
				<i18n-t keypath="units.audit-log.paging-limited">
					<template #count> 20 </template>
				</i18n-t>
			</template>
		</VAlert>
		<UnitAuditLogEntryList :unit-id="unit.id" />
	</VContainer>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import { Unit } from "@/features/units/models/unit.model";
import PageHeader from "@/features/shared/ui/components/PageHeader.vue";
import VContainer from "@/features/shared/ui/components/design-system/grid/VContainer.vue";
import UnitAuditLogEntryList from "@/features/units/ui/components/audit-log/UnitAuditLogEntryList.vue";
import VAlert from "@/features/shared/ui/components/design-system/alert/VAlert.vue";

@Component({
	components: { VContainer, PageHeader, UnitAuditLogEntryList, VAlert }
})
export default class UnitAuditLogView extends Vue {
	@Inject()
	private readonly unit!: Unit;
}
</script>

<style lang="scss" module>
.alert {
	margin-bottom: 3.2rem !important;
}
</style>
