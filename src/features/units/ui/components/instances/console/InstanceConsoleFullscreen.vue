<template>
	<div :class="$style.root">
		<div :class="$style.header">
			<h4 :class="$style.title">Console {{ unit.name }}</h4>
			<div :class="$style.close" @click="toggleFullscreen">
				<VIcon name="Close" />
			</div>
		</div>
		<div :class="$style.logs" ref="logsEl">
			<code v-for="(log, i) in logs" :key="`log-${i}`">
				{{ log }}
			</code>
		</div>
		<div :class="$style.command">
			<VForm @submit.prevent="onInput">
				<VFieldSet :class="$style.fieldset">
					<div :class="$style.dollar">$</div>
					<VInput
						:class="$style.input"
						v-model="input"
						ref="inputEl"
						placeholder="Meu saco é uma alavanca"
					/>
				</VFieldSet>
			</VForm>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Emit, Inject, Ref, Vue } from "vue-facing-decorator";
import { Unit } from "@/features/units/models/unit.model";
import VIcon from "@/features/shared/ui/components/design-system/icon/VIcon.vue";
import VInput from "@/features/shared/ui/components/design-system/form/VInput.vue";
import VForm from "@/features/shared/ui/components/design-system/form/VForm.vue";
import VFieldSet from "@/features/shared/ui/components/design-system/form/VFieldSet.vue";
import logService from "@/features/shared/data/log.service";

@Component({
	components: { VFieldSet, VForm, VInput, VIcon }
})
export default class InstanceConsoleFullscreen extends Vue {
	@Inject()
	private readonly unit!: Unit;

	@Ref()
	private readonly inputEl!: VInput;

	@Ref()
	private readonly logsEl!: HTMLElement;

	private ws!: WebSocket;

	input = "";
	logs: string[] = [];

	created() {
		this.listenForLogs();
	}

	mounted() {
		this.scrollDown();
	}

	@Emit("fullscreen")
	toggleFullscreen(): void {
		return;
	}

	scrollDown() {
		this.logsEl.scrollTo({
			behavior: "smooth",
			top: 9999999
		});
	}

	onInput() {
		if (this.input.length === 0) return;

		this.ws.send(
			JSON.stringify({
				o: 1,
				d: {
					tid: this.unit.instanceId,
					v: this.input
				}
			})
		);
		this.input = "";
	}

	listenForLogs() {
		logService.info("lets listen for logs");

		const ws = new WebSocket("ws://localhost:8080");
		ws.addEventListener("open", () => {
			logService.info("ws connection established");
			ws.send(
				JSON.stringify({
					o: 0,
					d: {
						tid: this.unit.instanceId
					}
				})
			);
		});
		ws.addEventListener("message", (event) => {
			logService.debug("ws received", event.data);
			const result: { o: number; d: any } = JSON.parse(event.data);
			this.logs.push(result.d.v);
			this.scrollDown();
		});
		ws.addEventListener("close", () => {
			logService.info("ws closed");
		});

		this.ws = ws;
	}
}
</script>

<style lang="scss" module>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap");

$primary_color: rgba(255, 255, 255, 0.72);
$console_font: "IBM Plex Mono", monospace;

.root {
	position: fixed;
	background-color: black;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1;
	height: 100vh;
	display: flex;
	flex-direction: column;
	font-family: $console_font;
}

.logs {
	flex-grow: 1;
	padding: 0 2.4rem 1.2rem;
	color: $primary_color;
	display: flex;
	flex-direction: column;
	overflow-y: auto;
}

.header {
	color: $primary_color;
	display: flex;
	flex-direction: row;
	align-items: center;
}

.title {
	padding: 2.4rem;
	flex-grow: 1;
	font-family: $console_font;
}

.close {
	margin: 1.8rem 2.4rem;
	border-radius: 8px;
	padding: 0.8rem;
	color: $primary_color;

	&:hover {
		cursor: pointer;
		color: $primary_color;
		background-color: rgba(255, 255, 255, 0.12);
	}
}

.command {
	width: 100%;
}

.fieldset {
	display: flex;
	flex-direction: row;
	background-color: rgba(255, 255, 255, 0.05);
	height: 42px;
	padding: 0 1.6rem;
}

.input {
	background-color: transparent;
	font-family: $console_font;
	color: #fff;
	height: auto;
	font-size: 14px;
}

.dollar {
	align-self: center;
	padding: 0.8rem;
	color: var(--kt-content-primary);
}
</style>
