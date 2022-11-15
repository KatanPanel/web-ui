import { isUndefined } from "@/utils";

class ConfigService {
	public readonly appName = "Katan";
	public readonly appVersion = this.value("$VUE_APP_VERSION");
	public readonly appWebsite = this.value("$VUE_APP_KATAN_WEBSITE");
	public readonly apiUrl = this.value("$VUE_APP_KATAN_API");
	public readonly gatewayUrl = this.value("$VUE_APP_KATAN_GATEWAY");
	public readonly gitCommit = this.value("$VUE_APP_KATAN_GIT_COMMIT");
	public readonly gitBranch = this.value("$VUE_APP_KATAN_GIT_BRANCH");

	/**
	 * Returns a string containing the name of the application, the current
	 * version, the SHA of the build commit and the branch of the current build.
	 */
	public toVersionInfoString(): string {
		return `v${this.appVersion} (build ${this.gitCommit} @ ${this.gitBranch})`;
	}

	/**
	 * Returns a environment variable key value.
	 *
	 * If the current environment is of development, it returns the value of
	 * the key present in the environment.
	 *
	 * If it is a dynamic key (its initial value can be changed) it must be
	 * prefixed with `$` to be changed during the construction phase of the
	 * application by the respective value.
	 * @param {string} key - The environment key.
	 */
	public value(key: string): string {
		const envKey = key.indexOf("$") === -1 ? key : key.substr(1);
		const value = process.env[envKey];

		if (process.env.NODE_ENV === "development")
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return value!;

		if (isUndefined(value))
			throw Error(`Environment var not found: ${key}`);

		// key will be replaced in build stage
		return value || key;
	}
}

export default new ConfigService();
