<template>
	<nav :class="$style.root" role="navigation">
		<TheUnitSidebarToggler @click="onTogglerClick" />
		<div :class="$style.header">
			<div :class="$style.header__inner">
				<div :class="$style.header__logo">
					<Avatar :src="unit.logo" label="Logo" />
				</div>
				<div :class="$style.header__info">
					<div :class="$style.header__info__name">
						{{ unit.name }}
					</div>
					<div :class="$style.header__label">Workspace</div>
				</div>
			</div>
			<TheUnitSidebarSection>
				<TheUnitSidebarSectionItem
					:href="links.overview"
					icon="HomeVariantOutline"
				>
					Overview
				</TheUnitSidebarSectionItem>
			</TheUnitSidebarSection>
		</div>
		<!--		<div :class="$style.separator" role="separator" />-->
		<TheUnitSidebarSection>
			<TheUnitSidebarSectionItem
				:href="links.instance?.console"
				icon="CodeTags"
			>
				Console
			</TheUnitSidebarSectionItem>
			<TheUnitSidebarSectionItem
				:href="links.instance?.network"
				icon="NetworkOutline"
			>
				Network
			</TheUnitSidebarSectionItem>
			<TheUnitSidebarSectionItem
				:href="links.auditLog"
				icon="ClipboardTextSearchOutline"
			>
				Audit Log
			</TheUnitSidebarSectionItem>
			<TheUnitSidebarSectionItem :href="links.settings" icon="CogOutline">
				Settings
			</TheUnitSidebarSectionItem>
		</TheUnitSidebarSection>
	</nav>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import {
	INSTANCE_CONSOLE_ROUTE,
	INSTANCE_NETWORK_ROUTE,
	UNIT_AUDIT_LOG_ROUTE,
	UNIT_ROUTE,
	UNIT_SETTINGS_ROUTE
} from "@/features/units/routing/units.routes";
import { Unit } from "@/features/units/models/unit.model";
import VOverline from "@/features/shared/ui/components/design-system/typography/VOverline.vue";
import VLabel from "@/features/shared/ui/components/design-system/form/VLabel.vue";
import TheUnitSidebarSection from "@/features/units/ui/components/TheUnitSidebarSection.vue";
import TheUnitSidebarSectionItem from "@/features/units/ui/components/TheUnitSidebarSectionItem.vue";
import Avatar from "@/features/shared/ui/components/Avatar.vue";
import VIcon from "@/features/shared/ui/components/design-system/icon/VIcon.vue";
import TheUnitSidebarToggler from "@/features/units/ui/components/TheUnitSidebarToggler.vue";
import { isUndefined } from "@/utils";

@Component({
	components: {
		TheUnitSidebarToggler,
		VIcon,
		Avatar,
		TheUnitSidebarSectionItem,
		TheUnitSidebarSection,
		VLabel,
		VOverline
	}
})
export default class TheUnitSidebar extends Vue {
	@Inject()
	private readonly unit!: Unit;

	get links(): any {
		return Object.freeze({
			overview: { name: UNIT_ROUTE },
			auditLog: { name: UNIT_AUDIT_LOG_ROUTE },
			settings: { name: UNIT_SETTINGS_ROUTE },
			instance: !isUndefined(this.unit.instanceId)
				? {
						console: {
							name: INSTANCE_CONSOLE_ROUTE,
							params: {
								instanceId: this.unit.instanceId
							}
						},
						network: {
							name: INSTANCE_NETWORK_ROUTE,
							params: {
								instanceId: this.unit.instanceId
							}
						}
				  }
				: null
		});
	}

	onTogglerClick(): void {}
}
</script>

<style lang="scss" module>
.root {
	position: static;
	overflow-x: hidden;
	overflow-y: auto;
	height: 100%;
	flex-shrink: 0;
	width: 240px;
	background-color: var(--kt-background-surface);
	margin-right: 1.6rem;
}

.banner {
	width: 100%;
	height: 60px;
}

.header {
	display: flex;
	flex-direction: column;
	margin-top: 2.4rem;
}

.header__inner {
	display: flex;
	flex-direction: row;
	width: 100%;
}

.header__info {
	flex-grow: 1;
	align-self: center;
	user-select: none;
}

.header__info__name {
	font-size: 22px;
	color: var(--kt-content-primary);
	font-family: var(--kt-headline-font);
	font-weight: 700;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.header__label {
	font-size: 12px;
	font-weight: 500;
	color: var(--kt-content-neutral-low);
	margin-top: 0.4rem;
}

.header__logo {
	margin: 0 1.2rem;
	align-self: center;
	width: 40px;
	height: 40px;
}

.separator {
	display: block;
	width: 100%;
	height: 1px;
	background-color: var(--kt-border-low);
}
</style>
