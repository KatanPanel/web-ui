<template>
	<nav v-if="unit" :class="$style.root" role="navigation">
		<TheUnitSidebarHeader />
		<template v-for="link in createLinks()" :key="link.key">
			<TheUnitSidebarSectionItem
				v-if="link.link"
				:href="link.link"
				:icon="link.icon"
			>
				<span
					v-if="link.translationTextKey"
					v-t="translationShortcutLink(link.translationTextKey)"
				/>
				<template v-else>{{ link.text }}</template>
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
						v-if="child.translationTextKey"
						v-t="translationShortcutLink(child.translationTextKey)"
					/>
					<template v-else>{{ child.text }}</template>
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
	text?: string;
	translationTextKey?: string;
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
	readonly unit!: Unit;

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
				label: "services",
				key: "services",
				enabled: true,
				children: [
					{
						text: "Redis",
						icon: "https://cdn4.iconfinder.com/data/icons/redis-2/1451/Untitled-2-512.png",
						link: { name: UNIT_AUDIT_LOG_ROUTE }
					},
					{
						text: "MySQL",
						icon: "https://camo.githubusercontent.com/f85f882cb31eeaeee657ec955313015c30378e8f56c3dc2f06933b617a276cfd/68747470733a2f2f77372e706e6777696e672e636f6d2f706e67732f3734372f3739382f706e672d7472616e73706172656e742d6d7973716c2d6c6f676f2d6d7973716c2d64617461626173652d7765622d646576656c6f706d656e742d636f6d70757465722d736f6674776172652d646f6c7068696e2d6d6172696e652d6d616d6d616c2d616e696d616c732d746578742d7468756d626e61696c2e706e67",
						link: { name: UNIT_AUDIT_LOG_ROUTE }
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
