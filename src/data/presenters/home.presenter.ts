import { Unit } from "@/domain/models/unit/unit.model";
import unitsService from "@/data/services/units/units.service";

class HomePresenter {
	async listUnits(): Promise<Unit[]> {
		return unitsService.listUnits();
	}
}

export default new HomePresenter();
