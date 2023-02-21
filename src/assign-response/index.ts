import { AxiosStatic, AxiosInstance, AxiosResponse } from 'axios'
/**
 * 根据 expands 规则合并 response 和 data
 *
 * 由于执行顺序规则，axiosWithAssignResponse 应该最先被调用
 *
 * 合并后需要自行 declare module "axios" 补充类型
 *
 * @param axios
 * @param expands
 */
export const withAssignResponse = (axios: AxiosStatic | AxiosInstance, expands: '*' | (string | [string, string])[] = '*') => {
  const assign = (response: AxiosResponse, data: any) => {
    if (!data || typeof data !== 'object' || Array.isArray(data))
      return
    if (!expands.length)
      return
    if (expands === '*') {
      for (const key of Object.keys(data))
        extend(response, data, key)
      return
    }
    for (const keys of expands) {
      const field = isArray(keys) ? keys[0] : keys
      const key = isArray(keys) ? keys[1] : keys
      extend(response, data, field, key)
    }
  }
  axios.interceptors.response.use(
    (response) => {
      assign(response, response.data)
      return response
    },
    (error) => {
      assign(error.response, error.response?.data)
      return Promise.reject(error)
    }
  )
}


function extend(target: any, source: any, field: string, key = field  ) {
  if (typeof source[field] !== 'undefined')
    target[key] = source[field]
}

function isArray(arg: any): arg is any[] {
  return Array.isArray(arg)
}