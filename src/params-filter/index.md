### axioswithFilterParams

过滤请求中不必要的参数

~~~typescript

import axios from 'axios'
import { axioswithFilterParams } from '@hairy/axios'

axioswithFilterParams(axios, ['', undefined], {
  header: true,
  formData: true,
  // 深处处理
  deep: true
})

~~~