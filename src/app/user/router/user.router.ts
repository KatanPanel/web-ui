import { ModuleRouting } from "@/di";

export const UserRouter: ModuleRouting = {
	path: "user",
	component: "UserInfoMain.vue",
	children: [
		{
			path: "",
			name: "user",
			component: "UserIndex"
		},
		{
			path: "activity",
			name: "user.activity-history",
			component: "UserActivityHistory"
		}
	]
};
