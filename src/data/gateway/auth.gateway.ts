import httpService from "@/data/services/http.service";
import { AxiosResponse } from "axios";
import { User } from "@/domain/models/user/user.model";
import { AccessToken } from "@/domain/models/auth/access-token.model";

class AuthGateway {
	async login(username: string, password: string): Promise<AccessToken> {
		return httpService
			.post("auth/login", {
				username,
				password,
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

	async verify(token: string): Promise<User> {
		return httpService
			.get("auth", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res: AxiosResponse) => res.data.account as User);
	}
}

export default new AuthGateway();
