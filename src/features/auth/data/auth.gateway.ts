import httpService from "@/features/shared/data/http.service";
import { AxiosResponse } from "axios";
import { Account } from "@/features/account/models/account.model";
import { AccessToken } from "@/features/auth/models/access-token.model";

class AuthGateway {
	async login(username: string, password: string): Promise<AccessToken> {
		return httpService
			.post("auth/login", {
				username,
				password
			})
			.then(
				(res: AxiosResponse) =>
					({ token: res.data.token } as AccessToken)
			)
			.catch((error: any) => {
				console.log("auth error", error);
				throw error;
			});
	}

	async verify(token: string): Promise<Account> {
		return httpService
			.get("auth", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((res: AxiosResponse) => res.data.account as Account);
	}
}

export default new AuthGateway();
