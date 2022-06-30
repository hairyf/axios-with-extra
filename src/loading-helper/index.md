### withLoadingHelper

请求 loading 加载处理，可自定义加载字段

~~~typescript
import axios from 'axios'
import { withLoadingHelper } from 'axios-with-extra'

withLoadingHelper(
  axios,
  // custom show
  (config) => {},
  // custom hide
  (config) => {}
)

// use
axios.get('xxx', { loading: true })
// global use
axios.defaults['loading'] = true
~~~
