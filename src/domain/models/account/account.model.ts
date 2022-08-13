export interface Account {
	readonly id: string;
	readonly username: string;
	readonly createdAt?: string;
	readonly updatedAt?: string;
	readonly lastLoggedInAt?: string;
}
