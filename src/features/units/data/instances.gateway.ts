import httpService from "@/features/shared/data/http.service";
import { AxiosResponse } from "axios";
import { InstanceResponse } from "@/features/units/data/response/instance.response";

class InstancesGateway {
	async getInstance(id: string): Promise<InstanceResponse> {
		return httpService.get(`instances/${id}`).then((res: AxiosResponse) => {
			console.log("data", res.data);
			return res.data as InstanceResponse;
		});
	}
}

export default new InstancesGateway();
