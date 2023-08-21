import { Unit } from "@/features/units/api/models/unit.model";
import unitsService from "@/features/units/api/units.service";
import { AuditLog } from "@/features/units/api/models/audit-log.model";
import { UpdateUnitRequest } from "@/features/units/api/request/update-unit.request";

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
