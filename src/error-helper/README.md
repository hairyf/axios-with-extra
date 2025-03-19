# withErrorHelper 🛡️

Global error handling for all axios requests.

- 🌐 Centralized error handling
- 📝 Consistent error logging
- 🔔 Global notifications for errors
- 🔄 Works with all axios requests

## Usage 💡

This interceptor provides a centralized way to handle all request errors, making error management more consistent across your application.

```typescript
import axios from 'axios'
import { withErrorHelper } from 'axios-extras'

// Global error handler
withErrorHelper(axios, (error) => {
  // Log the error
  console.error('API Error:', error)

  // Show user notification
  showErrorNotification(error.message)

  // You can still throw the error for local handling
  throw error
})
```

### Example

```typescript
try {
  await axios.get('https://api.example.com/data')
}
catch (error) {
  // The global handler will be called first
  // Then you can handle specific cases here
  if (error.response?.status === 404) {
    // Handle not found
  }
}
```
