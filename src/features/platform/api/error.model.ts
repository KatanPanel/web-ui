export interface KatanError {
	readonly code: string | number;
	readonly message: string;
}

export class HttpError implements Error {
	readonly code: string | number = this.error.code;
	message = this.error.message;
	name = `HttpError-${this.error.code}`;

	constructor(private readonly error: KatanError) {}
}

export const HttpErrors = {
	UnknownInstance: 1003
};
