import { Blueprint } from "@/features/blueprints/models/blueprint.model";
import blueprintsGateway from "@/features/blueprints/data/blueprints.gateway";
import { BlueprintResponse } from "@/features/blueprints/data/response/blueprint.response";
import blueprintsMapper from "@/features/blueprints/data/mapper/blueprints.mapper";

class BlueprintsService {
	async listBlueprints(): Promise<Blueprint[]> {
		return blueprintsGateway
			.listBlueprints()
			.then((res: BlueprintResponse[]) =>
				res.map((value) => blueprintsMapper.toBlueprint(value))
			);
	}

	async getBlueprint(id: string): Promise<Blueprint> {
		return blueprintsGateway
			.getBlueprint(id)
			.then((res: BlueprintResponse) =>
				blueprintsMapper.toBlueprint(res)
			);
	}
}

export default new BlueprintsService();
