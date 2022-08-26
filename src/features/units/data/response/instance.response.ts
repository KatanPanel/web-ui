export type InstanceResponse = {
	id: string;
	status: string;
	"container-id"?: string;
	"update-policy": string;
	connection?: InstanceConnectionResponse;
	runtime?: InstanceRuntimeResponse;
};

export type InstanceConnectionResponse = {
	host: string;
	port: number;
};

export type InstanceRuntimeResponse = {
	oom: boolean;
	pid: number;
	"exit-code": number;
	platform: string;
	"started-at": string;
	"finished-at": string;
	status: string;
	mounts: InstanceMountResponse[];
};

export type InstanceMountResponse = {
	type: string;
	readonly: boolean;
	dest: boolean;
	target: string;
};
