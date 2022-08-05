export interface Permission {
	readonly key: string;
	readonly flag: number;
	readonly givenAt: string;
	readonly lastModifiedAt: string;
}

export interface PermissionKey {
	readonly id: string;
	readonly overwrite: PermissionKey[];
	readonly targets: number;
}

export interface PermissionsHolder {
	readonly permissions: Permission[];
}
