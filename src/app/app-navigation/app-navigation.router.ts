import { KatanRouting } from "@/ioc";
import { AuthenticatedOnlyGuard } from "@/app/auth/guards/authenticated-only.guard";

export const AppNavigationRouter: KatanRouting = [
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
