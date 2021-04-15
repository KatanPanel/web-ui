<template>
	<div>
		<h2>Console</h2>
		<v-button @click.native="updateConsoleMode('fullscreen')">
			Fullscreen
		</v-button>
		<ServerConsoleContent
			ref="content"
			:mode="consoleMode"
			:server-id="getServer.id"
			@input="onConsoleInputChange"
		/>
	</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import VForm from "@/components/ui/form/VForm.vue";
import VInput from "@/components/ui/form/VInput.vue";
import { mixins } from "vue-class-component";
import WindowMixin from "@/mixins/window";
import VInputGroup from "@/components/ui/form/VInputGroup.vue";
import VInputIcon from "@/components/ui/form/VInputIcon.vue";
import VButton from "@/components/ui/button/VButton.vue";
import ServerConsoleContent from "@/components/server/ServerConsoleContent.vue";
import { get } from "@/utils/vuex";
import { GET_NAVIGATION_HISTORY } from "@/store/getters";
import { ROOT_MODULE } from "@/store";
import { Location, Route } from "vue-router";
import { routeToLocation } from "@/utils/navigation";
import { updateWindowTitle } from "@/common/navigation/window";

@Component<ServerConsole>({
	components: {
		ServerConsoleContent,
		VButton,
		VInputIcon,
		VInputGroup,
		VInput,
		VForm,
	},
})
export default class ServerConsole extends mixins(WindowMixin) {
	get consoleMode(): string | null {
		return this.getWindowProperty("console-mode") || null;
	}

	updateConsoleMode(value: string) {
		this.setReactiveWindowProperty("console-mode", value);
	}

	pinConsole() {
		const navigationHistory = get(
			ROOT_MODULE,
			GET_NAVIGATION_HISTORY
		) as Route[];

		// 0 index is the console itself
		if (navigationHistory.length <= 1) {
			return this.pinConsoleAndGoTo();
		}

		const last = navigationHistory[navigationHistory.length - 2];
		if (last.name && last.name === "server.console")
			return this.pinConsoleAndGoTo();

		this.pinConsoleAndGoTo(routeToLocation(last));
	}

	pinConsoleAndGoTo(location?: Location) {
		this.$router
			.replace(location || { name: "server.overview" })
			.then(() => {
				this.$emit("pin-console");
			});
	}

	onConsoleInputChange(value: string): void {
		updateWindowTitle(
			this.getWindow,
			this.$i18n.t(
				value.length === 0
					? "windows.server.console.empty"
					: "windows.server.console.typing",
				{ input: value }
			) as string
		);
	}
}
</script>
