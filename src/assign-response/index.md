### withAssignResponse

返回的数据是类似 `{ data, code, ,...}`, 你可以使用该方法合并你的 `response`

~~~typescript
import axios from 'axios'
import { withAssignResponse } from '@hairy/axios-bearer'

// 合并所有 data 到 response
withAssignResponse(axios, '*')
~~~

~~~typescript
// https://.../xxx > { code: 0, message: 'ok' }
try {
  await axios.get('https://.../xxx')
} catch {
  // Enter
}
~~~

其他情况

```typescript
// 合并部分 data 到 response
withAssignResponse(axios, ['data', 'code'])
// 合并部分 data 到 response(并更改字段名称)
withAssignResponse(axios, [['data', 'result'], ['code', 'code2']])
```


## Typescript

假如你是使用 `typescript`，你可以利用 `declare module "axios"` 补全 `AxiosResponse` 类型

```typescript
declare module "axios" {
  interface AxiosResponse {
    code?: number
  }
}
```