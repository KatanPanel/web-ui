import { BlueprintResponse } from "@/features/blueprints/api/response/blueprint.response";
import httpService from "@/features/platform/api/http.service";
import { AxiosResponse } from "axios";
import { ReadBlueprintFileResponse } from "@/features/blueprints/api/response/read-blueprint-file.response";
import { ImportBlueprintResponse } from "@/features/blueprints/api/response/import-blueprint.response";

class BlueprintsGateway {
	async listBlueprints(): Promise<BlueprintResponse[]> {
		return httpService
			.get("blueprints")
			.then(
				(res: AxiosResponse) =>
					res.data.blueprints as BlueprintResponse[]
			);
	}

	async getBlueprint(id: string): Promise<BlueprintResponse> {
		return httpService
			.get(`blueprints/${id}`)
			.then((res: AxiosResponse) => res.data as BlueprintResponse);
	}

	async importBlueprint(url: string): Promise<ImportBlueprintResponse> {
		return httpService
			.post(`blueprints/import`, { url })
			.then((res: AxiosResponse) => res.data as ImportBlueprintResponse);
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

export default new BlueprintsGateway();
