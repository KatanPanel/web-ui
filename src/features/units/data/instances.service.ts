import {
	Instance,
	InstanceFsBucket,
	InstanceFsFile
} from "@/features/units/models/instance.model";
import instancesGateway from "@/features/units/data/instances.gateway";
import instancesMapper from "@/features/units/data/mappers/instances.mapper";
import { HttpError, HttpErrors } from "@/features/shared/models/error.model";

class InstancesService {
	private textDecoder = new TextDecoder();

	async getInstance(id: string): Promise<Instance | undefined> {
		return instancesGateway
			.getInstance(id)
			.then((response) => instancesMapper.toInstance(response))
			.catch((error: Error) => {
				if (
					error instanceof HttpError &&
					error.code == HttpErrors.UnknownInstance
				)
					return undefined;

				throw error;
			});
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

	async readOrDownloadFile(
		instanceId: string,
		bucket: string,
		path: string
	): Promise<string> {
		return instancesGateway
			.readFile(instanceId, bucket, path)
			.then((res) => {
				return this.textDecoder.decode(res.data, {
					stream: false
				});
			});
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
