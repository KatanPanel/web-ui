import { Instance } from "@/features/units/models/instance.model";
import instancesService from "@/features/units/data/instances.service";

class InstancesPresenter {
	async getInstance(id: string): Promise<Instance> {
		return await instancesService.getInstance(id);
	}
}

export default new InstancesPresenter();
