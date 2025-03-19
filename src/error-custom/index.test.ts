import axios, { AxiosError } from 'axios'
import { withErrorCustom } from '.'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

describe('withErrorCustom', () => {
  it('false case', async () => {
    const http = axios.create()
    withErrorCustom(http, () => {
      return false
    })
    let catchError = false
    try {
      await http.get('/todos/1')
    }
    catch {
      catchError = true
    }
    expect(catchError).toBeTruthy()
  })

  it('axios case', async () => {
    const http = axios.create()
    withErrorCustom(http, () => {
      return new AxiosError('--')
    })
    let catchError = false
    try {
      await http.get('/todos/1')
    }
    catch {
      catchError = true
    }
    expect(catchError).toBeTruthy()
  })
})
