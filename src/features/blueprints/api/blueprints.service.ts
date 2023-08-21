import { Blueprint } from "@/features/blueprints/api/blueprint.model";
import blueprintsGateway from "@/features/blueprints/api/blueprints.gateway";
import { BlueprintResponse } from "@/features/blueprints/api/response/blueprint.response";
import blueprintsMapper from "@/features/blueprints/api/mapper/blueprints.mapper";
import { ReadBlueprintFileResponse } from "@/features/blueprints/api/response/read-blueprint-file.response";
import httpService from "@/features/platform/api/http.service";
import { AxiosResponse } from "axios";
import { ImportBlueprintResponse } from "@/features/blueprints/api/response/import-blueprint.response";

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

	async importBlueprint(url: string): Promise<ImportBlueprintResponse> {
		return blueprintsGateway.importBlueprint(url);
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
