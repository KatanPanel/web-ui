import { RouteRecordRaw } from "vue-router";
import { importView } from "@/router";

const FEATURE_NAME = "units";

export const CREATE_UNIT = "units.create";
export const UNIT_OVERVIEW_ROUTE = "units.overview";
export const UNIT_AUDIT_LOG_ROUTE = "units.audit-log";
export const UNIT_SETTINGS_ROUTE = "units.settings";
export const INSTANCE_ROUTE = "instances";
export const INSTANCE_CONSOLE_ROUTE = "instances.console";
export const INSTANCE_RESOURCES_ROUTE = "instances.resources";
export const INSTANCE_NETWORK_ROUTE = "instances.network";
export const INSTANCE_FS_ROUTE = "instances.fs";
export const INSTANCE_FS_BUCKET_ROUTE = "instances.fs.buckets";

export const UnitsRoute: Array<RouteRecordRaw> = [
	{
		path: "/create",
		name: CREATE_UNIT,
		component: importView(FEATURE_NAME, "create/CreateUnit")
	},
	{
		path: "/units/:unitId",
		component: importView(FEATURE_NAME, "Unit"),
		children: [
			{
				path: "",
				name: UNIT_OVERVIEW_ROUTE,
				component: importView(FEATURE_NAME, "UnitOverview")
			},
			{
				path: "auditlog",
				name: UNIT_AUDIT_LOG_ROUTE,
				component: importView(FEATURE_NAME, "audit-log/UnitAuditLog")
			},
			{
				path: "settings",
				name: UNIT_SETTINGS_ROUTE,
				component: importView(FEATURE_NAME, "settings/UnitSettings")
			},
			{
				path: "instances/:instanceId",
				name: INSTANCE_ROUTE,
				component: importView(FEATURE_NAME, "instances/Instance"),
				children: [
					{
						path: "resources",
						name: INSTANCE_RESOURCES_ROUTE,
						component: importView(
							FEATURE_NAME,
							"instances/resource-monitor/InstanceResourceMonitor"
						)
					},
					{
						path: "console",
						name: INSTANCE_CONSOLE_ROUTE,
						component: importView(
							FEATURE_NAME,
							"instances/console/InstanceConsole"
						)
					},
					{
						path: "network",
						name: INSTANCE_NETWORK_ROUTE,
						component: importView(
							FEATURE_NAME,
							"instances/network/InstanceNetwork"
						)
					},
					{
						path: "fs",
						component: importView(
							FEATURE_NAME,
							"instances/fs/InstanceFs"
						),
						children: [
							{
								path: "",
								name: INSTANCE_FS_ROUTE,
								component: importView(
									FEATURE_NAME,
									"instances/fs/InstanceFsBucketList"
								)
							},
							{
								path: ":bucketId",
								name: INSTANCE_FS_BUCKET_ROUTE,
								component: importView(
									FEATURE_NAME,
									"instances/fs/buckets/InstanceFsBucket"
								)
							}
						]
					}
				]
			}
		]
	}
];
