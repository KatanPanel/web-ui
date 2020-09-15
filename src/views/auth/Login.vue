<template>
	<v-container class="v--flex v--flex-justify-center v--full-height">
		<v-box class="v--box-fit">
			<v-box-header>
				<h4>Sign In</h4>
			</v-box-header>
			<v-box-body>
				<v-form @submit.prevent="onFormSubmit">
					<v-input-group>
						<v-label>Username</v-label>
						<v-input type="text" minlength="4" maxlength="32" required v-model="username" />
					</v-input-group>
					<v-input-group>
						<v-label>Password</v-label>
						<v-input type="password" minlength="8" maxlength="32" required v-model="password" />
					</v-input-group>
					<v-input-group>
						<v-flex-box class="v--flex-justify-end">
							<v-button type="submit" :disabled="$helpers.voca.isBlank(username) || $helpers.voca.isBlank(password)">
								Continue
							</v-button>
						</v-flex-box>
					</v-input-group>
				</v-form>
			</v-box-body>
		</v-box>
	</v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VBox from "@/components/ui/box/VBox.vue";
import VContainer from "@/components/ui/layout/VContainer.vue";
import VRow from "@/components/ui/layout/VRow.vue";
import VCol from "@/components/ui/layout/VCol.vue";
import VBoxHeader from "@/components/ui/box/VBoxHeader.vue";
import VBoxBody from "@/components/ui/box/VBoxBody.vue";
import VButton from "@/components/ui/button/VButton.vue";
import VForm from "@/components/ui/form/VForm.vue";
import VInputGroup from "@/components/ui/form/VInputGroup.vue";
import VLabel from "@/components/ui/form/VLabel.vue";
import VInput from "@/components/ui/form/VInput.vue";
import VFlexBox from "@/components/ui/layout/VFlexBox.vue";
import { MetaInfo } from "vue-meta";

@Component<Login>({
	components: {
		VFlexBox,
		VInput,
		VLabel,
		VInputGroup,
		VForm,
		VButton,
		VBoxBody,
		VBoxHeader,
		VCol,
		VRow,
		VContainer,
		VBox
	},
	metaInfo(): MetaInfo {
		return {
			title: "Login"
		};
	}
})
export default class Login extends Vue {
	
	username = "";
	password = "";
	
	onFormSubmit(e: Event): void {
		e.preventDefault();
	}
	
}
</script>