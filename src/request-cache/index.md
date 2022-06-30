### withRequestCache

- 出现多个相同参数请求, 仅等待一个 promised 完成
- 通过 local 字段（true / localStorage / sessionStorage）可缓存本地
- 由于 axios 设计原因，直接 `axios()` 是无效的

~~~typescript

import axios from 'axios'
import { withRequestCache } from 'axios-with-extra'

withRequestCache(axios, {
  // 默认全部请求开启缓存（不建议）
  default: true,
  local: true
})

axios.get('xxx', {
  cache: true
})

axios.get('xxx', {
  cache: { local: true }
})

function instance(...args) {
  return instance.prototype.request(...args)
}
~~~