

import axios from 'axios'
import { withFilterParams } from '.'

axios.defaults['baseURL'] = 'https://jsonplaceholder.typicode.com'

describe('withFilterParams', () => {
  it('axios pickBy params.', async () => {
    const http = axios.create()
    withFilterParams(http, ['', undefined])
    const v = await http.get('/albums', {
      params: { aaa: '', bbb: undefined, ccc: '123131' }
    })
    expect(v.config.params).toEqual({ ccc: '123131' })
  })
  it('axios pickBy data.', async () => {
    const http = axios.create()
    withFilterParams(http, ['', undefined])
    const v = await http.post('/albums', {
      aaa: '',
      bbb: undefined,
      ccc: '123131'
    })
    expect(v.config.data).toEqual(v.config.data)
  })
  // TODO
  it.skip('axios pickBy FormData', async () => {
    const http = axios.create()
    withFilterParams(http, [''], { formData: true })
    const formData = new FormData()
    formData.append('aaa', '')
    formData.append('ccc', '123131')
    const v = await http.post('/albums')
    expect(v.config.data).toEqual(v.config.data)
  })
})
