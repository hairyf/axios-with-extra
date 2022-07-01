import { AxiosStatic, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { withRequestPacker } from '../request-packer'
import { stableStringify, asyncCacheFn } from 'async-cache-fn'
import isObject from 'lodash/isObject'

export interface CacheLocalOptions { enable?: boolean; storage?: Storage }

export interface RequestCacheOptions {
  default?: boolean
  local?: boolean | CacheLocalOptions
}
export type RequestCacheConfig = boolean | { local?: boolean | CacheLocalOptions }

export function withRequestCaches(axios: AxiosStatic | AxiosInstance, options: RequestCacheOptions = {}) {
  const cacheFuncs = new Map()
  withRequestPacker(axios, (config, request) => {
    const { enable, storage } = parseCacheConfig(options, config.cache)
    if (!enable) return request(config)
    const cacheKey = stableStringify(config)

    if (storage) {
      const value = storage.getItem(cacheKey)
      if (value) return JSON.parse(value)
    }

    if (!cacheFuncs.has(cacheKey)) {
      const fn = asyncCacheFn(request)
      cacheFuncs.set(cacheKey, fn)
      request = fn as any
    }
    else {
      request = cacheFuncs.get(cacheKey)
    }

    const promise = request(config)

    if (storage)
      promise.then(v => {
        storage.setItem(cacheKey, JSON.stringify(v))
      })

    return promise
  })
}

function parseCacheConfig(defaultConfig: RequestCacheOptions = {}, config?: RequestCacheConfig) {
  let enable = false
  let storage: Storage | undefined
  if (config || defaultConfig.default)
    enable = true
  else
    return { enable }
  if (defaultConfig.local) {
    const conf = parseLocalConfig(defaultConfig.local)
    storage = conf.enable ? conf.storage : storage
  }
  if (isObject(config)) {
    const conf = parseLocalConfig(config.local)
    storage = conf.enable ? conf.storage : storage
  }
  return { enable, storage }
}

function parseLocalConfig(local?: boolean | CacheLocalOptions) {
  let storage: Storage | undefined
  let enable = false
  if (isObject(local)) {
    storage = local.storage
    enable = !!local.enable
  }
  if (local === true) {
    storage = localStorage
    enable = true
  }
  return { storage, enable }
}



declare module 'axios' {
  interface AxiosRequestConfig {
    cache?: RequestCacheConfig
  }
}

