import {
	Consola,
	ConsolaLogObject,
	default as ConsolaInstance,
	LogLevel
} from "consola";

class LogService {
	private readonly logger!: Consola;

	constructor() {
		this.logger = ConsolaInstance.create({
			level:
				process.env.NODE_ENV !== "production"
					? LogLevel.Debug
					: LogLevel.Info
		});
	}

	copy(tag: string): Consola {
		return this.logger.withTag(tag);
	}

	log(message: ConsolaLogObject | unknown, ...args: unknown[]): void {
		this.logger.log(message, ...args);
	}

	debug(message: ConsolaLogObject | unknown, ...args: unknown[]): void {
		this.logger.debug(message, ...args);
	}

	info(message: ConsolaLogObject | unknown, ...args: unknown[]): void {
		this.logger.info(message, ...args);
	}

	warn(message: ConsolaLogObject | unknown, ...args: unknown[]): void {
		this.logger.warn(message, ...args);
	}

	error(message: ConsolaLogObject | unknown, ...args: unknown[]): void {
		this.logger.error(message, ...args);
	}
}

export default new LogService();
