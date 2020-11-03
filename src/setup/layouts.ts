import Vue from "vue";
import LoginLayout from "@/layouts/LoginLayout.vue";
import HomeLayout from "@/layouts/HomeLayout.vue";
import PanelLayout from "@/layouts/PanelLayout.vue";
import { HOME_LAYOUT, LOGIN_LAYOUT, PANEL_LAYOUT } from "@/layouts";

function register(name: string, instance: typeof Vue): void {
	Vue.component(`${name}-layout`, instance);
}

register(HOME_LAYOUT, HomeLayout);
register(LOGIN_LAYOUT, LoginLayout);
register(PANEL_LAYOUT, PanelLayout);
