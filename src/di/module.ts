import { Constructor, DiContainer } from "@/di";
import { VuexModule } from "vuex-module-decorators";
import { ContainerModule } from "inversify";
import { NavigationGuardNext, RedirectOption, Route } from "vue-router";
import { DirectiveFunction, DirectiveOptions } from "vue/types/options";
import { Dictionary, RoutePropsFunction } from "vue-router/types/router";

export const ModuleMetadataKey = "katan:module";
export const ModuleNameProp = "moduleName";
export const ModuleContainerModuleProp = "containerModule";
export const ModuleContainerProp = "container";

export type ModuleState =
	| ModuleStore
	| Constructor<VuexModule>
	| Constructor<VuexModule>[];

export interface ModuleOptions {
	services?: Constructor[];
	router?: ModuleRouting;
	stateManagement?: ModuleState;
	directives?: ModuleDirectives;
	children?: Constructor[];
}

export function Module(options?: ModuleOptions): ClassDecorator {
	return (target) => {
		Reflect.defineMetadata(ModuleMetadataKey, options, target);
	};
}

export abstract class KatanModule {
	public readonly [ModuleNameProp]!: string;
	public readonly [ModuleContainerModuleProp]!: ContainerModule;
	public readonly [ModuleContainerProp]!: DiContainer;

	init(): void {
		return;
	}

	afterInit(): void {
		return;
	}
}

export type ModuleRouteConfig = {
	path: string;
	name?: string;
	root?: true;
	beforeEnter?: Constructor<ModuleRouteNavigationGuard>;
	component?:
		| {
				[name: string]: string;
		  }
		| string;
	redirect?: RedirectOption;
	children?: ModuleRouteConfig[];
	props?:
		| boolean
		| object
		| RoutePropsFunction
		| Dictionary<boolean | object | RoutePropsFunction>;
	meta?: any;
};

export type ModuleDirectives = {
	[id: string]: DirectiveOptions | DirectiveFunction;
};

export type ModuleRouting = ModuleRouteConfig | ModuleRouteConfig[] | undefined;

export interface ModuleRouteNavigationGuard {
	handle(to: Route, from: Route, next: NavigationGuardNext): void;
}

export interface ModuleStore {
	module: Constructor<VuexModule>;
	children?: Constructor<VuexModule>[];
}
