import {
	InstanceConnectionResponse,
	InstanceFsBucketResponse,
	InstanceFsFileResponse,
	InstanceFsSingleFileResponse,
	InstanceResponse,
	InstanceRuntimeResponse
} from "@/features/units/api/response/instance.response";
import {
	Instance,
	InstanceConnection,
	InstanceFsBucket,
	InstanceFsDirectory,
	InstanceFsFile,
	InstanceMount,
	InstanceNetworkConnection,
	InstanceRuntime,
	InstanceStatus,
	InstanceUpdatePolicy
} from "@/features/units/api/models/instance.model";
import { isUndefined, undefinedOr } from "@/utils";

export default {
	toBucket(response: InstanceFsBucketResponse): InstanceFsBucket {
		return {
			name: response.name,
			path: response.path,
			isLocal: response["is-local"],
			createdAt: undefinedOr(
				response["created-at"],
				(value) => new Date(value)
			)
		};
	},
	toFile(response: InstanceFsFileResponse): InstanceFsFile {
		const file = this.toSingleFile(response.file);
		if (isUndefined(response.children)) {
			return file;
		}

		return {
			...file,
			children: response.children.map((child) => this.toSingleFile(child))
		} as InstanceFsDirectory;
	},
	toSingleFile(response: InstanceFsSingleFileResponse): InstanceFsFile {
		return {
			name: response.name,
			relativePath: response["relative-path"],
			absolutePath: response["absolute-path"],
			size: response.size,
			isDirectory: response["is-directory"],
			isHidden: response["is-hidden"],
			createdAt: undefinedOr(
				response["created-at"],
				(value) => new Date(value)
			),
			modifiedAt: undefinedOr(
				response["updated-at"],
				(value) => new Date(value)
			)
		};
	},
	toInstance(response: InstanceResponse): Instance {
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
						exitCode: runtime["exit-code"],
						mounts: runtime.mounts.map((mount) => {
							return {
								id: mount.target,
								readonly: mount.readonly
							} as InstanceMount;
						}),
						network: {
							hostname: runtime.network.hostname,
							networks: runtime.network.networks.map(
								(network) => {
									return {
										id: network.id,
										name: network.name
									} as InstanceNetworkConnection;
								}
							)
						}
					} as InstanceRuntime;
				}
			)
		};
	}
};
