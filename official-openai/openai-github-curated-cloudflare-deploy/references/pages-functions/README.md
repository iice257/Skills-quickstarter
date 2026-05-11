# Cloudflare Pages Functions

Serverless functions on Cloudflare Pages using Workers runtime. Full-stack dev with file-based routing.

## Quick Navigation

**Need to...**
| Task | Go to |
|------|-------|
| Set up TypeScript types | [configuration.md](./configuration.md) - TypeScript Setup |
| Configure bindings (KV, D1, R2) | [configuration.md](./configuration.md) - wrangler.jsonc |
| Access request/env/params | [api.md](./api.md) - EventContext |
| Add middleware or auth | [patterns.md](./patterns.md) - Middleware, Auth |
| Background tasks (waitUntil) | [patterns.md](./patterns.md) - Background Tasks |
| Debug errors or check limits | [gotchas.md](./gotchas.md) - Common Errors, Limits |

## Decision Tree: Is This Pages Functions?

```
Need serverless backend?
â”œâ”€ Yes, for a static site â†’ Pages Functions
â”œâ”€ Yes, standalone API â†’ Workers
â””â”€ Just static hosting â†’ Pages (no functions)

Have existing Worker?
â”œâ”€ Complex routing logic â†’ Use _worker.js (Advanced Mode)
â””â”€ Simple routes â†’ Migrate to /functions (File-Based)

Framework-based?
â”œâ”€ Next.js/SvelteKit/Remix â†’ Uses _worker.js automatically
â””â”€ Vanilla/HTML/React SPA â†’ Use /functions
```

## File-Based Routing

```
/functions
  â”œâ”€â”€ index.js              â†’ /
  â”œâ”€â”€ api.js                â†’ /api
  â”œâ”€â”€ users/
  â”‚   â”œâ”€â”€ index.js          â†’ /users/
  â”‚   â”œâ”€â”€ [user].js         â†’ /users/:user
  â”‚   â””â”€â”€ [[catchall]].js   â†’ /users/*
  â””â”€â”€ _middleware.js        â†’ runs on all routes
```

**Rules:**
- `index.js` â†’ directory root
- Trailing slash optional
- Specific routes precede catch-alls
- Falls back to static if no match

## Dynamic Routes

**Single segment** `[param]` â†’ string:
```js
// /functions/users/[user].js
export function onRequest(context) {
  return new Response(`Hello ${context.params.user}`);
}
// Matches: /users/nevi
```

**Multi-segment** `[[param]]` â†’ array:
```js
// /functions/users/[[catchall]].js
export function onRequest(context) {
  return new Response(JSON.stringify(context.params.catchall));
}
// Matches: /users/nevi/foobar â†’ ["nevi", "foobar"]
```

## Key Features

- **Method handlers:** `onRequestGet`, `onRequestPost`, etc.
- **Middleware:** `_middleware.js` for cross-cutting concerns
- **Bindings:** KV, D1, R2, Durable Objects, Workers AI, Service bindings
- **TypeScript:** Full type support via `wrangler types` command
- **Advanced mode:** Use `_worker.js` for custom routing logic

## Reading Order

**New to Pages Functions?** Start here:
1. [README.md](./README.md) - Overview, routing, decision tree (you are here)
2. [configuration.md](./configuration.md) - TypeScript setup, wrangler.jsonc, bindings
3. [api.md](./api.md) - EventContext, handlers, bindings reference
4. [patterns.md](./patterns.md) - Middleware, auth, CORS, rate limiting, caching
5. [gotchas.md](./gotchas.md) - Common errors, debugging, limits

**Quick reference lookup:**
- Bindings table â†’ [api.md](./api.md)
- Error diagnosis â†’ [gotchas.md](./gotchas.md)
- TypeScript setup â†’ [configuration.md](./configuration.md)

## See Also
- [pages](../pages/) - Pages platform overview and static site deployment
- [workers](../workers/) - Workers runtime API reference
- [d1](../d1/) - D1 database integration with Pages Functions
