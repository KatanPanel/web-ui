import { ModuleRouting } from "@/di";
import { AuthenticatedOnlyGuard } from "@/app/auth/guards/authenticated-only.guard";

export const AppNavigationRouter: ModuleRouting = [
	{
		path: "/",
		beforeEnter: AuthenticatedOnlyGuard,
		component: "AppNavigationMain",
		children: [
			{
				path: "",
				name: "home",
				component: "home/AppHome",
				meta: {
					navigationWindow: {
						icon: {
							type: "svg",
							value: "home"
						}
					}
				}
			},
			{
				path: "library",
				name: "library",
				component: "library/AppGameLibrary"
			}
		]
	},
	{
		path: "*",
		redirect: "/",
		root: true
	}
];
