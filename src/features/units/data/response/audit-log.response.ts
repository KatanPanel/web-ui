export type AuditLogResponse = {
	entries: AuditLogEntryResponse[];
};

export type AuditLogEntryResponse = {
	id: string;
	"target-id": string;
	event: number;
	"created-at": string;
	changes: AuditLogEntryChangeResponse[];
};

export type AuditLogEntryChangeResponse = {
	key: string;
	"old-value"?: string;
	"new-value"?: string;
};
