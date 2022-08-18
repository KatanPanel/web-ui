import { Unit } from "@/features/units/models/unit.model";
import { ListUnitsResponse } from "@/features/units/data/response/list-units.response";
import { UnitResponse } from "@/features/units/data/response/unit.response";
import unitsGateway from "@/features/units/data/units.gateway";
import { UpdateUnitRequest } from "@/features/units/data/request/update-unit.request";
import {
	AuditLog,
	AuditLogEntry,
	AuditLogEntryChange
} from "@/features/units/models/audit-log.model";
import {
	AuditLogEntryChangeResponse,
	AuditLogEntryResponse,
	AuditLogResponse
} from "@/features/units/data/response/audit-log.response";

// TODO move mappings to mapper
class UnitsService {
	async listUnits(): Promise<Unit[]> {
		return unitsGateway
			.listUnits()
			.then((response: ListUnitsResponse) =>
				response.units.map((value: UnitResponse) =>
					UnitsService.toUnitDomain(value)
				)
			);
	}

	async getUnit(id: string): Promise<Unit> {
		return unitsGateway.getUnit(id).then((response: UnitResponse) => {
			return UnitsService.toUnitDomain(response);
		});
	}

	async updateUnit(id: string, payload: UpdateUnitRequest): Promise<Unit> {
		return unitsGateway
			.updateUnit(id, payload)
			.then((response: UnitResponse) => {
				return UnitsService.toUnitDomain(response);
			});
	}

	async getAuditLogs(unitId: string): Promise<AuditLog> {
		return unitsGateway
			.getAuditLog(unitId)
			.then((response: AuditLogResponse) => {
				return UnitsService.toAuditLogDomain(response);
			});
	}

	private static toUnitDomain(response: UnitResponse): Unit {
		return {
			id: response.id,
			name: response.name,
			instanceId: response["instance-id"],
			createdAt: new Date(response["created-at"]),
			updatedAt: new Date(response["updated-at"]),
			nodeId: response["node-id"]
		};
	}

	private static toAuditLogDomain(response: AuditLogResponse): AuditLog {
		return {
			entries: response.entries.map((entry) =>
				UnitsService.toAuditLogEntryDomain(entry)
			)
		};
	}

	private static toAuditLogEntryDomain(
		response: AuditLogEntryResponse
	): AuditLogEntry {
		return {
			id: response.id,
			targetId: response["target-id"],
			actorId: response["actor-id"],
			event: response.event,
			createdAt: new Date(response["created-at"]),
			changes: response.changes.map((change) =>
				UnitsService.toAuditLogEntryChangeDomain(change)
			)
		};
	}

	private static toAuditLogEntryChangeDomain(
		response: AuditLogEntryChangeResponse
	): AuditLogEntryChange {
		return {
			key: response.key,
			oldValue: response["old-value"],
			newValue: response["new-value"]
		};
	}
}

export default new UnitsService();
