import { axios } from "@/utils/axios";
import type { AxiosResponse } from "axios";

export type RequestService = {
	readonly request: <K, T = {}>(
		endpoint: string,
		method: string,
		payload?: T
	) => Promise<AxiosResponse<K>>;
};

export function createRequestService(): RequestService {
	return {
		request: (endpoint, method, payload) => {
			return axios.request({
				method,
				data: payload,
				responseType: "json",
				url: endpoint,
				withCredentials: true
			})
		}
	};
}