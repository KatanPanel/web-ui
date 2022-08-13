import { Unit } from "@/features/units/models/unit.model";
import { ListUnitsResponse } from "@/features/units/data/response/list-units.response";
import { UnitResponse } from "@/features/units/data/response/unit.response";
import unitsGateway from "@/features/units/data/units.gateway";

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
