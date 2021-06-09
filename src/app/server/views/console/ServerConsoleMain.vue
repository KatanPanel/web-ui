<!--
  - Copyright (c) 2020-present Katan
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  - copies of the Software, and to permit persons to whom the Software is
  - furnished to do so, subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in all
  - copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  - IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  - FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  - AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  - LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  - OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  - SOFTWARE.
  -->

<template>
	<div>
		<h2>Console</h2>
		<!-- <v-button @click.native="updateConsoleMode('fullscreen')">
			Fullscreen
		</v-button>
		<ServerConsoleContent
			ref="content"
			:mode="consoleMode"
			:server-id="getServer.id"
			@input="onConsoleInputChange"
		/> -->
		<router-view :name="mode" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ServerConsoleMain extends Vue {
	mode: "default" | "fullscreen" = "default";

	/* get consoleMode(): string | null {
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
		} */
}
</script>
