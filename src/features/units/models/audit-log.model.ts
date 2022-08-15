export interface AuditLog {
	readonly entries: AuditLogEntry[];
}

// TODO put audit log event const mappings
export type AuditLogEvent = number;

export interface AuditLogEntry {
	readonly id: string;
	readonly targetId: string;
	readonly event: AuditLogEvent;
	readonly createdAt: Date;
	readonly changes: AuditLogEntryChange[];
}

export interface AuditLogEntryChange {
	readonly key: string;
	readonly oldValue?: string;
	readonly newValue?: string;
}
