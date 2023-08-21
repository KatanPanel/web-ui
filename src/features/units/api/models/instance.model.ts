export type Instance = {
	id: string;
	status: InstanceStatus;
	containerId?: string;
	updatePolicy: InstanceUpdatePolicy;
	connection?: InstanceConnection;
	runtime?: InstanceRuntime;
};

export type InstanceRuntime = {
	exitCode: number;
	startedAt?: Date;
	finishedAt?: Date;
	status: string;
	oom: boolean;
	pid: number;
	platform: string;
	mounts: InstanceMount[];
	network: InstanceNetwork;
};

export interface InstanceNetwork {
	hostname: string;
	networks: InstanceNetworkConnection[];
}

export type InstanceNetworkConnection = {
	id: string;
	name: string;
};

export type InstanceMount = {
	id: string;
	readonly: boolean;
};

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

export type InstanceConnection = {
	host: string;
	port: number;
};

export type InstanceFile = {
	name: string;
	relativePath: string;
	absolutePath: string;
	size: number;
	isDirectory: boolean;
	isHidden: boolean;
	createdAt?: Date;
	modifiedAt?: Date;
};

export type InstanceDirectory = {
	children: InstanceFile[];
} & InstanceFile;

export type InstanceBucket = {
	path: string;
	name: string;
	isLocal: boolean;
	createdAt?: Date;
};

export type InstanceStatusUpdateCode = 0 | 1 | 2;
