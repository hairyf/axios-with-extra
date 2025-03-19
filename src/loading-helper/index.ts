import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios'

export interface LoadingOptions {
  /**
   * @description Field name in config that triggers loading interceptor when its value exists
   * @default loading
   */
  fieldName?: string
}

export type LoadingShowCallback = (config: AxiosRequestConfig) => void
export type LoadingHideCallback = (config: AxiosRequestConfig, response?: AxiosResponse, error?: AxiosError) => void

/**
 * Global loading indicator for axios requests
 *
 * This interceptor manages loading state for axios requests, showing a loading indicator
 * when requests are in progress and hiding it when all requests complete.
 * It tracks multiple concurrent requests and only shows/hides the indicator when the first
 * request starts and the last request completes.
 *
 * @param axios - The Axios instance or static object to apply the interceptor to
 * @param show - Callback function to show the loading indicator
 * @param hide - Callback function to hide the loading indicator
 * @param options - Configuration options for the loading helper
 */
export function withLoadingHelper(axios: AxiosStatic | AxiosInstance, show: LoadingShowCallback, hide: LoadingHideCallback, options: LoadingOptions = {}): void {
  let subscribers = 0
  const fieldName = options.fieldName || 'loading'
  const isLoading = (config: any): boolean => !!config?.[fieldName]

  axios.interceptors.request.use((config) => {
    if (isLoading(config)) {
      !subscribers && show(config)
      subscribers++
    }
    return config
  })

  axios.interceptors.response.use(
    (response) => {
      if (isLoading(response.config)) {
        subscribers--
        !subscribers && hide(response.config, response)
      }
      return response
    },
    (error) => {
      if (isLoading(error.config)) {
        subscribers--
        !subscribers && hide(error.config, undefined, error)
      }
      return Promise.reject(error)
    },
  )
}

declare module 'axios' {
  interface AxiosRequestConfig {
    loading?: boolean
  }
}
