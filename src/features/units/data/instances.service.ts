import {
	Instance,
	InstanceConnection,
	InstanceMount,
	InstanceRuntime,
	InstanceStatus,
	InstanceUpdatePolicy
} from "@/features/units/models/instance.model";
import {
	InstanceConnectionResponse,
	InstanceResponse,
	InstanceRuntimeResponse
} from "@/features/units/data/response/instance.response";
import instancesGateway from "@/features/units/data/instances.gateway";
import { undefinedOr } from "@/utils";

class InstancesService {
	async getInstance(id: string): Promise<Instance> {
		return instancesGateway
			.getInstance(id)
			.then((response: InstanceResponse) => {
				return InstancesService.toInstanceDomain(response);
			});
	}

	async getBucketFiles(
		instanceId: string,
		bucket: string,
		path: string
	): Promise<unknown> {
		return instancesGateway.listInstanceFiles(instanceId, bucket, path);
	}

	private static toInstanceDomain(response: InstanceResponse): Instance {
		return {
			id: response.id,
			status: response.status as InstanceStatus,
			containerId: response["container-id"],
			updatePolicy: response["update-policy"] as InstanceUpdatePolicy,
			connection: undefinedOr<
				InstanceConnectionResponse,
				InstanceConnection
			>(response.connection, (connection) => {
				return {
					host: connection.host,
					port: connection.port
				} as InstanceConnection;
			}),
			runtime: undefinedOr<InstanceRuntimeResponse, InstanceRuntime>(
				response.runtime,
				(runtime) => {
					return {
						startedAt: new Date(runtime["started-at"]),
						finishedAt: new Date(runtime["finished-at"]),
						status: runtime.status,
						oom: runtime.oom,
						pid: runtime.pid,
						platform: runtime.platform,
						mounts: runtime.mounts.map((mount) => {
							return {
								id: mount.target,
								readonly: mount.readonly
							} as InstanceMount;
						}),
						exitCode: runtime["exit-code"]
					} as InstanceRuntime;
				}
			)
		};
	}
}

export default new InstancesService();
