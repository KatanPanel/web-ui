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
	<div class="game-library-info">
		<small class="v--text-cute">Visualizando jogo</small>
		<v-row>
			<v-col :size="6">
				<v-box :no-shadow="true">
					<v-box-body>
						<v-flex-box>
							<img
								:alt="`${game.name} picture`"
								:src="`/img/games/icons/${game.name.toLowerCase()}.png`"
								class="game-pic"
							/>
							<div class="game-info">
								<p
									class="game-name v--text-primary"
									v-text="game.name"
								/>
								<small class="game-image" v-text="game.image" />
							</div>
						</v-flex-box>
						<hr />
						<p class="v--text-cute">
							Versões — {{ game.versions.length }}
						</p>
						<v-field-list>
							<v-field
								v-for="version in game.versions"
								:key="version.name"
								:active-on-click="true"
								class="game-version-field"
							>
								{{ version.name }}
								<template slot="content">
									<div>
										<v-flex-box
											v-for="(value, key) in mapEnvVars(
												version.environment
											)"
											:key="key"
										>
											<p
												class="v--text-muted v--flex-child"
											>
												{{ key }}
											</p>
											<code
												:class="
													handleEnvVarValueTypes(
														value
													)
												"
												>{{ value }}</code
											>
										</v-flex-box>
									</div>
								</template>
							</v-field>
						</v-field-list>
						<small
							class="v--link v--text-muted-darker v--m-top-5"
							@click="$emit('k-back')"
						>
							Retornar para a lista de jogos da biblioteca
						</small>
					</v-box-body>
				</v-box>
			</v-col>
			<v-col :size="6">
				<v-box :no-shadow="true">
					<v-box-body>
						<p class="v--text-cute">Detalhes de Configuração</p>
						<div>
							<v-label>Valor de porta</v-label>
							<p>
								<code v-text="game.settings.ports.start" />
								~
								<code v-text="game.settings.ports.end" />
							</p>
						</div>
						<div class="v--m-top-2">
							<v-label>Valor máximo de porta</v-label>
							<p>
								<code v-text="game.settings.ports.end" />
							</p>
						</div>
					</v-box-body>
				</v-box>
				<v-box :no-shadow="true" class="v--m-top-2">
					<v-box-body>
						<p class="v--text-cute">
							Variáveis de ambiente —
							{{ Object.keys(game.environment).length }}
						</p>
						<v-flex-box
							v-for="(value, key) in activeGameStaticEnvVars"
							:key="key"
						>
							<p class="v--text-muted v--flex-child">
								{{ key }}
							</p>
							<code :class="handleEnvVarValueTypes(value)">{{
								value
							}}</code>
						</v-flex-box>
						<hr />
						<small class="v--text-cute v--m-top-4"
							>Valores indeterminados</small
						>
						<p class="v--text-muted-darker v--m-bottom-3">
							Os valores das seguintes chaves só ficam disponíveis
							durante a construção do servidor.
						</p>
						<p>
							<code
								v-for="key in activeGameDynamicEnvVars"
								:key="key"
								class="envvar"
								>{{ key }}</code
							>
						</p>
					</v-box-body>
				</v-box>
			</v-col>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import VFieldList from "@/components/ui/field/VFieldList.vue";
import VField from "@/components/ui/field/VField.vue";
import VLabel from "@/components/ui/form/VLabel.vue";

@Component({
	components: {
		VLabel,
		VField,
		VFieldList,
		VFlexBox,
		VBoxBody,
		VBox,
		VCol,
		VRow
	}
})
export default class GameInfo extends Vue {
	@Prop({ type: Object, required: true }) private readonly game!: any;

	get activeGameStaticEnvVars() {
		return this.mapEnvVars(this.game.environment);
	}

	get activeGameDynamicEnvVars(): string[] {
		const env = this.game.environment;
		return Object.keys(env).filter((key: any) => this.isVariable(env[key]));
	}

	isVariable(value: any): boolean {
		const strVal = value.toString();
		return strVal.charAt(0) === "%";
	}

	mapEnvVars(env: any): any {
		const obj: any = {};

		for (const entry of Object.entries(env).filter(
			(entry) => !this.isVariable(entry[1])
		)) {
			obj[entry[0]] = entry[1];
		}

		return obj;
	}

	handleEnvVarValueTypes(value: any): string[] {
		const classes = ["envvar-value"];
		if (typeof value === "boolean") {
			classes.push(
				value ? "envvar-value-bool-true" : "envvar-value-bool-false"
			);
		}

		if (value === "latest") classes.push("envvar-value-latest");

		return classes;
	}
}
</script>
<style lang="scss" scoped>
.game-library-info {
	.game-pic {
		width: 40px;
		height: 40px;
		margin-right: 12px;
	}

	.game-info {
		line-height: 1;

		.game-name {
			font-weight: 600;
			font-size: 18px;
		}

		.game-image {
			color: var(--kt-muted-darker-color);
		}
	}

	.game-env {
		list-style: none;
	}

	.envvar {
		cursor: default;

		&:not(:last-child) {
			margin-right: 16px;
		}
	}

	.envvar-value {
		cursor: default;
	}

	.envvar-value-bool-true {
		color: var(--kt-success-color);
	}

	.envvar-value-bool-false {
		color: var(--kt-danger-color);
	}

	.envvar-value-latest {
		color: var(--kt-primary-color);
	}
}
</style>
