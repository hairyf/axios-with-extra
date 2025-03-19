import type { AxiosInstance, AxiosResponse, AxiosStatic } from 'axios'
import { AxiosError } from 'axios'

/**
 * Custom response error interceptor that allows handling API-specific error formats
 *
 * This interceptor enables you to define custom conditions for when a response
 * should be treated as an error, even if the HTTP status is successful (e.g., 200 OK).
 * It's useful for APIs that return error information in the response body with a successful HTTP status.
 *
 * @param axios - The Axios instance or static object to apply the interceptor to
 * @param validate - A function that evaluates the response and determines if it should be treated as an error
 *                   Return false to throw a custom error with the response data
 *                   Return an AxiosError instance to throw that specific error
 *                   Return any other value (including undefined) to treat the response as successful
 */
export function withErrorCustom(axios: AxiosStatic | AxiosInstance, validate: (response: AxiosResponse) => boolean | AxiosError | void): void {
  const onFulfilled = (response: AxiosResponse): AxiosResponse<any, any> => {
    const result = validate(response)
    const { config, request, status, data } = response

    if (result === false) {
      const errorText = JSON.stringify(data, null, '\t')
      throw new AxiosError(`Custom Error: \n ${errorText}`, `${status}`, config, request, response)
    }

    if (result instanceof AxiosError)
      throw result

    return response
  }
  axios.interceptors.response.use(onFulfilled)
}
