import { injectable } from "inversify";
import { lazyInject } from "@/di";
import { inject } from "inversify-props";
import { HttpService } from "@/app/app-network/services/http.service";
import { AuthStore } from "@/app/auth/store/auth.store";
import { UserModel } from "@/app/user/models/user.model";
import { UserStore } from "@/app/user/store/user.store";
import {
	AUTHORIZATION_TOKEN_KEY,
	AuthService
} from "@/app/auth/services/auth.service";
import { isNull } from "@/app/shared/utils";
import { LocalStorageService } from "@/app/shared/services/local-storage.service";

@injectable()
export class AuthPresenter {
	@lazyInject() private readonly authStore!: AuthStore;
	@lazyInject() private readonly userStore!: UserStore;
	@lazyInject() private readonly authService!: AuthService;
	@lazyInject() private readonly httpService!: HttpService;
	@lazyInject() private readonly localStorageService!: LocalStorageService;

	public get isLoggedIn(): boolean {
		return !isNull(this.userStore.getUser);
	}

	public async authenticate(
		username: string,
		password: string
	): Promise<void> {
		const token = await this.authService.login(username, password);
		return await this.authService.verify(token).then((user: UserModel) => {
			this.httpService.defaults().headers[
				AUTHORIZATION_TOKEN_KEY
			] = `Bearer ${token}`;
			this.userStore.updateUser({ user });

			this.localStorageService.set(AUTHORIZATION_TOKEN_KEY, token);
		});
	}

	public async verify(): Promise<UserModel> {
		return await this.authService.verify(
			this.localStorageService.get(AUTHORIZATION_TOKEN_KEY) as string
		);
	}

	public async logout(): Promise<void> {
		return;
	}
}
