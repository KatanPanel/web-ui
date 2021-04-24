<template>
	<div class="server-fs">
		<h2>Gerenciador de Arquivos</h2>
		<p class="v--text-muted">
			Selecione um disco de armazenamento para explorar sua árvore de
			arquivos.
		</p>
		<section id="storage">
			<p class="v--text-muted v--m-bottom-3">
				Selecione um disco de armazenamento para explorar sua árvore de
				arquivos.
			</p>
			<div class="disks">
				<WindowLink
					v-for="disk in disks"
					:key="disk.id"
					:to="{ name: 'server.fs.disk', params: { disk: disk.id } }"
					:window="window"
					tag="a"
					class="disk"
				>
					<div class="disk-info">
						<div class="disk-data">
							<h6 class="disk-name">{{ disk.name }}</h6>
							<!-- <p class="disk-space-text">
								{{ $helpers.filesize(disk.spaceAvailable) }} /
								{{ $helpers.filesize(disk.spaceMax) }}
							</p> -->
						</div>
					</div>
				</WindowLink>
			</div>
			<hr />
		</section>
	</div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import WindowMixin from "@/shared/mixins/window";
import VIcon from "@/components/ui/icon/VIcon.vue";
import PanelWindowLink from "@/components/modules/panel/PanelWindowLink.vue";
import { AxiosError, AxiosResponse } from "axios";

@Component<ServerFS>({
	components: { WindowLink: PanelWindowLink, VIcon },
	mounted(): void {
		this.$http
			.get(`servers/${this.getServer.id}/fs`)
			.then((res: AxiosResponse) => {
				console.log("Res;", res.data);
				this.disks = res.data.data.disks;
			})
			.catch((err: AxiosError) => {
				console.log("err:", err.response);
			});
	}
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
		background-color: var(--kt-background-secondary);
		border-radius: 20px;
		padding: 24px;
		min-width: 25%;

		&:hover {
			text-decoration: none;
			background-color: var(--kt-background-tertiary);
		}

		&:not(:last-child) {
			margin-right: 8px;
		}

		&[active] {
			color: var(--kt-primary-text-color);
			background-color: var(--kt-primary-color);
			box-shadow: var(--kt-primary-color) 0 0 8px 0;

			.disk-icon {
				background-color: var(--kt-primary-text-color);
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
