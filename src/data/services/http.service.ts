import Axios, {
	AxiosDefaults,
	AxiosError,
	AxiosInstance,
	AxiosPromise,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios";
import configService from "@/data/services/config.service";
import { isUndefined } from "@/utils";
import { HttpError, KatanError } from "@/domain/models/error.model";
import logService from "@/data/services/log.service";

class HttpService {
	private readonly axios: AxiosInstance;

	constructor() {
		this.axios = Axios.create({
			baseURL: configService.apiUrl,
			timeout: 5000,
			headers: {
				"Content-Type": "application/json",
			},
		});

		this.axios.interceptors.response.use(
			(response: AxiosResponse) => response,
			(error: AxiosError) => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const data: any = error.response?.data;
				if (isUndefined(data.code)) {
					logService.error("Unhandled HTTP error", error);
					return;
				}

				throw new HttpError(data as KatanError);
			}
		);
	}

	defaults(): AxiosDefaults {
		return this.axios.defaults;
	}

	get(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this.axios.get(url, config);
	}

	post<T>(url: string, data?: T, config?: AxiosRequestConfig): AxiosPromise {
		return this.axios.post(url, data, config);
	}

	patch<T>(url: string, data?: T, config?: AxiosRequestConfig): AxiosPromise {
		return this.axios.patch(url, data, config);
	}

	delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
		return this.axios.delete(url, config);
	}
}

export default new HttpService();
