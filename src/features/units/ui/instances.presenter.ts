import {
	Instance,
	InstanceFsBucket,
	InstanceFsFile
} from "@/features/units/api/models/instance.model";
import instancesService from "@/features/units/api/instances.service";

class InstancesPresenter {
	async getInstance(id: string): Promise<Instance | undefined> {
		return await instancesService.getInstance(id);
	}

	async getFile(
		instanceId: string,
		bucket: string,
		path: string
	): Promise<InstanceFsFile> {
		return await instancesService.getFile(instanceId, bucket, path);
	}

	async readFile(
		instanceId: string,
		bucket: string,
		path: string
	): Promise<string> {
		return await instancesService.readOrDownloadFile(
			instanceId,
			bucket,
			path
		);
	}

	async getBucket(
		instanceId: string,
		bucket: string
	): Promise<InstanceFsBucket> {
		return await instancesService.getBucket(instanceId, bucket);
	}
}

export default new InstancesPresenter();
