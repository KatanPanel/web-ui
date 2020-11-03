export interface PanelState {
	currentServer: any | null;

	serverList: any[] | null;
}

export default {
	currentServer: null,
	serverList: null,
} as PanelState;
