### withErrorCustom

自定义响应错误，抛出请求数据错误

~~~typescript
import axios from 'axios'
import { withErrorCustom } from '@hairy/axios-bearer'
withErrorCustom(axios, (response) => {
  return response.data.code === 0
})

// or

withErrorCustom(axios, (response) => {
  return new AxiosError('my error')
})

~~~

~~~typescript
// https://.../xxx > { code: 0, message: 'ok' }
try {
  await axios.get('https://.../xxx')
} catch {
  // Enter
}
~~~