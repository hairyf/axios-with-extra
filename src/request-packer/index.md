### withRequestPacker

- 包装 axios 请求原型（get/post/...）
- 由于 axios 设计原因[#4823](https://github.com/axios/axios/issues/4823), 直接调用 Instance 不会产生效果

~~~typescript

import axios from 'axios'
import { withRequestPacker } from 'axios-with-extra'

withRequestPacker(axios, (config, request) => {
  return request(config)
})

// 不起效
axios()

// 起效
axios.get()
~~~