<template>
	<div class="panel-console">
		<h1 v-if="fetchingState === 0" key="waiting-response">Connecting...</h1>
		<h2 v-else-if="fetchingState === 1" key="logs-started">
			Retrieving logs...
		</h2>
		<div v-else key="logs" class="logs" :ref="`logs-container-${window}`">
			<p v-for="(log, i) in logs" :key="i">
				<code
					v-tooltip="{
						content: $time(log.t).format('LLLL'),
						placement: 'right'
					}"
					>{{ log.c }}</code
				>
			</p>
		</div>
		<v-form>
			<v-input-group class="v--flex v--flex-row input">
				<v-input-icon>
					<code class="v--text-fw-700">$</code>
				</v-input-icon>
				<v-input
					class="v--flex-child v--flex-basis-0"
					v-model="consoleInput"
				/>
			</v-input-group>
		</v-form>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import VForm from "@/components/ui/form/VForm.vue";
import VInput from "@/components/ui/form/VInput.vue";
import { mixins } from "vue-class-component";
import WindowMixin from "@/mixins/window";
import VInputGroup from "@/components/ui/form/VInputGroup.vue";
import VInputIcon from "@/components/ui/form/VInputIcon.vue";
import { getWebSocket } from "@/store";
import { smoothScroll } from "@/utils/animations";

@Component<ServerConsole>({
	components: { VInputIcon, VInputGroup, VInput, VForm },
	activated(): void {
		this.updateWindowTitle("Console");

		if (this.fetchingState === 3) this.forceLogsContainerScroll();
	},
	mounted(): void {
		const socket = getWebSocket();
		socket.on("message", (message: any) => {
			if (
				!message.d["server-id"] ||
				message.d["server-id"] !== this.getServer.id
			)
				return;

			switch (message.op) {
				// logs started
				case 3:
					return (this.fetchingState = 1);

				// logging
				case 4: {
					if (this.fetchingState !== 2) this.fetchingState = 2;

					const log = message.d.log;
					const whitespace = log.indexOf(" ");
					this.logs.push({
						t: log.substr(0, whitespace),
						c: log.substr(whitespace, log.length),
					});
					break;
				}

				// logs finished
				case 5: {
					this.updateLogsContainerScroll();
					return (this.fetchingState = 3);
				}
			}
		});

		// request server logs
		socket.sendOp(4, {
			"server-id": this.getServer.id,
		});
	},
})
export default class ServerConsole extends mixins(WindowMixin) {
	private consoleInput = "";
	private fetchingState = 0;
	private logs: any[] = [];

	private get logsContainer(): HTMLElement {
		return this.$refs[`logs-container-${this.window}`] as HTMLElement;
	}

	@Watch("consoleInput")
	private onConsoleInputChange(value: string): void {
		this.updateWindowTitle(
			value.length === 0 ? "Console" : `Typing "${value}"...`
		);
	}

	private updateLogsContainerScroll(): void {
		const el = this.logsContainer;

		// already scrolled to bottom
		if (el.scrollHeight - el.clientHeight <= el.scrollTop + 1) return;

		smoothScroll(2500, el, el.scrollHeight, "scrollTop");
	}

	private forceLogsContainerScroll() {
		this.logsContainer.scrollTop =
			this.logsContainer.scrollHeight - this.logsContainer.clientHeight;
	}
}
</script>
<style lang="scss" scoped>
.panel-console {
	background-color: var(--app-foreground);
	border-radius: 8px;
	max-height: calc(100vh - (170px + 48px + 48px));
	overflow-y: auto;
	display: flex;
	flex-direction: column;

	.logs {
		flex: 1 auto;
		position: relative;
		overflow-y: auto;
		padding: 12px;

		p {
			font-size: 14px;
			font-family: monospace;
			color: var(--muted-darker-color);
		}

		&::-webkit-scrollbar-track {
			border-radius: 8px;
			background-color: var(--app-foreground);
		}

		&::-webkit-scrollbar {
			width: 8px;
			background-color: var(--app-foreground-overlay);
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 8px;
			background-color: rgba(0, 0, 0, 0.12);
		}
	}

	.input {
		padding: 6px !important;
		background-color: var(--app-foreground-overlay);

		code {
			user-select: none;
		}

		.v--input {
			padding: 0;
			background-color: transparent;
			font-weight: 700;
		}

		.v--input-icon {
			padding: 0 6px;
			margin-right: 6px;
		}
	}
}
</style>
