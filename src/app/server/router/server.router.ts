import { ModuleRouting } from "@/di";
import { ServerSettingsRouter } from "@/app/server/router/server-settings.router";
import { ServerFileSystemRouter } from "@/app/server/router/server-file-system.router";
import { ServerConsoleRouter } from "@/app/server/router/server-console.router";

export const ServerRouter: ModuleRouting = {
	path: "server/:serverId",
	name: "server",
	component: "ServerMain",
	children: [
		{
			path: "overview",
			name: "server.overview",
			component: "overview/ServerOverview"
		},
		ServerConsoleRouter,
		ServerFileSystemRouter,
		ServerSettingsRouter
	]
};
