import type { AxiosInstance, AxiosStatic, InternalAxiosRequestConfig } from 'axios'
import { isFormData } from './utils'

export type ExtraField = 'params' | 'data' | 'headers' | 'auth'
/**
 * Add extra parameters to requests
 *
 * This interceptor allows you to automatically include additional parameters
 * in every request, such as authentication tokens, API keys, or other common parameters.
 * The extra parameters can be provided as a static object or a function that returns
 * an object (useful for dynamic values like tokens from localStorage).
 *
 * @param axios - The Axios instance or static object to apply the interceptor to
 * @param field - The request field to add parameters to ('params', 'data', 'headers', or 'auth')
 * @param params - Object containing extra parameters or a function that returns such an object
 */
export function withParamsExtra(
  axios: AxiosStatic | AxiosInstance,
  field: ExtraField,
  params: object | (() => object),
): void {
  axios.interceptors.request.use((config) => {
    const assign = (path: keyof typeof config): InternalAxiosRequestConfig<any> | undefined => {
      // Skip if the target is FormData (can't merge objects into FormData)
      if (isFormData(config[path]))
        return

      // Only proceed if the target is undefined or an object
      if (typeof config[path] === 'undefined' || typeof config[path] === 'object') {
        // Get parameters (evaluate function if params is a function)
        const option = typeof params === 'function' ? params() : params

        // Merge parameters with existing config, prioritizing existing values
        config[path] = { ...option, ...config[path] }
      }
    }

    // Apply the assignment to the specified field
    assign(field)
    return config
  })
}
