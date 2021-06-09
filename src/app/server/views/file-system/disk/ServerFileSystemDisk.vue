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
						<v-input-icon>
							<v-icon name="search" />
						</v-input-icon>
						<v-input placeholder="Procurar por arquivos..." />
					</v-input-group>
				</v-form>
			</section>
			<section id="directories">
				<h4><b>Pastas</b></h4>
				<ul class="disk-directories">
					<li
						v-for="dir in []"
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
import { Component, InjectReactive, Prop, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import VForm from "@/app/shared/components/ui/form/VForm.vue";
import VInputGroup from "@/app/shared/components/ui/form/VInputGroup.vue";
import VInputIcon from "@/app/shared/components/ui/form/VInputIcon.vue";
import VIcon from "@/app/shared/components/ui/icon/VIcon.vue";
import VInput from "@/app/shared/components/ui/form/VInput.vue";
import { generateMetaInfo } from "@/app/shared/utils/builtin";
import { ServerFileSystemDiskModel } from "@/app/server/models/server-file-system.model";
import { ServerService } from "@/app/server/services/server.service";
import { inject } from "inversify-props";
import { ServerModel } from "@/app/server/models/server.model";

@Component<ServerFileSystemDisk>({
	components: { VInput, VIcon, VInputIcon, VInputGroup, VForm },
	metaInfo(): MetaInfo {
		return generateMetaInfo(this.$i18n, "server.fs.disk", {
			server: this.server.name,
			disk: this.diskId
		});
	},
	created(): void {
		this.serverService
			.findServerFileDisk(this.server.id, this.diskId)
			.then((disk) => (this.disk = disk));
	}
})
export default class ServerFileSystemDisk extends Vue {
	disk: ServerFileSystemDiskModel | null = null;
	@Prop({ type: String, required: true })
	private readonly diskId!: string;
	@InjectReactive()
	private readonly server!: ServerModel;
	@inject()
	private readonly serverService!: ServerService;
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
