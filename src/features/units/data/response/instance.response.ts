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

export type InstanceFsSingleFileResponse = {
	name: string;
	"relative-path": string;
	"absolute-path": string;
	size: number;
	"is-directory": boolean;
	"is-hidden": boolean;
	"created-at"?: string;
	"modified-at"?: string;
};

export type InstanceFsFileResponse = {
	file: InstanceFsSingleFileResponse;
	children?: InstanceFsSingleFileResponse[];
};

export type InstanceFsBucketResponse = {
	path: string;
	name: string;
	"is-local": boolean;
	"created-at"?: string;
};
