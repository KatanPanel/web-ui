import { PermissionsHolder } from "@/domain/models/permission/permission.model";

export interface Role extends PermissionsHolder {
	readonly id: number;
	readonly name: string;
	readonly createdAt: string;
	readonly updatedAt: string;
}
