# withRequestCache 📦

Cache identical requests to improve performance and reduce server load.

- 🚀 Improved performance by reducing duplicate requests
- 💾 Optional persistent caching with localStorage or sessionStorage
- 🔄 Works with all HTTP methods
- 🎯 Per-request cache configuration

## Usage 💡

This interceptor allows you to cache identical requests, so only one request is made even if multiple components request the same data simultaneously.

```typescript
import axios from 'axios'
import { withRequestCache } from 'axios-extras'

// Basic setup
withRequestCache(axios, {
  // Enable caching for all requests (not recommended)
  default: false,
  // Enable local storage caching
  local: true
})

// Advanced local storage configuration
withRequestCache(axios, {
  default: false,
  local: {
    enable: true,
    storage: localStorage,
  }
})
```

### Using with Specific Requests

```typescript
// Enable in-memory caching for this request
axios.get('/api/data', {
  cache: true
})

// Enable local storage caching for this request
axios.get('/api/data', {
  cache: { local: true }
})
```

## Important Note ⚠️

Due to axios design limitations, direct `axios()` calls won't work with caching. Use the method calls like `axios.get()` instead.
