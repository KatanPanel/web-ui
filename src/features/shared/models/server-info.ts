export interface ServerInfo {
	readonly nodeId: number;
	readonly version: string;
	readonly clusterMode: boolean;
	readonly defaultNetwork: ServerDefaultNetwork;
	readonly build: ServerBuildInfo;
}

export interface ServerBuildInfo {
	readonly commit: string;
	readonly message: string;
	readonly time: string;
	readonly branch: string;
	readonly remote: string;
}

export interface ServerDefaultNetwork {
	readonly name: string;
	readonly driver: string;
}
