import type { AxiosInstance, AxiosResponse, AxiosStatic } from 'axios'

/**
 * Merge response data properties into the response object based on expansion rules
 *
 * This interceptor allows you to promote specific properties from the response data
 * to the top level of the response object for easier access. Due to execution order,
 * withAssignResponse should be called first before other interceptors.
 *
 * After using this interceptor, you may need to extend the AxiosResponse type
 * with your own declarations to properly type the added properties.
 *
 * @param axios - The Axios instance or static object to apply the interceptor to
 * @param expands - Configuration for which properties to promote:
 *                  - '*' to promote all properties from response.data
 *                  - Array of property names to promote specific properties
 *                  - Array of [sourceField, targetField] tuples to rename properties when promoting
 */
export function withAssignResponse(axios: AxiosStatic | AxiosInstance, expands: '*' | (string | [string, string])[] = '*'): void {
  const assign = (response: AxiosResponse, data: any): void => {
    // Skip if data is not an object or is an array
    if (!data || typeof data !== 'object' || Array.isArray(data))
      return

    // Skip if expands is an empty array
    if (!expands.length)
      return

    // Handle wildcard case - promote all properties
    if (expands === '*') {
      for (const key of Object.keys(data))
        extend(response, data, key)
      return
    }

    // Handle specific properties case
    for (const keys of expands) {
      const field = isArray(keys) ? keys[0] : keys // Source field in data
      const key = isArray(keys) ? keys[1] : keys // Target field in response
      extend(response, data, field, key)
    }
  }

  // Apply to successful responses
  axios.interceptors.response.use(
    (response) => {
      assign(response, response.data)
      return response
    },
    (error) => {
      // Also apply to error responses if they have data
      assign(error.response, error.response?.data)
      return Promise.reject(error)
    },
  )
}

/**
 * Copy a property from source to target if it exists
 *
 * @param target - The object to copy the property to
 * @param source - The object to copy the property from
 * @param field - The property name in the source object
 * @param key - The property name to use in the target object (defaults to field)
 */
function extend(target: any, source: any, field: string, key = field): void {
  if (typeof source[field] !== 'undefined')
    target[key] = source[field]
}

/**
 * Type guard to check if a value is an array
 *
 * @param arg - The value to check
 * @returns True if the value is an array, false otherwise
 */
function isArray(arg: any): arg is any[] {
  return Array.isArray(arg)
}
