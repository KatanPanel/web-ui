import { ModuleRouting } from "@/di";

export const SystemRoutes: ModuleRouting = {
	path: "system",
	name: "system",
	component: "SystemMain",
	children: [
		{
			path: "accounts",
			name: "system.accounts",
			component: "SystemAccounts",
			meta: {
				navigationWindow: {
					icon: {
						type: "svg",
						value: "group"
					}
				}
			}
		},
		{
			path: "accounts/:accountId",
			name: "system.accounts.account",
			component: "accounts/SystemAccountsAccount"
		}
	]
};
