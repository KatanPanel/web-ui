import { BlueprintResponse } from "@/features/blueprints/data/response/blueprint.response";
import { Blueprint } from "@/features/blueprints/models/blueprint.model";
import {
	RawBlueprint,
	RawBlueprintInstanceSettings,
	RawBlueprintType
} from "@/features/blueprints/models/raw-blueprint.model";
import { undefinedOr } from "@/utils";
import { RawBlueprintResponse } from "@/features/blueprints/data/response/raw-blueprint.response";

export default {
	toBlueprint(response: BlueprintResponse): Blueprint {
		return {
			id: response.id,
			name: response.name,
			image: response.image,
			createdAt: new Date(response["created-at"])
		};
	},
	toRawBlueprint(response: RawBlueprintResponse): RawBlueprint {
		return {
			name: response.name,
			version: response.version,
			type: response.type as RawBlueprintType,
			icon: response.icon,
			remote: {
				main: response.remote.main,
				origin: response.remote.origin
			},
			build: {
				image: response.build.image,
				entrypoint: response.build.entrypoint,
				env: undefinedOr(response.build.env, (env) => {
					return new Map(env);
				})
			},
			instance: undefinedOr(response.instance, (settings) => {
				return {
					name: settings.name
				} as RawBlueprintInstanceSettings;
			})
		};
	}
};
