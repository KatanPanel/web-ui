<template>
	<VCard>
		<codemirror
			v-model="contentsAsString"
			placeholder="Write something here..."
		/>
	</VCard>
</template>

<script lang="ts">
import { Component, Inject, Vue } from "vue-facing-decorator";
import {
	Instance,
	InstanceFsBucket,
	InstanceFsFile
} from "@/features/units/api/models/instance.model";
import instancesPresenter from "@/features/units/ui/instances.presenter";
import VCard from "@/features/platform/ui/components/card/VCard.vue";

@Component({
	components: { VCard }
})
export default class InstanceFsBucketFileContent extends Vue {
	@Inject() private readonly instance!: Instance;
	@Inject() private readonly bucket!: InstanceFsBucket;
	@Inject() private readonly file!: InstanceFsFile;

	contentsAsString = "";
	linesCount = 0;

	created() {
		instancesPresenter
			.readFile(
				this.instance.id,
				this.bucket.name,
				this.file.absolutePath
			)
			.then((buf) => this.update(buf.toString()));
	}

	mounted() {}

	update(text: string) {
		this.contentsAsString = text;
		this.linesCount = (text.match(/\n/g) || "").length;
	}

	onTextInputChanged(event: Event) {
		console.log("event", event);
		this.update((event.target as HTMLElement).innerText);
	}
}
</script>

<style lang="scss" module>
.root {
	display: flex;
	flex-direction: row;
	margin-top: -2.4rem;
	position: relative;
	padding-bottom: 2.4rem;
	z-index: 1;

	:deep(.cm-editor) {
		width: 100%;
	}
}

.textarea {
	margin: 2.4rem;
	width: 100%;
	background-color: var(--kt-background-surface);
	position: relative;
}

.details {
	position: sticky;
	bottom: 0;
	background-color: var(--kt-background-surface);
	padding: 1.2rem;
	margin-left: 3.6rem;
	justify-content: flex-end;
	display: flex;
}
</style>
