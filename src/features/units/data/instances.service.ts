import {
	Instance,
	InstanceFsBucket,
	InstanceFsFile
} from "@/features/units/models/instance.model";
import instancesGateway from "@/features/units/data/instances.gateway";
import instancesMapper from "@/features/units/data/mappers/instances.mapper";

class InstancesService {
	async getInstance(id: string): Promise<Instance> {
		return instancesGateway
			.getInstance(id)
			.then((response) => instancesMapper.toInstance(response));
	}

	async getFile(
		instanceId: string,
		bucket: string,
		path: string
	): Promise<InstanceFsFile> {
		return instancesGateway
			.getInstanceFile(instanceId, bucket, path)
			.then((response) => instancesMapper.toFile(response));
	}

	async getBucket(
		instanceId: string,
		bucket: string
	): Promise<InstanceFsBucket> {
		return instancesGateway
			.getBucket(instanceId, bucket)
			.then((response) => instancesMapper.toBucket(response));
	}
}

export default new InstancesService();
