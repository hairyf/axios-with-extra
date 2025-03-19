# withAssignResponse 🔄

Merge response data fields into the response object.

## Usage 💡

When your API returns data in a format like `{ data, code, message, ... }`, you can use this method to merge these fields into your response object for easier access.

```typescript
import axios from 'axios'
import { withAssignResponse } from 'axios-extras'

// Merge all data fields into response
withAssignResponse(axios, '*')
```

### Example

```typescript
// API response: { code: 0, message: 'ok' }
try {
  await axios.get('https://.../xxx')
  // Now you can access response.code and response.message directly
}
catch {
  // Error handling
}
```

## Advanced Usage 🚀

```typescript
// Merge specific data fields into response
withAssignResponse(axios, ['data', 'code'])

// Merge data fields with renamed properties
withAssignResponse(axios, [['data', 'result'], ['code', 'statusCode']])
```

## TypeScript Support 📘

If you're using TypeScript, you can extend the `AxiosResponse` type to include your merged fields:

```typescript
declare module 'axios' {
  interface AxiosResponse {
    code?: number
    message?: string
    // Add other fields as needed
  }
}
