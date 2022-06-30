### withFilterParams

过滤请求中不必要的参数

~~~typescript

import axios from 'axios'
import { withFilterParams } from '@hairy/axios'

withFilterParams(axios, ['', undefined], {
  header: true,
  formData: true,
  // 深处处理
  deep: true
})

~~~