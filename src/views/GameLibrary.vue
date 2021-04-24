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
	<v-row class="games-library">
		<v-col :size="11">
			<h1 class="v--m-bottom-2">
				<b>{{ $t("views.game-library.title") }}</b>
			</h1>
			<i18n
				class="v--text-muted"
				path="views.game-library.description"
				tag="p"
			>
				<template #path>
					<span class="v--text-primary"><code>games</code></span>
				</template>
			</i18n>
			<hr />
			<transition
				:name="
					activeGame === null
						? 'v--transition-slide-lr'
						: 'v--transition-slide-rl'
				"
				mode="out-in"
			>
				<section
					v-if="activeGame === null"
					id="library"
					key="viewing-library"
				>
					<v-row>
						<v-col :size="6">
							<v-box :no-shadow="true">
								<v-box-body>
									<p class="v--text-cute">
										{{
											$t(
												"views.game-library.fields.filters",
												{ count: 2 }
											)
										}}
									</p>
									<v-flex-box class="v--flex-align-center">
										<v-label
											:style="{ flex: '1 0 auto' }"
											class="v--m-right-2"
										>
											{{
												$t(
													"views.game-library.labels.show-only"
												)
											}}
										</v-label>
										<v-select
											:options="[
												{
													id: 'my-games',
													value: this.$i18n.t(
														'views.game-library.options.my-games'
													),
													active: true
												}
											]"
											@change="updateOrder"
										/>
									</v-flex-box>
									<v-flex-box
										class="v--flex-align-center v--m-top-1"
									>
										<v-label
											:style="{ flex: '1 0 auto' }"
											class="v--m-right-2"
											>{{
												$t(
													"views.game-library.labels.order-by"
												)
											}}
										</v-label>
										<v-select
											:options="[
												{
													id: 'sort-az',
													value: $t(
														'views.game-library.sorting.a-z'
													),
													active: true
												},
												{
													id: 'sort-za',
													value: $t(
														'views.game-library.sorting.z-a'
													)
												}
											]"
											@change="updateOrder"
										/>
									</v-flex-box>
								</v-box-body>
							</v-box>
						</v-col>
					</v-row>
					<v-box :no-shadow="true" class="v--m-top-2">
						<v-box-body>
							<p class="v--text-muted v--m-bottom-2">
								{{
									$t(
										"views.game-library.click-to-see-game-details"
									)
								}}
							</p>
							<transition-group
								class="game-list"
								name="v--transition-fast-list"
								tag="ul"
							>
								<GameLibraryCard
									v-for="game in games"
									:key="game.name"
									:game="game"
									class="v--transition-fast-list-item"
									@click.native="switchActiveGame(game)"
								/>
							</transition-group>
						</v-box-body>
					</v-box>
					<h4 class="v--m-top-5">
						{{ $t("views.game-library.looking-for-more") }}
					</h4>
					<i18n
						class="v--text-muted"
						path="views.game-library.new-games"
						tag="p"
					>
						<template v-slot:docs>
							<a :href="$website.url" target="_blank">{{
								$t("views.game-library.docs")
							}}</a>
						</template>
					</i18n>
				</section>
				<section v-else id="current-game" key="viewing-game">
					<GameInfo
						:game="activeGame"
						@k-back="switchActiveGame(null)"
					/>
				</section>
			</transition>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MetaInfo } from "vue-meta";
import VContainer from "@/components/ui/layout/VContainer.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import { generateMetaInfo } from "@/utils/component";
import VWall from "@/components/ui/wall/VWall.vue";
import VBox from "@/components/ui/box/VBox.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VBoxHeader from "@/components/ui/box/VBoxHeader.vue";
import VIcon from "@/components/ui/icon/VIcon.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import VFieldList from "@/components/ui/field/VFieldList.vue";
import VField from "@/components/ui/field/VField.vue";
import VFieldRadio from "@/components/ui/field/VFieldRadio.vue";
import Copyable from "@/components/shared/Copyable.vue";
import GameInfo from "@/components/modules/panel/game-library/GameInfo.vue";
import GameLibraryCard from "@/components/modules/panel/game-library/GameLibraryCard.vue";
import VForm from "@/components/ui/form/VForm.vue";
import VInputGroup from "@/components/ui/form/VInputGroup.vue";
import VInput from "@/components/ui/form/VInput.vue";
import VSelect from "@/components/ui/form/VSelect.vue";
import VSelectOption from "@/components/ui/form/VSelectOption.vue";
import { sortAlphabetically, sortAlphabeticallyInversed } from "@/utils/arrays";

type Game = {
	id: string;
	name: string;
};

@Component<GameLibrary>({
	components: {
		VSelectOption,
		VSelect,
		VInput,
		VInputGroup,
		VForm,
		GameLibraryCard,
		GameInfo,
		Copyable,
		VFieldRadio,
		VField,
		VFieldList,
		VFlexBox,
		VLabel,
		VIcon,
		VBoxHeader,
		VBoxBody,
		VBox,
		VWall,
		VCol,
		VRow,
		VContainer
	},
	metaInfo(): MetaInfo {
		return generateMetaInfo("game-library");
	},
	created(): void {
		this.$api.info.getGames().then((games: any[]) => {
			this.games = games;
		});
	}
})
export default class GameLibrary extends Vue {
	private games: Game[] = [];
	private activeGame: Game | null = null;

	switchActiveGame(game: any): void {
		if (this.activeGame !== null && this.activeGame === game) {
			this.activeGame = null;
			return;
		}

		this.activeGame = game;
	}

	updateOrder(value: any) {
		switch (value.id) {
			case "sort-az": {
				sortAlphabetically(this.games, "name");
				break;
			}
			case "sort-za": {
				sortAlphabeticallyInversed(this.games, "name");
				break;
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.games-library .game-list {
	list-style: none;
	display: flex;
}
</style>
