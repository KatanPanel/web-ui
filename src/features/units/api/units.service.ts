import { Unit } from "@/features/units/api/models/unit.model";
import { UpdateUnitRequest } from "@/features/units/api/request/update-unit.request";
import { AuditLog } from "@/features/units/api/models/audit-log.model";
import { AxiosResponse } from "axios";
import httpService from "@/features/platform/api/http.service";

class UnitsService {
	async listUnits(): Promise<Unit[]> {
		return httpService
			.get("units")
			.then((res: AxiosResponse) =>
				(res.data as any[]).map(UnitsService.toUnit)
			);
	}

	async getUnit(id: string): Promise<Unit> {
		return httpService
			.get(`units/${id}`)
			.then((res: AxiosResponse) => UnitsService.toUnit(res.data));
	}

	async updateUnit(id: string, payload: UpdateUnitRequest): Promise<Unit> {
		return httpService
			.patch(`units/${id}`, payload)
			.then((res: AxiosResponse) => UnitsService.toUnit(res.data));
	}

	async createUnit(options: {
		name: string;
		blueprintId: string;
		image: string;
		network: {
			host: string | null;
			port: number | null;
		};
		options: { [key: string]: string };
	}): Promise<Unit> {
		return httpService
			.post("units", options)
			.then((res: AxiosResponse) => UnitsService.toUnit(res.data));
	}

	async getAuditLogs(unitId: string): Promise<AuditLog> {
		return httpService
			.get(`units/${unitId}/audit-logs`)
			.then((res: AxiosResponse) => res.data as AuditLog);
	}

	private static toUnit(data: any): Unit {
		return {
			id: data.id,
			name: data.name,
			instanceId: data["instance-id"],
			createdAt: data["created-at"],
			updatedAt: data["updated-at"],
			nodeId: data["node-id"],
			icon: data["icon"]
		} as Unit;
	}
}

export default new UnitsService();
