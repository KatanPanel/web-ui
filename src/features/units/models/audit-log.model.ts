export interface AuditLog {
	readonly actors: any[];
	readonly entries: AuditLogEntry[];
}

// TODO put audit log event const mappings
export type AuditLogEventsType = { [key: string]: number };

export const AuditLogEvents: { [name: string]: AuditLogEvent } = {
	UnitCreate: 1,
	UnitUpdate: 2
};

export type AuditLogEvent = number;

export interface AuditLogEntry {
	readonly id: string;
	readonly targetId: string;
	readonly actorId?: string;
	readonly event: AuditLogEvent;
	readonly createdAt: Date;
	readonly changes: AuditLogEntryChange[];
}

export interface AuditLogEntryChange {
	readonly key: string;
	readonly oldValue?: string;
	readonly newValue?: string;
}
