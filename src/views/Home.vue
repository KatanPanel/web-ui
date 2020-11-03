<template>
	<v-container class="v--full-height">
		<div
			class="v--flex v--flex-justify-center v--flex-column v--full-height home"
			v-if="!isLoggedIn"
		>
			<h1>
				<b>{{ $t("home.welcome") }}</b>
			</h1>
			<p>{{ $t("home.please-auth") }}</p>
		</div>
		<v-box v-else>
			<v-box-header>
				<h4>Bem-Vindo, {{ getAccount.username }}!</h4>
				<p>
					Essa é a página inicial do Katan, logo abaixo está sua lista
					de servidores disponíveis para gerenciar, divirta-se!
				</p>
			</v-box-header>
			<v-box-body>
				<v-row>
					<v-col :size="6">
						<!-- <i18n path="home.server-list" tag="h4">{{ servers.length }}</i18n> -->
						<ul class="server-list" v-if="servers">
							<li
								v-for="server in servers"
								:key="server.id"
								class="server"
							>
								<div
									:style="{
										'background-image': `url(/img/games/wallpapers/${server.game.toLowerCase()}.gif)`
									}"
									class="server-header"
								/>
								<div class="server-content">
									<div class="server-icon">
										<img
											:title="server.game"
											:src="`img/game-icons/${server.game.toLowerCase()}.png`"
											:alt="`${server.name} icon`"
										>
									</div>
									<div class="server-info">
										<p class="server-name">
											{{ server.name }}
										</p>
									</div>
								</div>
							</li>
						</ul>
						<loading
							v-else
							size="60px"
							class="v--text-align-center"
						/>
					</v-col>
				</v-row>
			</v-box-body>
		</v-box>
	</v-container>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import VContainer from "@/components/ui/layout/VContainer.vue";
import { mixins } from "vue-class-component";
import { AuthMixin } from "@/mixins/auth";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxHeader from "@/components/ui/box/VBoxHeader.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import { AxiosResponse } from "axios";
import Loading from "@/components/Loading.vue";

@Component({
	components: { Loading, VCol, VRow, VBoxBody, VBoxHeader, VBox, VContainer },
})
export default class Home extends mixins<AuthMixin>(AuthMixin) {
	servers: Array<any> | null = null;

	created(): void {
		this.$http.get("/servers").then((res: AxiosResponse) => {
			this.servers = res.data.data;
		});
	}
}
</script>
<style lang="scss" scoped>
.server-list {
	list-style: none;
	display: inline-flex;
	flex-direction: row;

	.server {
		background-color: rgba(0, 0, 0, 0.12);
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		flex: 1 0 auto;
		min-width: 240px;
		min-height: 240px;
		box-shadow: rgba(0, 0, 0, 0.12) 1px 1px 4px 0;
		position: relative;
		justify-content: center;
		align-items: center;

		&:not(:last-child) {
			margin-right: 4px;
		}

		.server-header {
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
			background-attachment: scroll;
			width: 100%;
			height: 50%;
			flex: 1 1 auto;
		}

		.server-content {
			width: 100%;
			background-color: #fff;
			color: #333;

			.server-icon {
				padding: 8px;
				margin-right: 8px;
			}

			.server-icon,
			.server-icon img {
				width: 64px;
				height: 64px;
			}
		}
	}
}
</style>
