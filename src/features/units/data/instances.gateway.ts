import httpService from "@/features/shared/data/http.service";
import { AxiosResponse } from "axios";
import { InstanceResponse } from "@/features/units/data/response/instance.response";

class InstancesGateway {
	async getInstance(id: string): Promise<InstanceResponse> {
		return httpService.get(`instances/${id}`).then((res: AxiosResponse) => {
			console.log("getInstance", res.data);
			return res.data as InstanceResponse;
		});
	}

	async listInstanceFiles(
		instanceId: string,
		bucket: string,
		path?: string
	): Promise<unknown> {
		return httpService
			.get(`instances/${instanceId}/fs/${bucket}/list`, {
				params: {
					path
				}
			})
			.then((res: AxiosResponse) => {
				console.log("listInstanceFiles", res.data);
				return res.data.files;
			});
	}
}

export default new InstancesGateway();
