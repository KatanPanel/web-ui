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
				<!-- <WindowLink
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
							<p class="disk-space-text">
								{{ $helpers.filesize(disk.spaceAvailable) }} /
								{{ $helpers.filesize(disk.spaceMax) }}
							</p>
						</div>
					</div>
				</WindowLink> -->
			</div>
			<hr />
		</section>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ServerFS extends Vue {}
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
