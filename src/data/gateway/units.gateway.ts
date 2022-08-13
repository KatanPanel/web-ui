import httpService from "@/data/services/http.service";
import { AxiosResponse } from "axios";
import { ListUnitsResponse } from "@/data/response/list-units.response";

class UnitsGateway {
	async listUnits(): Promise<ListUnitsResponse> {
		return httpService
			.get("units")
			.then((res: AxiosResponse) => res.data as ListUnitsResponse);
	}
}

export default new UnitsGateway();
