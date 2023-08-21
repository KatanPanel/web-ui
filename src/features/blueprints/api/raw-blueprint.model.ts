export type RawBlueprint = {
	readonly name: string;
	readonly version: string;
	readonly icon?: string;
	readonly type: RawBlueprintType;
	readonly remote: RawBlueprintRemote;
	readonly build: RawBlueprintBuild;
	readonly instance?: RawBlueprintInstanceSettings;
};

export const RawBlueprintTypeGame = "game";
export const RawBlueprintTypeService = "service";

export type RawBlueprintType =
	| typeof RawBlueprintTypeGame
	| typeof RawBlueprintTypeService;

export type RawBlueprintRemote = {
	readonly main: string;
	readonly origin: string;
};

export type RawBlueprintBuild = {
	readonly image: string;
	readonly entrypoint: string;
	readonly env?: ReadonlyMap<string, string>;
};

export type RawBlueprintInstanceSettings = {
	readonly name?: string;
};
