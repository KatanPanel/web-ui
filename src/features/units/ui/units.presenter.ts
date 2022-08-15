import { Unit } from "@/features/units/models/unit.model";
import unitsService from "@/features/units/data/units.service";
import { UpdateUnitRequest } from "@/features/units/data/request/update-unit.request";

class UnitsPresenter {
	async getUnit(id: string): Promise<Unit> {
		return unitsService.getUnit(id);
	}

	async updateUnit(id: string, data: UpdateUnitRequest): Promise<Unit> {
		return unitsService.updateUnit(id, data);
	}
}

export default new UnitsPresenter();
