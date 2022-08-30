<template>
	<div v-if="isLoading">Loading fio</div>
	<component v-else :is="getLayout()">
		<router-view />
	</component>
</template>
<script lang="ts">
import { Component, Vue } from "vue-facing-decorator";
import RootLayout from "@/features/shared/ui/layouts/RootLayout.vue";
import httpService from "@/features/shared/data/http.service";
import { AxiosResponse } from "axios";
import { ServerInfo } from "@/features/shared/models/server-info";

@Component({
	components: {
		RootLayout
	}
})
export default class RootView extends Vue {
	isLoading = true;

	created() {
		// TODO move to service
		httpService
			.get("/")
			.then((res: AxiosResponse) => {
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

				console.log("info", info);
				return info;
			})
			.finally(() => (this.isLoading = false));
	}

	getLayout(): unknown {
		return this.$route.meta.layout ?? RootLayout;
	}
}
</script>
