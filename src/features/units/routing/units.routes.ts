import { RouteRecordRaw } from "vue-router";
import { importView } from "@/router";
import UnitsLayout from "@/features/units/ui/layouts/UnitsLayout.vue";

const FEATURE_NAME = "units";

export const UNIT_ROUTE = "unit.overview";
export const UNIT_AUDIT_LOG_ROUTE = "unit.audit-log";
export const UNIT_SETTINGS_ROUTE = "unit.settings";
export const INSTANCE_ROUTE = "instances";
export const INSTANCE_CONSOLE_ROUTE = "instances.console";
export const INSTANCE_NETWORK_ROUTE = "instances.network";
export const INSTANCE_FS_ROUTE = "instances.fs";
export const INSTANCE_FS_BUCKET_ROUTE = "instances.fs.buckets";

export const UnitsRoute: Array<RouteRecordRaw> = [
	{
		path: "/units/:unitId",
		component: importView(FEATURE_NAME, "UnitView"),
		meta: {
			layout: UnitsLayout
		},
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
							"instances/console/InstanceConsoleView"
						)
					},
					{
						path: "network",
						name: INSTANCE_NETWORK_ROUTE,
						component: importView(
							FEATURE_NAME,
							"instances/network/InstanceNetworkView"
						)
					},
					{
						path: "fs",
						component: importView(
							FEATURE_NAME,
							"instances/fs/InstanceFsView"
						),
						children: [
							{
								path: "",
								name: INSTANCE_FS_ROUTE,
								component: importView(
									FEATURE_NAME,
									"instances/fs/InstanceFsBucketListView"
								)
							},
							{
								path: ":bucketId",
								name: INSTANCE_FS_BUCKET_ROUTE,
								component: importView(
									FEATURE_NAME,
									"instances/fs/buckets/InstanceFsBucketView"
								)
							}
						]
					}
				]
			}
		]
	}
];
