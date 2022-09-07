import { Blueprint } from "@/features/blueprints/models/blueprint.model";
import blueprintsGateway from "@/features/blueprints/data/blueprints.gateway";
import { BlueprintResponse } from "@/features/blueprints/data/response/blueprint.response";
import blueprintsMapper from "@/features/blueprints/data/mapper/blueprints.mapper";
import { RawBlueprint } from "@/features/blueprints/models/raw-blueprint.model";
import { ReadBlueprintFileResponse } from "@/features/blueprints/data/response/read-blueprint-file.response";
import httpService from "@/features/shared/data/http.service";
import { AxiosResponse } from "axios";
import { RawBlueprintResponse } from "@/features/blueprints/data/response/raw-blueprint.response";

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

	async importBlueprint(url: string): Promise<RawBlueprint> {
		return blueprintsGateway
			.importBlueprint(url)
			.then((res: RawBlueprintResponse) =>
				blueprintsMapper.toRawBlueprint(res)
			);
	}

	async readBlueprintFile(
		id: string,
		path: string
	): Promise<ReadBlueprintFileResponse> {
		return httpService
			.get(`blueprints/${id}/contents`, {
				params: { path }
			})
			.then(
				(res: AxiosResponse) => res.data as ReadBlueprintFileResponse
			);
	}
}

export default new BlueprintsService();
