import { Unit } from "@/features/units/models/unit.model";
import unitsService from "@/features/units/data/units.service";
import { getModule } from "vuex-module-decorators";
import UnitStore from "@/features/units/store/unit.store";
import { isNull } from "@/utils";
import { AuditLog } from "@/features/units/models/audit-log.model";
import { UpdateUnitRequest } from "@/features/units/data/request/update-unit.request";

class UnitsPresenter {
	get getCurrentUnit(): Unit | null {
		return getModule(UnitStore).getUnit;
	}

	get getCurrentUnitOrThrow(): Unit {
		const curr = this.getCurrentUnit;
		if (isNull(curr)) throw new Error("Current unit cannot be null");

		return curr;
	}

	async getAndSaveUnit(id: string): Promise<Unit> {
		return unitsService.getUnit(id).then((unit) => {
			getModule(UnitStore).updateUnit({ unit });
			return unit;
		});
	}

	async updateUnit(id: string, payload: UpdateUnitRequest): Promise<Unit> {
		return unitsService.updateUnit(id, payload).then((unit) => {
			getModule(UnitStore).updateUnit({ unit });
			return unit;
		});
	}

	async getAuditLog(unitId: string): Promise<AuditLog> {
		return unitsService.getAuditLogs(unitId);
	}
}

export default new UnitsPresenter();
