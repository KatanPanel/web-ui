import { RouteRecordRaw } from "vue-router";
import { importView } from "@/router";

const FEATURE_NAME = "account";

export const ACCOUNT_ROUTE = "account";

export const AccountsRoute: Array<RouteRecordRaw> = [
	{
		path: "/account",
		name: ACCOUNT_ROUTE,
		component: importView(FEATURE_NAME, "Account")
	}
];
