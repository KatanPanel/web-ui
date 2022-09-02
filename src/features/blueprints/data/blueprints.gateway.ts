import { BlueprintResponse } from "@/features/blueprints/data/response/blueprint.response";
import httpService from "@/features/shared/data/http.service";
import { AxiosResponse } from "axios";

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
}

export default new BlueprintsGateway();
