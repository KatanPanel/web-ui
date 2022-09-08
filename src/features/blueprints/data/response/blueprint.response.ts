import { RawBlueprintResponse } from "@/features/blueprints/data/response/raw-blueprint.response";

export type BlueprintResponse = {
	id: string;
	name: string;
	version: string;
	"image-id": string;
	"created-at": string;
	"updated-at"?: string;
	raw: RawBlueprintResponse;
};
