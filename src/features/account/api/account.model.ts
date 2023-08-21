export interface Account {
	readonly id: string;
	readonly username: string;
	readonly email: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
	readonly lastLoggedInAt?: Date;
	readonly avatar?: string;
}
