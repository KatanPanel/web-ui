import { InstanceFsFileResponse } from "@/features/units/api/response/instance.response";

export type ReadBlueprintFileResponse = {
	readonly file: InstanceFsFileResponse;
	readonly type: string;
	readonly data: ArrayBuffer;
};
