import { Instance } from "@/features/units/models/instance.model";
import instancesService from "@/features/units/data/instances.service";

class InstancesPresenter {
	async getInstance(id: string): Promise<Instance> {
		return await instancesService.getInstance(id);
	}

	async getBucketFiles(
		instanceId: string,
		bucket: string,
		path: string
	): Promise<unknown> {
		return await instancesService.getBucketFiles(instanceId, bucket, path);
	}
}

export default new InstancesPresenter();
