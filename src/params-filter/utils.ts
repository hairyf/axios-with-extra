/**
 * Filter out values from an object or array that match values in the filter array
 *
 * This function removes properties from objects or elements from arrays where the value
 * matches any value in the provided filter array. It can optionally perform deep filtering
 * on nested objects.
 *
 * @param params - The object or array to filter
 * @param filter - Array of values to be filtered out
 * @param deep - Whether to recursively filter nested objects (default: false)
 * @returns A new object or array with filtered values removed
 */
export function pickByParams<T extends object>(params: T, filter: any[], deep = false): Partial<T> {
  // Handle deep filtering of nested objects
  if (deep) {
    for (const key in params) {
      const value = params[key]
      if (typeof value !== 'object')
        continue
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      params[key] = pickByParams(
        params[key] as object,
        filter,
        deep,
      )
    }
  }

  // Filter out values that match any value in the filter array
  const pickValue = pickBy(params, value => !filter.includes(value))

  // Handle array case by returning values as array
  if (Array.isArray(params)) {
    return Object.values(pickValue) as any as Partial<T>
  }

  return pickValue
}

/**
 * Create a new object with properties that satisfy the predicate function
 *
 * @param object - The source object to filter
 * @param predicate - Function that determines whether to keep a property
 * @returns A new object containing only properties that satisfy the predicate
 */
function pickBy<T extends object>(
  object: T,
  predicate: (value: any, key: string) => boolean,
): Partial<T> {
  const result: Partial<T> = {}
  for (const key in object) {
    const value = object[key]
    if (predicate(value, key)) {
      result[key] = value
    }
  }
  return result
}
