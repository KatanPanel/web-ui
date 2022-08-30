export interface Instance {
	readonly id: string;
	readonly status: InstanceStatus;
	readonly containerId?: string;
	readonly updatePolicy: InstanceUpdatePolicy;
	readonly connection?: InstanceConnection;
	readonly runtime?: InstanceRuntime;
}

export interface InstanceRuntime {
	readonly exitCode: number;
	readonly startedAt?: Date;
	readonly finishedAt?: Date;
	readonly status: string;
	readonly oom: boolean;
	readonly pid: number;
	readonly platform: string;
	readonly mounts: InstanceMount[];
	readonly network: InstanceNetwork;
}

export interface InstanceNetwork {
	readonly hostname: string;
	readonly networks: InstanceNetworkConnection[];
}

export interface InstanceNetworkConnection {
	readonly id: string;
	readonly name: string;
}

export interface InstanceMount {
	readonly id: string;
	readonly readonly: boolean;
}

export type InstanceUpdatePolicy = "always" | "never";

export type InstanceStatus =
	| "created"
	| "network-assignment-failed"
	| "unavailable"
	| "unknown"
	| "image-pull"
	| "image-pull-needed"
	| "image-pull-failed"
	| "image-pull-complted"
	| "dead"
	| "paused"
	| "exited"
	| "running"
	| "stopped"
	| "starting"
	| "removing"
	| "stopping"
	| "restarting";

export interface InstanceConnection {
	readonly host: string;
	readonly port: number;
}

export interface InstanceFsFile {
	readonly name: string;
	readonly relativePath: string;
	readonly absolutePath: string;
	readonly size: number;
	readonly isDirectory: boolean;
	readonly isHidden: boolean;
	readonly createdAt?: Date;
	readonly modifiedAt?: Date;
}

export interface InstanceFsDirectory extends InstanceFsFile {
	readonly children: InstanceFsFile[];
}

export interface InstanceFsBucket {
	readonly path: string;
	readonly name: string;
	readonly isLocal: boolean;
	readonly createdAt?: Date;
}
