import { ModuleRouting } from "@/di";

export const RoleRoutes: ModuleRouting = {
	path: "role/:id",
	name: "role",
	component: "RoleMain",
	props: true,
	meta: {
		navigationWindow: {
			icon: {
				type: "svg",
				value: "group"
			}
		}
	}
};
