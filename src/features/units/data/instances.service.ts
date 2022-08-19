import {
	Instance,
	InstanceStatus,
	InstanceUpdatePolicy
} from "@/features/units/models/instance.model";
import { InstanceResponse } from "@/features/units/data/response/instance.response";
import instancesGateway from "@/features/units/data/instances.gateway";
import { isUndefined } from "@/utils";

class InstancesService {
	async getInstance(id: string): Promise<Instance> {
		return instancesGateway
			.getInstance(id)
			.then((response: InstanceResponse) => {
				return InstancesService.toInstanceDomain(response);
			});
	}

	private static toInstanceDomain(response: InstanceResponse): Instance {
		return {
			id: response.id,
			status: response.status as InstanceStatus,
			containerId: response["container-id"],
			updatePolicy: response["update-policy"] as InstanceUpdatePolicy,
			connection: isUndefined(response.connection)
				? undefined
				: {
						host: response.connection?.host,
						port: response.connection?.port
				  }
		};
	}
}

export default new InstancesService();
