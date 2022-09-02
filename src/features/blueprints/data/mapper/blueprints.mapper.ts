import { BlueprintResponse } from "@/features/blueprints/data/response/blueprint.response";
import { Blueprint } from "@/features/blueprints/models/blueprint.model";

export default {
	toBlueprint(response: BlueprintResponse): Blueprint {
		return {
			id: response.id,
			name: response.name,
			image: response.image,
			createdAt: new Date(response["created-at"])
		};
	}
};
