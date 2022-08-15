import { RouteRecordRaw } from "vue-router";
import { importView } from "@/router";
import { AuthenticatedOnlyGuard } from "@/features/auth/routing/authenticated-only.guard";

const FEATURE_NAME = "units";

export const UNIT_ROUTE = "unit.overview";
export const UNIT_AUDIT_LOG_ROUTE = "unit.audit-log";
export const UNIT_SETTINGS_ROUTE = "unit.settings";
export const INSTANCE_ROUTE = "instances";
export const INSTANCE_CONSOLE_ROUTE = "instances.console";

export const UnitsRoute: Array<RouteRecordRaw> = [
	{
		path: "/units/:unitId",
		component: importView(FEATURE_NAME, "UnitView"),
		beforeEnter: AuthenticatedOnlyGuard,
		children: [
			{
				path: "",
				name: UNIT_ROUTE,
				component: importView(FEATURE_NAME, "UnitOverviewView")
			},
			{
				path: "auditlog",
				name: UNIT_AUDIT_LOG_ROUTE,
				component: importView(
					FEATURE_NAME,
					"audit-log/UnitAuditLogView"
				)
			},
			{
				path: "settings",
				name: UNIT_SETTINGS_ROUTE,
				component: importView(FEATURE_NAME, "settings/UnitSettingsView")
			},
			{
				path: "instances/:instanceId",
				name: INSTANCE_ROUTE,
				component: importView(FEATURE_NAME, "instances/InstanceView"),
				children: [
					{
						path: "console",
						name: INSTANCE_CONSOLE_ROUTE,
						component: importView(
							FEATURE_NAME,
							"instances/InstanceConsoleView"
						)
					}
				]
			}
		]
	}
];
