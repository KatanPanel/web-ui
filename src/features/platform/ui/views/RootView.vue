<template>
	<component :is="getLayout()">
		<router-view />
	</component>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import RootLayout from "@/features/platform/ui/layouts/RootLayout.vue";
import httpService from "@/features/platform/api/http.service";
import { AxiosResponse } from "axios";
import websocketService from "@/features/platform/api/websocket.service";
import { ActiveLoader } from "vue-loading-overlay";
import logService from "@/features/platform/api/log.service";
import { isUndefined } from "@/utils";
import { ServerInfo } from "@/features/platform/api/server-info.model";

@Component({
	components: {
		RootLayout
	}
})
export default class RootView extends Vue {
	isLoading = true;
	loader?: ActiveLoader;

	beforeCreate() {
		websocketService.tryConnect(() => {
			this.$nextTick(() => {
				this.isLoading = false;
				this.loader?.hide();
			});
		});
	}

	created() {
		// TODO move to service
		httpService.get("/").then((res: AxiosResponse) => {
			const d = res.data;
			const info = {
				version: d.version,
				nodeId: d["node-id"],
				clusterMode: d["cluster-mode"],
				build: {
					commit: d.build.commit,
					message: d.build.message,
					branch: d.build.branch,
					remote: d.build.remote,
					time: d.build.message
				},
				defaultNetwork: {
					name: d["default-network"].name,
					driver: d["default-network"].driver
				}
			} as ServerInfo;

			logService.create("build info").info(info);
			return info;
		});
	}

	mounted() {
		if (!isUndefined(this.loader)) return;

		this.loader = this.$loading.show({
			container: undefined,
			canCancel: false
		});
	}

	getLayout(): unknown {
		return this.$route.meta.layout ?? RootLayout;
	}
}
</script>
