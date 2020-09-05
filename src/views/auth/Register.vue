<template>
	<v-container>
		<v-box class="v--box-fit">
			<v-box-header>
				<h4>Register Form</h4>
			</v-box-header>
			<v-box-body>
				<v-form @submit="onFormSubmit">
					<v-input-group>
						<v-label>Username</v-label>
						<v-input type="text" v-model="username" />
					</v-input-group>
					<v-input-group>
						<v-label>Password</v-label>
						<v-input type="password" v-model="password" />
					</v-input-group>
					<v-input-group>
						<v-flex-box>
							<a href="#" class="v--flex-child">Forgot your password?</a>
							<v-button type="submit">
								Register
							</v-button>
						</v-flex-box>
					</v-input-group>
				</v-form>
			</v-box-body>
		</v-box>
	</v-container>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
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
@Component({
	components: { VFlexBox, VInput, VLabel, VInputGroup, VForm, VButton, VBoxBody, VBoxHeader, VCol, VRow, VContainer, VBox }
})
export default class Register extends Vue {
 
	username = ""
	password = ""
	
	onFormSubmit(e: Event): void {
		e.preventDefault();
	}
	
}
</script>