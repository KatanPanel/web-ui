import { KatanModule, Module } from "@/di";
import { UserInfoRouter } from "@/app/user-info/router/user-info.router";

@Module({
	router: UserInfoRouter
})
export default class UserInfoModule extends KatanModule {}
