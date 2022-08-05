import { PermissionsHolder } from "@/domain/models/permission/permission.model";
import { Role } from "@/domain/models/role/role.model";

export interface User extends PermissionsHolder {
	readonly id: string;
	readonly username: string;
	readonly createdAt?: string;
	readonly updatedAt?: string;
	readonly lastLoggedInAt?: string;
	readonly email?: string;
	readonly avatar?: string;
	readonly role?: Role;
}
