import httpService from "@/features/platform/api/http.service";
import { AxiosResponse } from "axios";
import {
	InstanceFsBucketResponse,
	InstanceFsFileResponse,
	InstanceFsReadFileResponse,
	InstanceResponse
} from "@/features/units/api/response/instance.response";
import { InstanceStatusUpdateCode } from "@/features/units/api/models/instance.model";

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
			.then((response: AxiosResponse) => response.data);
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
					data: response.data,
					contentType: response.headers["Content-Type"],
					contentLength: Number(response.headers["Content-Length"])
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

	async updateInstanceStatus(
		instanceId: string,
		status: InstanceStatusUpdateCode
	): Promise<unknown> {
		return httpService.post(`instances/${instanceId}/status`, {
			code: status
		});
	}
}

export default new InstancesGateway();
