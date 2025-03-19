# withParamsExtra 🔌

Add extra parameters to your requests automatically.

- 🔑 Automatically include authentication tokens
- 🌐 Add tracking or analytics parameters
- 🔄 Dynamic values through callback functions
- 🎯 Apply to specific parts of the request (headers, params, data)

## Usage 💡

This interceptor allows you to automatically include additional parameters in your requests, supporting data, params, and headers.

```typescript
import axios from 'axios'
import { withParamsExtra } from 'axios-extras'

// Add static token to headers
withParamsExtra(axios, 'headers', { token: 'your-auth-token' })

// Or use a function for dynamic values
withParamsExtra(axios, 'headers', () => ({
  token: localStorage.getItem('token')
}))
```

### Example

```typescript
const { config } = await axios.get('https://api.example.com/data')
console.log(config.headers.token) // Your token value
```
