<template>
	<div class="server-fs">
		<h4>Gerenciador de Arquivos</h4>
		<section id="storage">
			<p class="v--text-muted v--m-bottom-3">
				Selecione um disco de armazenamento para explorar sua árvore de
				arquivos.
			</p>
			<div class="disks">
				<v-tab-link
					:to="{ name: FS_DISK_TAB, params: { disk: disk.id } }"
					:window="window"
					tag="a"
					v-for="disk in disks"
					:key="disk.id"
					class="disk"
				>
					<div class="disk-icon">
						<img
							:src="`/img/games/icons/${getServer.game.name.toLowerCase()}.png`"
							:alt="getServer.game.name"
						/>
					</div>
					<div class="disk-info">
						<div class="disk-data">
							<h6 class="disk-name">{{ disk.name }}</h6>
							<!-- <p class="disk-space-text">
								{{ $helpers.filesize(disk.spaceAvailable) }} /
								{{ $helpers.filesize(disk.spaceMax) }}
							</p> -->
						</div>
					</div>
				</v-tab-link>
			</div>
			<hr />
		</section>
	</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import WindowMixin from "@/common/internal/mixins/window";
import { MetaInfo } from "vue-meta";
import VIcon from "@/components/ui/icon/VIcon.vue";
import WindowLink from "@/components/navigation/WindowLink.vue";
import { updateWindowTitle } from "@/common/navigation/window";
import { AxiosError, AxiosResponse } from "axios";

@Component<ServerFS>({
	components: { VTabLink: WindowLink, VIcon },
	metaInfo(): MetaInfo {
		return {
			title: this.$i18n.t("titles.server.fs.index", {
				server: this.getServer.name,
			}) as string,
		};
	},
	activated(): void {
		updateWindowTitle(
			this.getWindow,
			this.$i18n.t("windows.server.fs.index", {
				server: this.getServer.name,
			}) as string
		);
	},
	mounted(): void {
		this.$http
			.get(`servers/${this.getServer.id}/fs`)
			.then((res: AxiosResponse) => {
				this.disks = res.data.data.disks;
			})
			.catch((err: AxiosError) => {
				console.log("err:", err.response);
			});
	},
})
export default class ServerFS extends mixins(WindowMixin) {
	disks = [];
}
</script>
<style lang="scss" scoped>
.disks {
	display: flex;
	flex-direction: row;

	.disk {
		list-style: none;
		background-color: var(--kt-foreground);
		border-radius: 20px;
		padding: 24px;
		min-width: 25%;

		&:hover {
			text-decoration: none;
			background-color: var(--app-foreground-overlay);
		}

		&:not(:last-child) {
			margin-right: 8px;
		}

		&[active] {
			color: var(--inverse-color);
			background-color: var(--kt-primary-color);
			box-shadow: var(--kt-primary-color) 0 0 8px 0;

			.disk-icon {
				background-color: var(--inverse-color);
			}
		}

		.disk-icon {
			border-radius: 8px;
			background-color: var(--kt-background);
			width: 48px;
			height: 48px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 16px;
			margin-bottom: 12px;

			img {
				width: 28px;
				height: 28px;
				fill: var(--kt-primary-color);
			}
		}

		.disk-info {
			display: flex;
			justify-content: space-between;

			.disk-data {
				.disk-name {
					font-weight: 700;
				}

				.disk-space-text {
					opacity: 0.54;
					font-size: 14px;
					font-weight: 600;
				}
			}
		}
	}
}
</style>
