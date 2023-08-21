import { Account } from "@/features/account/api/models/account.model";
import httpService from "@/features/platform/api/http.service";
import localStorageService from "@/features/platform/api/local-storage.service";
import { AccessToken } from "@/features/auth/api/models/access-token.model";
import { AxiosError, AxiosResponse } from "axios";
import logService from "@/features/platform/api/log.service";
import accountService from "@/features/account/api/services/account.service";
import * as http from "http";
import { Consola } from "consola";
import { isNull } from "@/utils";

export const AUTHORIZATION_TOKEN_KEY = "token";

class AuthService {
	private readonly logger!: Consola;

	constructor() {
		this.logger = logService.create(AuthService.name);
		httpService.axios.interceptors.request.use((request) => {
			const localToken = this.getLocalAccessToken();
			if (!isNull(localToken))
				request.headers![
					"Authorization"
				] = `Bearer ${localToken.token}`;
			return request;
		});
	}

	getLocalAccessToken(): AccessToken | null {
		return localStorageService.get(AUTHORIZATION_TOKEN_KEY);
	}

	async login(username: string, password: string): Promise<void> {
		return httpService
			.post("auth/login", { username, password })
			.then((res: AxiosResponse) => {
				const accessToken = { token: res.data.token } as AccessToken;
				this.logger.debug("Login performed", accessToken);
				localStorageService.set(AUTHORIZATION_TOKEN_KEY, accessToken);
			})
			.catch((error: AxiosError) => {
				this.logger.debug("Failed to perform login", error);
				throw error;
			});
	}

	async verify(accessToken: AccessToken): Promise<Account> {
		const res: AxiosResponse = await httpService.get("auth", {
			headers: { Authorization: `Bearer ${accessToken.token}` }
		});

		const entity = res.data;
		return {
			id: entity.id,
			username: entity.username,
			email: entity.email,
			createdAt: entity["created-at"],
			updatedAt: entity["updated-at"],
			lastLoggedInAt: entity["last-logged-in-at"]
		} as Account;
	}
}

export default new AuthService();
