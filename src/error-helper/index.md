### withErrorHelper

自定义响应错误处理，所有错误都会从此经过

~~~typescript
import axios from 'axios'
import { withErrorHelper } from '@hairy/axios-bearer'

withErrorHelper(axios, (error) => {
  console.log('error')
})
~~~

~~~typescript
// https://.../xxx > { code: 0, message: 'ok' }
try {
  await axios.get('https://.../xxx')
} catch {
  // log('error')
}
~~~