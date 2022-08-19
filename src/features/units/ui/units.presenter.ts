import { Unit } from "@/features/units/models/unit.model";
import unitsService from "@/features/units/data/units.service";
import { AuditLog } from "@/features/units/models/audit-log.model";
import { UpdateUnitRequest } from "@/features/units/data/request/update-unit.request";

class UnitsPresenter {
	async getUnit(id: string): Promise<Unit> {
		return unitsService.getUnit(id);
	}

	async updateUnit(id: string, payload: UpdateUnitRequest): Promise<Unit> {
		return unitsService.updateUnit(id, payload);
	}

	async getAuditLog(unitId: string): Promise<AuditLog> {
		return unitsService.getAuditLogs(unitId);
	}
}

export default new UnitsPresenter();
