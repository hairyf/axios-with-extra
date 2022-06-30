import { AxiosStatic, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface RequestPacker {
  (config: AxiosRequestConfig, request: AxiosInstance['request']): Promise<AxiosResponse> | AxiosResponse
}

export function withRequestPacker(axios: AxiosStatic | AxiosInstance, caller: RequestPacker) {
  const request = axios.request.bind(axios)
  axios.request = function (configOrUrl: any, config: any) {
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    return caller(config, request) || request(config)
  } as any
}
