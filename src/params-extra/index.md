### withExtraParams

请求时携带一些参数，支持 data、params、headers

~~~typescript
import axios from 'axios'
import { withExtraParams } from '@hairy/axios-bearer'

const params = { token: '111' }
withExtraParams(axios, { token: '111' }, 'headers')
~~~

~~~typescript
const { config } = await axios.get('https://.../xxx')
config.headers['token'] // 111
~~~
