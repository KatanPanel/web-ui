import httpService from "@/features/shared/data/http.service";
import { AxiosResponse } from "axios";
import { ListUnitsResponse } from "@/features/units/data/response/list-units.response";
import { UnitResponse } from "@/features/units/data/response/unit.response";
import { UpdateUnitRequest } from "@/features/units/data/request/update-unit.request";

class UnitsGateway {
	async listUnits(): Promise<ListUnitsResponse> {
		return httpService
			.get("units")
			.then((res: AxiosResponse) => res.data as ListUnitsResponse);
	}

	async getUnit(id: string): Promise<UnitResponse> {
		return httpService
			.get(`units/${id}`)
			.then((res: AxiosResponse) => res.data as UnitResponse);
	}

	async updateUnit(
		id: string,
		payload: UpdateUnitRequest
	): Promise<UnitResponse> {
		return httpService
			.patch(`units/${id}`, payload)
			.then((res: AxiosResponse) => res.data as UnitResponse);
	}
}

export default new UnitsGateway();
