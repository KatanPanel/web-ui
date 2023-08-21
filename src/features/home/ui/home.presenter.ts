import { Unit } from "@/features/units/api/models/unit.model";
import unitsService from "@/features/units/api/units.service";

class HomePresenter {
	async listUnits(): Promise<Unit[]> {
		return unitsService.listUnits();
	}
}

export default new HomePresenter();
