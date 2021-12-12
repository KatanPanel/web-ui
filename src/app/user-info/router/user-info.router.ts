import { ModuleRouting } from "@/di";

export const UserInfoRouter: ModuleRouting = {
	path: "user/info/:userId",
	component: "UserInfoMain",
	props: true,
	children: [
		{
			path: "",
			name: "user.info",
			component: "UserInfoIndex"
		}
	]
};
