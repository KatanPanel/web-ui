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
	<div class="disk" v-if="disk">
		<div class="disk-navigation">&nbsp;</div>
		<div class="disk-content">
			<section id="search">
				<v-form>
					<v-input-group class="disk-search v--flex v--flex-row">
						<v-input-icon><v-icon name="search" /></v-input-icon>
						<v-input placeholder="Procurar por arquivos..." />
					</v-input-group>
				</v-form>
			</section>
			<section id="directories">
				<h4><b>Pastas</b></h4>
				<ul class="disk-directories">
					<li
						v-for="dir in getOnlyDirectories"
						:key="dir.name"
						class="directory"
					>
						<div class="directory-icon">
							<v-icon name="folder" />
						</div>
						<div class="directory-name">
							{{ dir.name }}
						</div>
						<div class="directory-file-count">0 arquivos</div>
					</li>
				</ul>
			</section>
			<section id="recent-modified-files">
				<h4 class="v--m-top-4"><b>Arquivos recentes</b></h4>
			</section>
		</div>
	</div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import {mixins} from "vue-class-component";
import WindowMixin from "@/mixins/window";
import {updateWindowTitle} from "@/common/navigation/window";
import {MetaInfo} from "vue-meta";
import {AxiosError, AxiosResponse} from "axios";
import VForm from "@/components/ui/form/VForm.vue";
import VInputGroup from "@/components/ui/form/VInputGroup.vue";
import VInputIcon from "@/components/ui/form/VInputIcon.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VInput from "@/components/ui/form/VInput.vue";

@Component<ServerFSDisk>({
	components: {VInput, VIcon, VInputIcon, VInputGroup, VForm},
	metaInfo(): MetaInfo {
		return {
			title: this.$i18n.t("titles.server.fs.disk", {
				server: this.getServer.name,
				disk: this.getDiskId,
			}) as string,
		};
	},
	activated(): void {
		updateWindowTitle(
			this.getWindow,
			this.$i18n.t("windows.server.fs.disk", {
				disk: this.getDiskId,
			}) as string
		);
	},
	mounted(): void {
		this.$http
			.get(`servers/${this.getServer.id}/fs/disks/${this.getDiskId}`)
			.then((res: AxiosResponse) => {
				this.disk = res.data.data.disk;

				this.$http
					.get(
						`servers/${this.getServer.id}/fs/disks/${this.getDiskId}/files`
					)
					.then((res: AxiosResponse) => {
						this.files = res.data.data.files;
					})
					.catch((err: AxiosError) => {
						console.log("err:", err.response);
					});
			})
			.catch((err: AxiosError) => {
				console.log("err:", err.response);
			});
	},
})
export default class ServerFSDisk extends mixins(WindowMixin) {
	private disk: any | null = null;
	private files: any[] = [];

	private get getDiskId(): string {
		return this.getWindowParameter("disk");
	}

	private get getOnlyDirectories(): any[] {
		return this.files.filter((file: any) => file["is_directory"]);
	}
}
</script>
<style lang="scss">
.disk {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	.disk-navigation {
		position: sticky;
		min-width: 20%;
	}

	.disk-content {
		position: relative;
		flex: 1 0 auto;
		margin-left: 24px;
	}

	.disk-search {
		padding: 8px 0;
		background-color: var(--kt-background-secondary) !important;
		border: 1px solid var(--kt-background-tertiary);
		margin-bottom: 24px;

		input {
			padding: 0 !important;
			background-color: var(--kt-background-secondary) !important;
			flex: 1;
			font-size: 16px;
			margin-left: 8px;

			&::placeholder {
				opacity: 0.38;
			}
		}

		svg {
			fill: var(--kt-primary-color);
			width: 20px;
			height: 20px;
		}
	}

	.disk-directories {
		display: flex;
		flex-direction: row;
		overflow-x: hidden;

		&::-webkit-scrollbar-track {
			border-radius: 8px;
			background-color: var(--kt-background-secondary);
		}

		&::-webkit-scrollbar {
			height: 6px;
			background-color: var(--kt-background-secondary);
		}

		&::-webkit-scrollbar-thumb {
			border-radius: 8px;
			background-color: var(--kt-primary-color);
		}

		.directory {
			list-style: none;
			background-color: var(--kt-background-secondary);
			border-radius: 8px;
			padding: 18px;
			max-width: 200px;
			flex: 1 0 19%;
			margin-bottom: 8px;

			&:not(:last-child) {
				margin-right: 8px;
			}

			.directory-icon {
				margin-bottom: 8px;

				svg {
					width: 32px;
					height: 32px;
					fill: var(--kt-primary-color);
				}
			}

			.directory-name {
				font-size: 20px;
				font-weight: 600;
			}

			.directory-file-count {
				font-size: 14px;
				opacity: 0.54;
			}
		}
	}
}
</style>
