import { Unit } from "@/domain/models/unit/unit.model";
import { ListUnitsResponse } from "@/data/response/list-units.response";
import { UnitResponse } from "@/data/response/unit.response";
import unitsGateway from "@/data/gateway/units.gateway";

class UnitsService {
	async listUnits(): Promise<Unit[]> {
		return unitsGateway.listUnits().then((response: ListUnitsResponse) => {
			return response.units.map((value: UnitResponse) => {
				return {
					id: value.id,
					name: value.name,
					instanceId: value["instance-id"],
					createdAt: new Date(value["created-at"]),
					updatedAt: new Date(value["updated-at"]),
					nodeId: value["node-id"]
				} as Unit;
			});
		});
	}
}

export default new UnitsService();
