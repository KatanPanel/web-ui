import { RawBlueprintResponse } from "@/features/blueprints/data/response/raw-blueprint.response";

export type ImportBlueprintResponse = {
	readonly id: string;
	readonly main: string;
	readonly assets: string[];
	readonly raw: RawBlueprintResponse;
};
