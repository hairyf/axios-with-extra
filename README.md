# axios-extras

Collection of axios interceptors for common business scenarios

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

## Why?

I'm tired of duplicate code and scattered packages. so.

## Install

```bash
npm install axios-extras
```

## Usage

```typescript
import axios from 'axios'
import { withParamsExtra } from 'axios-extras'

// Add extra parameters to request headers
withParamsExtra(axios, () => ({ token: localStorage.getItem('token') }), 'headers')
```

## Features ✨

- 🔄 **Response Handling** - Customize and transform API responses
- 🚦 **Loading States** - Automatic loading state management
- 🧹 **Parameter Filtering** - Remove unnecessary parameters from requests
- 🔑 **Authentication** - Handle token refresh and auth headers
- 🔁 **Request Optimization** - Caching, retrying, and request packing

## Methods 🛠️

- [withAssignResponse](src/assign-response/README.md) - Assign response data to specified properties
- [withLoadingHelper](src/loading-helper/README.md) - Manage loading state automatically
- [withParamsFilter](src/params-filter/README.md) - Filter request parameters
- [withParamsExtra](src/params-extra/README.md) - Add extra parameters to requests
- [withErrorCustom](src/error-custom/README.md) - Customize response error handling
- [withErrorHelper](src/error-helper/README.md) - Global error handling
- [withAuthRefresh](src/auth-refresh/README.md) - Token refresh handling
- [withRequestRetry](src/request-retry/README.md) - Automatic request retry
- [withRequestPacker](src/request-packer/README.md) - Wrap axios request methods
- [withRequestCaches](src/request-caches/README.md) - Cache identical requests

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/hairyf/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/hairyf/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © [Hairyf](https://github.com/hairyf)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/axios-extras?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/axios-extras
[npm-downloads-src]: https://img.shields.io/npm/dm/axios-extras?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/axios-extras
[bundle-src]: https://img.shields.io/bundlephobia/minzip/axios-extras?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=axios-extras
[license-src]: https://img.shields.io/github/license/hairyf/axios-extras.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/hairyf/axios-extras/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/axios-extras
