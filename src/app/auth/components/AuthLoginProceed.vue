<template>
	<div>
		<h2 class="title">
			<b>Olá, {{ username }}</b>
		</h2>
		<v-flex-box>
			<v-flex-element>
				<v-button
					:full-width="true"
					:primary="true"
					class="v--m-top-1"
					type="button"
					@click="continueAs"
				>
					{{ $t("views.login.fields.confirm-logged-in", { username }) }}
				</v-button>
			</v-flex-element>
			<v-flex-element>
				<v-button
					:full-width="true"
					:primary="true"
					class="v--m-top-1"
					type="button"
					@click="continueAs"
				>
					{{ $t("views.login.fields.confirm-logged-in", { username }) }}
				</v-button>
			</v-flex-element>
		</v-flex-box>
	</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import VButton from "@/app/shared/components/ui/button/VButton.vue";
import VFlexBox from "@/app/shared/components/ui/layout/VFlexBox.vue";
import VFlexElement from "@/app/shared/components/ui/layout/VFlexElement.vue";

@Component({
	components: { VFlexElement, VFlexBox, VButton }
})
export default class AuthLoginProceed extends Vue {
	@Prop({ type: String, required: true })
	private readonly username!: string;

	continueAs() {
		this.withLock(() => window.location.reload());
	}
}
</script>
