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
	<section id="server-list">
		<v-row>
			<v-col :size="6">
				<!-- <v-form>
					<v-input-group class="v--flex v--flex-row">
						<v-input-icon>
							<v-icon name="search" />
						</v-input-icon>
						<div class="v--flex-child">
							<v-label>Filtrar servidor por nome</v-label>
							<v-input
								type="text"
								minlength="2"
								maxlength="32"
								required
								placeholder="ex.: Rede Sinalizações"
							/>
						</div>
					</v-input-group>
				</v-form> -->
				<v-label>Lista de servidores</v-label>
				<div class="server-list">
					<router-link
						:to="{
							name: 'panel.server',
							params: { serverId: server.id.toString() },
						}"
						tag="div"
						v-for="server in serverList"
						:key="server.id"
						class="server"
					>
						<a class="server-info">
							<div class="server-header">
								<div class="server-name">
									<div
										:class="`server-state server-state-${server.state.toLowerCase()}`"
									/>
									{{ server.name }}
								</div>
								<div class="server-ip">
									{{ server.host }}:{{ server.port }}
								</div>
							</div>
							<div class="server-footer">
								<div class="server-viewers">
									<small
										>Não há ninguém visualizando esse
										servidor.</small
									>
								</div>
							</div>
						</a>
						<!-- <div class="server-game">
							<img :src="`/img/games/icons/${server.game.name.toLowerCase()}.png`" :alt="`${server.game.name} icon`">
						</div> -->
					</router-link>
				</div>
			</v-col>
		</v-row>
	</section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AxiosResponse } from "axios";
import VFieldList from "@/components/ui/field/VFieldList.vue";
import VField from "@/components/ui/field/VField.vue";
import VForm from "@/components/ui/form/VForm.vue";
import VInputGroup from "@/components/ui/form/VInputGroup.vue";
import VInput from "@/components/ui/form/VInput.vue";
import VInputIcon from "@/components/ui/form/VInputIcon.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VFieldRadio from "@/components/ui/field/VFieldRadio.vue";
import VButton from "@/components/ui/button/VButton.vue";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VBoxHeader from "@/components/ui/box/VBoxHeader.vue";
import VWall from "@/components/ui/wall/VWall.vue";
import VWallText from "@/components/ui/wall/VWallText.vue";
@Component({
	components: {
		VWallText,
		VWall,
		VBoxHeader,
		VBoxBody,
		VBox,
		VButton,
		VFieldRadio,
		VCol,
		VRow,
		VLabel,
		VIcon,
		VInputIcon,
		VInput,
		VInputGroup,
		VForm,
		VField,
		VFieldList,
	},
})
export default class HomeServerListView extends Vue {
	private serverList: Array<any> = [];

	mounted(): void {
		this.$http("/servers").then((res: AxiosResponse) => {
			this.serverList = res.data.data;
		});
	}
}
</script>
<style lang="scss" scoped>
.server-list {
	display: flex;
	flex-direction: column;

	.server {
		display: flex;
		flex-direction: row;
		justify-content: center;
		border-bottom: 1px solid transparent;

		&:hover {
			cursor: pointer;

			.server-name {
				color: var(--primary-color);
				text-decoration: underline;
			}
		}

		&:not(:last-child) {
			border-bottom-color: rgba(0, 0, 0, 0.06);
		}

		.server-state {
			width: 16px;
			height: 16px;
			border: 4px solid var(--primary-color);
			border-radius: 50%;
			margin-right: 8px;

			&.server-state-offline {
				border-left-color: var(--danger-color);
			}
		}

		.server-info {
			flex: 1 0 auto;
			text-decoration: none;

			.server-header {
				font-weight: 600;
				font-size: 18px;
				padding-top: 12px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.server-name {
					display: flex;
					align-items: center;

					.server-game {
						width: 24px;
						height: 24px;
						margin-right: 12px;
					}
				}

				.server-ip {
					color: var(--muted-color);
					font-size: 12px;
				}
			}

			.server-description {
				font-size: 14px;
				color: var(--muted-color);
			}
		}

		.server-footer {
			padding-bottom: 12px;
			display: flex;
			justify-content: space-between;

			.server-viewers {
				color: var(--muted-color);
				font-style: italic;
			}
		}
	}

	.add-server {
		background-color: #4b7bec;
		color: #ffffff;
		text-transform: uppercase;
		font-size: 14px;
		font-weight: 600;
		padding: 6px;

		svg {
			fill: #ffffff;
			width: 32px;
			height: 32px;
		}
	}
}
</style>
