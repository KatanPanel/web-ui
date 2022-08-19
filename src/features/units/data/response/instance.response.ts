export type InstanceResponse = {
	id: string;
	status: string;
	"container-id"?: string;
	"update-policy": string;
	connection?: InstanceConnectionResponse;
};

export type InstanceConnectionResponse = {
	host: string;
	port: number;
};
