import { Unit } from "@/features/units/models/unit.model";
import unitsService from "@/features/units/data/units.service";
import { getModule } from "vuex-module-decorators";
import UnitsStore from "@/features/units/store/units.store";
import { isNull } from "@/utils";

class UnitsPresenter {
	get getCurrentUnit(): Unit | null {
		return getModule(UnitsStore).getUnit;
	}

	get getCurrentUnitOrThrow(): Unit {
		const curr = this.getCurrentUnit;
		if (isNull(curr)) throw new Error("Current unit cannot be null");

		return curr;
	}

	async getAndSaveUnit(id: string): Promise<Unit> {
		return unitsService.getUnit(id).then((unit) => {
			getModule(UnitsStore).updateUnit({ unit });
			return unit;
		});
	}
}

export default new UnitsPresenter();
