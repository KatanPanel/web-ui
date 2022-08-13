import { Unit } from "@/features/units/models/unit.model";
import unitsService from "@/features/units/data/units.service";

class HomePresenter {
	async listUnits(): Promise<Unit[]> {
		return unitsService.listUnits();
	}
}

export default new HomePresenter();
