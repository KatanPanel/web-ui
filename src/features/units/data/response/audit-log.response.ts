export type AuditLogResponse = {
	actors: any[]; // TODO type safety
	entries: AuditLogEntryResponse[];
};

export type AuditLogEntryResponse = {
	id: string;
	"target-id": string;
	"actor-id"?: string;
	event: number;
	"created-at": string;
	changes: AuditLogEntryChangeResponse[];
};

export type AuditLogEntryChangeResponse = {
	key: string;
	"old-value"?: string;
	"new-value"?: string;
};
