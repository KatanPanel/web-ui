import { ModuleRouting } from "@/di";

export const UserSettingsRouter: ModuleRouting = {
	path: "user/settings",
	component: "UserSettingsMain",
	children: [
		{
			path: "",
			name: "user.settings",
			component: "UserAccountIndex"
		},
		{
			path: "appearence",
			name: "user.settings.appearence",
			component: "UserSettingsAppearence"
		},
		{
			path: "language",
			name: "user.settings.language",
			component: "UserSettingsLanguage"
		},
		{
			path: "advanced",
			name: "user.settings.advanced",
			component: "UserSettingsAdvanced"
		}
	]
};
