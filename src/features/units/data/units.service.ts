import { Unit } from "@/features/units/models/unit.model";
import { ListUnitsResponse } from "@/features/units/data/response/list-units.response";
import { UnitResponse } from "@/features/units/data/response/unit.response";
import unitsGateway from "@/features/units/data/units.gateway";
import { UpdateUnitRequest } from "@/features/units/data/request/update-unit.request";

class UnitsService {
	async listUnits(): Promise<Unit[]> {
		return unitsGateway
			.listUnits()
			.then((response: ListUnitsResponse) =>
				response.units.map((value: UnitResponse) =>
					UnitsService.toDomain(value)
				)
			);
	}

	async getUnit(id: string): Promise<Unit> {
		return unitsGateway.getUnit(id).then((response: UnitResponse) => {
			return UnitsService.toDomain(response);
		});
	}

	async updateUnit(id: string, payload: UpdateUnitRequest): Promise<Unit> {
		return unitsGateway
			.updateUnit(id, payload)
			.then((response: UnitResponse) => {
				return UnitsService.toDomain(response);
			});
	}

	// TODO move to mapper
	private static toDomain(response: UnitResponse): Unit {
		return {
			id: response.id,
			name: response.name,
			instanceId: response["instance-id"],
			createdAt: new Date(response["created-at"]),
			updatedAt: new Date(response["updated-at"]),
			nodeId: response["node-id"]
		};
	}
}

export default new UnitsService();
