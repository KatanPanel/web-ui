import { InstanceFsFileResponse } from "@/features/units/data/response/instance.response";

export type ReadBlueprintFileResponse = {
	readonly file: InstanceFsFileResponse;
	readonly type: string;
	readonly data: ArrayBuffer;
};
