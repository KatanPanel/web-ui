import httpService from "@/features/shared/data/http.service";
import { AxiosResponse } from "axios";
import {
	InstanceFsBucketResponse,
	InstanceFsFileResponse,
	InstanceFsReadFileResponse,
	InstanceResponse
} from "@/features/units/data/response/instance.response";

class InstancesGateway {
	async getInstance(id: string): Promise<InstanceResponse> {
		return httpService
			.get(`instances/${id}`)
			.then((response: AxiosResponse) => response.data);
	}

	async getInstanceFile(
		instanceId: string,
		bucket: string,
		path?: string
	): Promise<InstanceFsFileResponse> {
		return httpService
			.get(`instances/${instanceId}/fs/${bucket}/file`, {
				params: { path }
			})
			.then((response: AxiosResponse) => {
				console.log("response", response.data);
				return response.data;
			});
	}

	async readFile(
		instanceId: string,
		bucket: string,
		path: string
	): Promise<InstanceFsReadFileResponse> {
		return httpService
			.get(`instances/${instanceId}/fs/${bucket}/file/read`, {
				params: { path },
				responseType: "arraybuffer"
			})
			.then((response: AxiosResponse) => {
				return {
					contentLength: Number(response.headers["Content-Length"]),
					data: response.data
				};
			});
	}

	async getBucket(
		instanceId: string,
		bucket: string
	): Promise<InstanceFsBucketResponse> {
		return httpService
			.get(`instances/${instanceId}/fs/${bucket}`)
			.then((response: AxiosResponse) => response.data);
	}
}

export default new InstancesGateway();
