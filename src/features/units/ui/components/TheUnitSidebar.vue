<template>
	<nav v-if="unit" :class="$style.root" role="navigation">
		<TheUnitSidebarHeader />
		<template v-for="link in createLinks()" :key="link.key">
			<TheUnitSidebarSectionItem
				v-if="link.link"
				:href="link.link"
				:icon="link.icon"
			>
				<span v-t="translationShortcutLink(link.translationTextKey)" />
			</TheUnitSidebarSectionItem>
			<TheUnitSidebarSection
				v-else-if="link.children"
				:disabled="!link.enabled"
				:label="translationShortcutLabel(link.label)"
			>
				<TheUnitSidebarSectionItem
					v-for="child in link.children"
					:disabled="child.disabled"
					:key="child.link.name"
					:href="child.link"
					:icon="child.icon"
				>
					<span
						v-t="translationShortcutLink(child.translationTextKey)"
					/>
				</TheUnitSidebarSectionItem>
			</TheUnitSidebarSection>
		</template>
	</nav>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import {
	INSTANCE_CONSOLE_ROUTE,
	INSTANCE_FS_ROUTE,
	INSTANCE_NETWORK_ROUTE,
	UNIT_AUDIT_LOG_ROUTE,
	UNIT_OVERVIEW_ROUTE,
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
import { RouteLocationRaw } from "vue-router";
import TheUnitSidebarHeader from "@/features/units/ui/components/TheUnitSidebarHeader.vue";

type Section = {
	label: string;
	children: SectionItem[];
	enabled: boolean;
	key: string;
};

type SectionItem = {
	translationTextKey: string;
	icon: string;
	link: RouteLocationRaw;
	disabled?: boolean;
};

type Sections = (Section | SectionItem)[];

@Component({
	components: {
		TheUnitSidebarHeader,
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

	createLinks(): Sections {
		return [
			{
				translationTextKey: "overview",
				icon: "HomeVariantOutline",
				link: { name: UNIT_OVERVIEW_ROUTE }
			},
			{
				label: "instance",
				enabled: !isUndefined(this.unit.instanceId),
				key: "instance",
				children: [
					{
						icon: "ConsoleLine",
						translationTextKey: "console",
						link: this.createInstanceRoute({
							name: INSTANCE_CONSOLE_ROUTE
						})
					},
					{
						icon: "FolderOutline",
						translationTextKey: "files",
						link: this.createInstanceRoute({
							name: INSTANCE_FS_ROUTE
						})
					},
					{
						icon: "Lan",
						translationTextKey: "network",
						link: this.createInstanceRoute({
							name: INSTANCE_NETWORK_ROUTE
						})
					}
				]
			},
			{
				label: "advanced",
				key: "advanced",
				enabled: true,
				children: [
					{
						translationTextKey: "auditlog",
						icon: "ClipboardTextSearchOutline",
						link: { name: UNIT_AUDIT_LOG_ROUTE }
					},
					{
						translationTextKey: "settings",
						icon: "CogOutline",
						link: { name: UNIT_SETTINGS_ROUTE }
					}
				]
			}
		];
	}

	translationShortcutLabel(value: string): string {
		return this.$t(`units.sidebar.label.${value}`);
	}

	translationShortcutLink(value: string): string {
		return this.$t(`units.sidebar.links.${value}`);
	}

	private createInstanceRoute(
		location: Partial<RouteLocationRaw>
	): RouteLocationRaw {
		return Object.assign(location, {
			params: { instanceId: this.unit.instanceId }
		});
	}
}
</script>

<style lang="scss" module>
.root {
	position: static;
	overflow-x: hidden;
	overflow-y: auto;
	height: 100%;
	flex-shrink: 0;
	width: 260px;
	background-color: var(--kt-background-surface);
}

.banner {
	width: 100%;
	height: 60px;
}
</style>
