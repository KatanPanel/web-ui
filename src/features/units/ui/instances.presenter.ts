import {
	Instance,
	InstanceFsBucket,
	InstanceFsFile
} from "@/features/units/models/instance.model";
import instancesService from "@/features/units/data/instances.service";

class InstancesPresenter {
	async getInstance(id: string): Promise<Instance> {
		return await instancesService.getInstance(id);
	}

	async getFile(
		instanceId: string,
		bucket: string,
		path: string
	): Promise<InstanceFsFile> {
		return await instancesService.getFile(instanceId, bucket, path);
	}

	async getBucket(
		instanceId: string,
		bucket: string
	): Promise<InstanceFsBucket> {
		return await instancesService.getBucket(instanceId, bucket);
	}
}

export default new InstancesPresenter();
