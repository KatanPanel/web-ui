import Vue from "vue";
import Component from "vue-class-component";
import {
	GET_PANEL_CURRENT_SERVER,
	GET_PANEL_SERVER_LIST,
} from "@/store/panel/getters";
import { PANEL_MODULE } from "@/store";
import { joinVuexModule } from "@/utils/text";

@Component
export class PanelMixin extends Vue {
	public get getServerList(): any[] {
		return this.$store.getters[
			joinVuexModule(PANEL_MODULE, GET_PANEL_SERVER_LIST)
		];
	}

	public get getServer(): any | null {
		return this.$store.getters[
			joinVuexModule(PANEL_MODULE, GET_PANEL_CURRENT_SERVER)
		];
	}
}
