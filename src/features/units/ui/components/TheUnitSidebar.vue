<template>
	<nav :class="$style.root" role="navigation">
		<TheUnitSidebarHeader @status-update="onStatusUpdate" />
		<TheUnitSidebarStatus />
		<div :class="$style.menu">
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
					<template v-else>
						{{ link.text }}
					</template>
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
							v-t="
								translationShortcutLink(
									child.translationTextKey
								)
							"
						/>
						<template v-else>
							{{ child.text }}
						</template>
					</TheUnitSidebarSectionItem>
				</TheUnitSidebarSection>
			</template>
		</div>
	</nav>
</template>

<script lang="ts">
import { Component, Emit, Inject, Vue } from "vue-facing-decorator";
import {
	INSTANCE_CONSOLE_ROUTE,
	INSTANCE_FS_ROUTE,
	INSTANCE_NETWORK_ROUTE,
	INSTANCE_RESOURCES_ROUTE,
	UNIT_AUDIT_LOG_ROUTE,
	UNIT_OVERVIEW_ROUTE,
	UNIT_SETTINGS_ROUTE
} from "@/features/units/units.routes";
import { Unit } from "@/features/units/api/models/unit.model";
import VOverline from "@/features/platform/ui/components/typography/VOverline.vue";
import VLabel from "@/features/platform/ui/components/form/VLabel.vue";
import TheUnitSidebarSection from "@/features/units/ui/components/TheUnitSidebarSection.vue";
import TheUnitSidebarSectionItem from "@/features/units/ui/components/TheUnitSidebarSectionItem.vue";
import Avatar from "@/features/platform/ui/components/Avatar.vue";
import VIcon from "@/features/platform/ui/components/icon/VIcon.vue";
import { isUndefined } from "@/utils";
import { RouteLocationRaw } from "vue-router";
import TheUnitSidebarHeader from "@/features/units/ui/components/TheUnitSidebarHeader.vue";
import TheUnitSidebarStatus from "@/features/units/ui/components/TheUnitSidebarStatus.vue";
import { InstanceStatusUpdateCode } from "@/features/units/api/models/instance.model";

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
	emits: ["status-update"],
	components: {
		TheUnitSidebarHeader,
		VIcon,
		Avatar,
		TheUnitSidebarSectionItem,
		TheUnitSidebarSection,
		TheUnitSidebarStatus,
		VLabel,
		VOverline
	}
})
export default class TheUnitSidebar extends Vue {
	@Inject()
	readonly unit!: Unit;

	@Emit("status-update")
	onStatusUpdate(status: InstanceStatusUpdateCode): InstanceStatusUpdateCode {
		return status;
	}

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
						icon: "Console",
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
						icon: "ChartMultiline",
						translationTextKey: "resources",
						link: this.createInstanceRoute({
							name: INSTANCE_RESOURCES_ROUTE
						})
					},
					{
						icon: "NetworkStrength4Cog",
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
	flex-grow: 0;
	flex-basis: 320px;
	padding: 0 24px;
}

.menu {
	background-color: var(--kt-background-surface);
	border-radius: 8px;
	padding: 1.6rem 0.8rem;
}
</style>
