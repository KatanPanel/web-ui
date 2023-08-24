export interface Unit {
	readonly id: string;
	readonly name: string;
	readonly instanceId: string;
	readonly createdAt: string;
	readonly updatedAt: string;
	readonly nodeId: number;
	readonly icon?: string;
}
