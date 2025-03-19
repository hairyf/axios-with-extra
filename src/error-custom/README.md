# withErrorCustom 🚨

Customize response error handling based on your API's response format.

- 🔍 Handle API-specific error formats
- 🧩 Convert business logic errors to JavaScript exceptions
- 🎯 Create custom error messages
- 🔄 Consistent error handling across your application

## Usage 💡

This interceptor allows you to define custom conditions for when a response should be treated as an error, even if the HTTP status is successful.

```typescript
import axios from 'axios'
import { withErrorCustom } from 'axios-extras'

// Treat responses with non-zero code as errors
withErrorCustom(axios, (response) => {
  return response.data.code !== 0
})

// Or return a custom error
withErrorCustom(axios, (response) => {
  if (response.data.code !== 0) {
    return new axios.AxiosError(response.data.message)
  }
  return false
})
```

### Example

```typescript
// API response: { code: 1, message: 'Invalid token' }
try {
  await axios.get('https://api.example.com/data')
}
catch (error) {
  // Error will be caught here even with HTTP 200
  console.error(error.message) // 'Invalid token'
}
```
