export type RawBlueprintResponse = {
	readonly name: string;
	readonly version: string;
	readonly type: string;
	readonly icon?: string;
	readonly remote: RawBlueprintRemoteResponse;
	readonly build: RawBlueprintBuildResponse;
	readonly instance?: RawBlueprintInstanceSettingsResponse;
};

export type RawBlueprintRemoteResponse = {
	readonly main: string;
	readonly origin: string;
};

export type RawBlueprintBuildResponse = {
	readonly image: string;
	readonly entrypoint: string;
	readonly env?: readonly (readonly [string, string])[];
};

export type RawBlueprintInstanceSettingsResponse = {
	readonly name?: string;
};
