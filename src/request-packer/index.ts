import { AxiosStatic, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface RequestPackerCaller {
  (config: AxiosRequestConfig, request: AxiosInstance['request']): any
}

export function withRequestPacker(axios: AxiosStatic | AxiosInstance, caller: RequestPackerCaller) {
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
