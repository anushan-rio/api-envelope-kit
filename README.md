# api-envelope-kit

A tiny, dependency-free Node.js package for consistent API response envelopes.

## Why this name?

`api-envelope-kit` describes the package clearly: it wraps successful results and errors in a predictable API envelope. The name was checked on npm during setup and had no published version at that moment. Re-check before publishing because npm names can be claimed at any time.

## Install

```bash
npm install api-envelope-kit
```

## Success response

```js
const { success } = require('api-envelope-kit');

const body = success(
  { id: 7, name: 'Ada' },
  { requestId: 'req-123' }
);

console.log(body);
```

Output:

```json
{
  "success": true,
  "data": { "id": 7, "name": "Ada" },
  "meta": {
    "timestamp": "2026-11-14T12:00:00.000Z",
    "requestId": "req-123"
  }
}
```

## Error response

```js
const { error } = require('api-envelope-kit');

const body = error('USER_NOT_FOUND', 'User was not found', {
  requestId: 'req-123',
  details: { userId: '7' }
});

// Send this body with an appropriate HTTP status, such as 404.
res.status(404).json(body);
```

Output:

```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User was not found",
    "details": { "userId": "7" }
  },
  "meta": {
    "timestamp": "2026-11-14T12:00:00.000Z",
    "requestId": "req-123"
  }
}
```

## Pagination

```js
const { paginate } = require('api-envelope-kit');

const body = paginate([{ id: 1 }, { id: 2 }], {
  page: 2,
  pageSize: 2,
  total: 5,
  requestId: 'req-789'
});

res.json(body);
```

`meta.pagination` contains:

- `page`
- `pageSize`
- `total`
- `totalPages`
- `hasNext`
- `hasPrevious`

## Add your own metadata

```js
success(data, {
  requestId: 'req-123',
  extra: {
    apiVersion: 'v1',
    source: 'users-service'
  }
});
```

## Run the tests locally

```bash
cd api-envelope-kit
npm test
```

## Publish to npm

1. Create an npm account at <https://www.npmjs.com/signup>.
2. In the package folder, run:

   ```bash
   npm login
   ```

   Enter credentials only in npm's private terminal prompt. Never put a password or token in source code.
3. Check the package contents:

   ```bash
   npm pack --dry-run
   ```
4. Re-check that the package name is available:

   ```bash
   npm view api-envelope-kit version
   ```

   If npm returns a version, choose a different name and update `package.json` and this README.
5. Publish the first version:

   ```bash
   npm publish --access public
   ```

6. Verify it:

   ```bash
   npm view api-envelope-kit version
   npm install api-envelope-kit
   ```

Publishing is intentionally not done by this starter. It requires your npm sign-in and is an external release action.

## Suggested next improvements

- Add TypeScript declarations (`index.d.ts`).
- Add an Express error middleware helper.
- Add validation for allowed error codes.
- Add a changelog before version `1.0.0`.
