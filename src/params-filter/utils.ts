import forIn from 'lodash/forIn'
import _isObject from 'lodash/isObject'
import pickBy from 'lodash/pickBy'

/**
 * 过滤对象|数组中 filter 中的值
 * @param params
 * @param filter
 */
 export const pickByParams = <T extends object>(params: T, filter: any[], deep = false) => {
  deep &&
    forIn(params, (value, key) => {
      if (_isObject(value))
        // @ts-ignore
        params[key] = pickByParams(params[key], filter, deep)
    })
  const pickValue = pickBy(params, (value) => !filter.includes(value))
  if (Array.isArray(params)) {
    return Object.values(pickValue) as any as Partial<T>
  }
  return pickValue
}