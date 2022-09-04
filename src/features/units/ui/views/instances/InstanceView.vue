<template>
	<router-view v-if="instance" :class="$style.root" />
	<div v-else>Laoding</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import instancesPresenter from "@/features/units/ui/instances.presenter";
import { Instance } from "@/features/units/models/instance.model";
import { computed } from "vue";
import logService from "@/features/shared/data/log.service";

@Component({
	provide(this: InstanceView) {
		return {
			instance: computed(() => this.instance)
		};
	}
})
export default class InstanceView extends Vue {
	instance: Instance | null = null;

	created() {
		const id = this.$route.params.instanceId as string;
		instancesPresenter.getInstance(id).then((result) => {
			this.instance = result;

			const ws = new WebSocket("ws://localhost:8080");
			ws.addEventListener("open", () => {
				logService.info("ws connection established");
				const data = {
					o: 2,
					d: {
						tid: this.instance?.id
					}
				};
				console.log("sending", data);
				ws.send(JSON.stringify(data));
			});
			ws.addEventListener("message", (event) => {
				logService.debug("ws received", event.data);
			});
			ws.addEventListener("close", () => {
				logService.info("ws closed");
			});
		});
	}
}
</script>
<style lang="scss" module>
.root {
	height: 100%;
	display: flex;
	flex-direction: column;
}
</style>
