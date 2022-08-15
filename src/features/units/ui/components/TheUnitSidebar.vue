<template>
	<div :class="$style.root">
		<TheUnitSidebarSection display-icon="Home" display-label="Workspace">
			<TheUnitSidebarSectionItem :href="links.overview">
				General
			</TheUnitSidebarSectionItem>
			<TheUnitSidebarSectionItem :href="links.instanceConsole">
				Console
			</TheUnitSidebarSectionItem>
			<TheUnitSidebarSectionItem :href="links.settings">
				Settings
			</TheUnitSidebarSectionItem>
		</TheUnitSidebarSection>
		<TheUnitSidebarSection
			display-icon="Security"
			display-label="Access Management"
		>
			<TheUnitSidebarSectionItem :href="links.auditLog">
				Audit Log
			</TheUnitSidebarSectionItem>
		</TheUnitSidebarSection>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import {
	INSTANCE_CONSOLE_ROUTE,
	UNIT_AUDIT_LOG_ROUTE,
	UNIT_ROUTE,
	UNIT_SETTINGS_ROUTE
} from "@/features/units/routing/units.routes";
import { Unit } from "@/features/units/models/unit.model";
import unitsPresenter from "@/features/units/ui/units.presenter";
import VOverline from "@/features/shared/ui/components/design-system/typography/VOverline.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import TheUnitSidebarSection from "@/features/units/ui/components/TheUnitSidebarSection.vue";
import TheUnitSidebarSectionItem from "@/features/units/ui/components/TheUnitSidebarSectionItem.vue";

@Component({
	components: {
		TheUnitSidebarSectionItem,
		TheUnitSidebarSection,
		VLabel,
		VOverline
	}
})
export default class TheUnitSidebar extends Vue {
	readonly links = Object.freeze({
		overview: { name: UNIT_ROUTE },
		auditLog: { name: UNIT_AUDIT_LOG_ROUTE },
		settings: { name: UNIT_SETTINGS_ROUTE },
		instanceConsole: {
			name: INSTANCE_CONSOLE_ROUTE,
			params: {
				instanceId: this.unit.instanceId
			}
		}
	});

	get unit(): Unit {
		return unitsPresenter.getCurrentUnitOrThrow;
	}
}
</script>

<style lang="scss" module>
.root {
	position: relative;
	overflow-x: hidden;
	overflow-y: auto;
	height: 100%;
	flex-shrink: 0;
	margin-left: 24px;
	border-right: 1px solid var(--kt-border-low);
	min-width: 240px;
}
</style>
