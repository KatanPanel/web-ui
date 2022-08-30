<template>
	<tr :class="$style.root" @contextmenu.prevent.stop="onRootInteract($event)">
		<td :class="$style.row">
			<router-link :to="getRoute()" :class="$style.link">
				<VIcon :name="getIcon()" :class="$style.icon" />
				<span :class="$style.name">{{ fileName }}</span>
			</router-link>
		</td>
		<td>{{ toHumanReadableSize() }}</td>
		<td>{{ lastModified }}</td>
	</tr>
	<vue-simple-context-menu
		:element-id="`context-menu-${index}`"
		:options="createContextMenuOptions()"
		@option-clicked="onContextMenuItemClick"
		ref="contextMenu"
	/>
</template>

<script lang="ts">
import { Component, Inject, Prop, Ref, Vue } from "vue-facing-decorator";
import { InstanceFsBucket } from "@/features/units/models/instance.model";
import filesize from "filesize";
import VIcon from "@/features/shared/ui/components/design-system/icon/VIcon.vue";
import { isUndefined } from "@/utils";
import { RouteLocationRaw } from "vue-router";
import { ComponentPublicInstance } from "vue";

@Component({
	components: { VIcon }
})
export default class InstanceFsBucketFileListItem extends Vue {
	@Inject()
	private readonly bucket!: InstanceFsBucket;

	@Prop({ type: Number, required: true })
	private readonly index!: number;

	@Prop({ type: String, required: true })
	private readonly fileName!: string;

	@Prop({ type: Number, required: true })
	private readonly size!: number;

	@Prop({ type: Boolean, default: false })
	private readonly isHidden!: boolean;

	@Prop({ type: Boolean, required: true })
	private readonly isDirectory!: boolean;

	@Prop({ type: Date })
	private readonly lastModified!: Date | undefined;

	@Ref
	private readonly contextMenu!: ComponentPublicInstance & {
		showMenu(event: PointerEvent, item: any);
	} & unknown;

	onRootInteract(event: PointerEvent) {
		console.log("context menu", this.contextMenu);
		this.contextMenu.showMenu(event, this);
	}

	onContextMenuItemClick(item: any) {
		window.alert("clicked @ " + item);
	}

	createContextMenuOptions(): any[] {
		return [
			{
				name: "Renomear",
				slug: "abc"
			},
			{
				name: "Deletar",
				slug: "def"
			}
		];
	}

	getRoute(): RouteLocationRaw {
		const currPath = this.$route.query.path || "";

		return this.$router.resolve({
			query: {
				path: currPath + "/" + this.fileName
			}
		});
	}

	getFileNameWithoutExtension(): string {
		const fname = this.fileName;
		const dotIndex = fname.lastIndexOf(".");
		if (dotIndex === -1) return fname;

		return fname.substring(0, dotIndex);
	}

	getFileExtension(): string | undefined {
		const fname = this.fileName;
		const dotIndex = fname.lastIndexOf(".");
		if (dotIndex === -1) return undefined;

		return fname.substring(dotIndex + 1, fname.length);
	}

	getIcon(): string {
		if (this.isHidden)
			return this.isDirectory ? "FolderHidden" : "FileHidden";

		if (this.isDirectory) {
			return "FolderOutline";
		}

		const ext = this.getFileExtension();
		if (!isUndefined(ext)) {
			if (["jpg", "jpeg", "png", "gif"].includes(ext))
				return "FileImageOutline";

			if (ext === "json") return "FileCodeOutline";
			if (ext === "txt") return "FileDocumentOutline";
		}

		return "FileOutline";
	}

	toHumanReadableSize(): string {
		return filesize(this.size);
	}
}
</script>
<style lang="scss" module>
.root {
	width: 100%;
	&:hover {
		background-color: var(--kt-background-surface-hover);
	}
}

.icon {
	color: var(--kt-content-primary);
	background-color: var(--kt-content-primary-overlay);
	padding: 4px;
	border-radius: 8px;
	margin-right: 0.8rem;
}

.name {
	align-self: center;
	font-weight: 600;
	margin-top: 0.6rem;
	flex-grow: 1;
}

.row {
	margin: 0.8rem 0;
}

.link {
	display: flex;
	flex-direction: row;
	width: 100%;
}
</style>
