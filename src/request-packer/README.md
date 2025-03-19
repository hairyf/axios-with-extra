# withRequestPacker 📦

Wrap axios request methods for enhanced functionality.

- 🔄 Add custom behavior to all request methods
- 🧩 Modify request configuration
- 📊 Add logging or metrics
- 🔍 Implement request tracing

## Usage 💡

This interceptor allows you to wrap axios request prototype methods (get/post/etc.) to add custom behavior.

```typescript
import axios from 'axios'
import { withRequestPacker } from 'axios-extras'

// Add custom behavior to all request methods
withRequestPacker(axios, (config, request) => {
  console.log('Request starting:', config.url)

  // You can modify the config here
  config.headers = {
    ...config.headers,
    'X-Custom-Header': 'value'
  }

  // Execute the original request
  return request(config).then((response) => {
    console.log('Request completed:', config.url)
    return response
  })
})
```

## Important Note ⚠️

Due to axios design limitations ([Issue #4823](https://github.com/axios/axios/issues/4823)), calling the axios instance directly won't trigger the wrapper:

```typescript
// Won't work with the wrapper
axios()

// Will work with the wrapper
axios.get()
axios.post()
// etc.
```
