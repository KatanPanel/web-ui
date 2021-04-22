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
	<div :class="`mode-${mode || 'default'}`" class="server-console">
		<div v-if="logsFetchingState === 0" key="waiting-response">
			<h1 class="loading-state">Connecting...</h1>
		</div>
		<div v-else-if="logsFetchingState === 1" key="logs-started">
			<h1 class="loading-state">Retrieving logs...</h1>
		</div>
		<div v-else :ref="`logs-container-${serverId}`" key="logs" class="logs">
			<p v-for="(log, i) in logs" :key="i">
				<code v-tooltip="logTooltip(log)">{{ log.c }}</code>
			</p>
		</div>
		<v-form>
			<v-input
				v-model="consoleInput"
				class="v--flex-child v--flex-basis-0"
				placeholder="Type something..."
				@input="$emit('input', $event.target.value)"
			/>
		</v-form>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getClientSettings } from "@/common/client-settings";
import VForm from "@/components/ui/form/VForm.vue";
import VInput from "@/components/ui/form/VInput.vue";
import { getWebSocket } from "@/store";
import { smoothScroll } from "@/utils/dom";

@Component({
	components: { VInput, VForm },
	created(): void {
		const socket = getWebSocket();
		const vm = this as ServerConsoleContent;

		socket.on("message", (message: any) => {
			if (
				!message.d["server-id"] ||
				message.d["server-id"] !== vm.serverId
			)
				return;

			switch (message.op) {
				// logs started
				case 1002: {
					vm.logs = [];
					return (vm.logsFetchingState = 1);
				}

				// logging
				case 1003: {
					if (vm.logsFetchingState !== 2) vm.logsFetchingState = 2;

					const log = message.d.log;
					const whitespace = log.indexOf(" ");
					vm.logs?.push({
						t: log.substr(0, whitespace),
						c: log.substr(whitespace, log.length)
					});
					break;
				}

				// logs finished
				case 1004: {
					vm.updateLogsContainerScroll();
					return (vm.logsFetchingState = 3);
				}
			}
		});

		// request server logs
		socket.send(1003, {
			"server-id": vm.serverId
		});
	},
	activated(): void {
		const vm = this as ServerConsoleContent;
		if (vm.logsFetchingState === 3) vm.forceLogsContainerScroll();
	}
})
export default class ServerConsoleContent extends Vue {
	@Prop({ type: String, default: "default" }) private readonly mode!: string;
	@Prop({ type: Number, required: true }) private readonly serverId!: number;

	private logsFetchingState = 0;
	private logs: any[] | null = null;
	private consoleInput = "";

	get logsContainer(): HTMLElement {
		return this.$refs[`logs-container-${this.serverId}`] as HTMLElement;
	}

	updateLogsContainerScroll(): void {
		const el = this.logsContainer;

		// already scrolled to bottom
		if (el.scrollHeight - el.clientHeight <= el.scrollTop + 1) return;

		smoothScroll(2500, el, el.scrollHeight, "scrollTop");
	}

	forceLogsContainerScroll() {
		this.logsContainer.scrollTop =
			this.logsContainer.scrollHeight - this.logsContainer.clientHeight;
	}

	logTooltip(log: any) {
		const tooltipTrigger = getClientSettings().serverSettings
			.showConsoleLogDate;
		if (!tooltipTrigger) return {};

		return {
			content: this.$date(log.t),
			trigger: tooltipTrigger
		};
	}
}
</script>
<style lang="scss" scoped>
.server-console {
	background-color: var(--kt-background-secondary);
	border-radius: 8px;
	max-height: calc(100vh - (170px + 48px + 48px));
	overflow-y: auto;
	display: flex;
	flex-direction: column;

	&.mode-fullscreen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1001;
		max-height: 100%;
		background-color: black;

		code {
			font-family: "Lucida Console", monospace;
			color: #fff;
		}

		.v--input {
			background-color: black;
			border-color: black;
			font-family: "Lucida Console", monospace;
		}
	}

	&.pinned {
		position: fixed;
		right: 0;
		bottom: 0;
		padding: 8px;
		box-shadow: var(--kt-background-accent) 0 0 20px 4px;
		background-color: var(--kt-background-accent);
		max-width: 30%;
		max-height: 30%;

		&::-webkit-scrollbar {
			width: 6px;
			background-color: var(--kt-scrollbar);
		}

		&::-webkit-scrollbar-track {
			border-radius: 8px;
			background-color: var(--kt-scrollbar);
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 8px;
			background-color: var(--kt-scrollbar-thumb);
		}

		.loading-state {
			font-size: 2.4rem;
		}
	}

	.loading-state {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5%;
		opacity: 0.38;
		user-select: none;
	}

	.logs {
		flex: 1 auto;
		position: relative;
		overflow-y: auto;
		padding: 12px;

		p {
			font-size: 14px;
			font-family: monospace;
			color: var(--kt-muted-darker-color);
		}

		&::-webkit-scrollbar-track {
			border-radius: 8px;
			background-color: var(--kt-background-secondary);
		}

		&::-webkit-scrollbar {
			width: 8px;
			background-color: var(--kt-background-secondary);
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 8px;
			background-color: rgba(0, 0, 0, 0.12);
		}
	}

	.input {
		padding: 6px !important;
		background-color: var(--kt-background-tertiary);

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
