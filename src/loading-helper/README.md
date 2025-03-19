# withLoadingHelper 🔄

Automatically manage loading states during API requests.

- 🚀 Automatic loading state management
- 🎛️ Customizable loading indicators
- 🧩 Simple integration with UI frameworks
- 🔧 Per-request control

## Usage 💡

This interceptor helps you handle loading states for your requests, with customizable loading indicators.

```typescript
import axios from 'axios'
import { withLoadingHelper } from 'axios-extras'

withLoadingHelper(
  axios,
  // Custom show loading function
  (config) => {
    // Show your loading indicator
    console.log('Loading started')
  },
  // Custom hide loading function
  (config) => {
    // Hide your loading indicator
    console.log('Loading finished')
  }
)
```

### Enable Loading for Specific Requests

```typescript
// Enable loading for a specific request
axios.get('/api/data', { loading: true })

// Enable loading globally for all requests
axios.defaults.loading = true
```
