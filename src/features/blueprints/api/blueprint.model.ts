import { RawBlueprint } from "@/features/blueprints/api/raw-blueprint.model";

export interface Blueprint {
	readonly id: string;
	readonly name: string;
	readonly version: string;
	readonly imageId: string;
	readonly createdAt: Date;
	readonly updatedAt?: Date;
	readonly raw: RawBlueprint;
}
