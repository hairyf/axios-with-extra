import { AxiosStatic, AxiosInstance } from 'axios'
import { isFormData } from '@hairy/libcore'
import isNumber from 'lodash/isNumber'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'

/**
 * 请求时携带一些参数
 * @param axios
 * @param params
 * @param mode
 */
export const withExtraParams = (
  axios: AxiosStatic | AxiosInstance,
  params: object | (() => object),
  mode: '*' | 'params' | 'data' | 'headers' = '*'
) => {
  axios.interceptors.request.use((config) => {
    const assign = (path: keyof typeof config) => {
      if (isFormData(config[path])) return
      if (isNumber(config[path])) return
      if (isString(config[path])) return
      const option = isFunction(params) ? params() : params
      config[path] = { ...option, ...config[path] }
    }
    if (mode === '*') {
      assign('params')
      assign('data')
      assign('headers')
    }
    if (mode === 'params') assign('params')
    if (mode === 'data') assign('data')
    if (mode === 'headers') assign('headers')
    return config
  })
}
