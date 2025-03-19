# withParamsFilter 🧹

- 🧼 Cleaner request payloads
- 🔍 Prevents sending unnecessary data
- 🌳 Supports deep filtering of nested objects
- 🔧 Configurable for different request parts (headers, form data)

Filter out unnecessary parameters from your requests.

## Usage 💡

Remove empty strings, undefined values, or any other unwanted parameters from your requests.

```typescript
import axios from 'axios'
import { withParamsFilter } from 'axios-extras'

// Filter out empty strings and undefined values
withParamsFilter(
  axios,
  ['headers', 'params', 'data', 'formData'],
  ['', undefined],
  // Process nested objects
  { deep: true }
)
```
