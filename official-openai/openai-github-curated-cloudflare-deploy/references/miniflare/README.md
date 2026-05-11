# Miniflare

Local simulator for Cloudflare Workers development/testing. Runs Workers in workerd sandbox implementing runtime APIs - no internet required.

## Features

- Full-featured: KV, Durable Objects, R2, D1, WebSockets, Queues
- Fully-local: test without internet, instant reload
- TypeScript-native: detailed logging, source maps
- Advanced testing: dispatch events without HTTP, simulate Worker connections

## When to Use

**Decision tree for testing Workers:**

```
Need to test Workers?
â”‚
â”œâ”€ Unit tests for business logic only?
â”‚  â””â”€ getPlatformProxy (Vitest/Jest) â†’ [patterns.md](./patterns.md#getplatformproxy)
â”‚     Fast, no HTTP, direct binding access
â”‚
â”œâ”€ Integration tests with full runtime?
â”‚  â”œâ”€ Single Worker?
â”‚  â”‚  â””â”€ Miniflare API â†’ [Quick Start](#quick-start)
â”‚  â”‚     Full control, programmatic access
â”‚  â”‚
â”‚  â”œâ”€ Multiple Workers + service bindings?
â”‚  â”‚  â””â”€ Miniflare workers array â†’ [configuration.md](./configuration.md#multiple-workers)
â”‚  â”‚     Shared storage, inter-worker calls
â”‚  â”‚
â”‚  â””â”€ Vitest test runner integration?
â”‚     â””â”€ vitest-pool-workers â†’ [patterns.md](./patterns.md#vitest-pool-workers)
â”‚        Full Workers env in Vitest
â”‚
â””â”€ Local dev server?
   â””â”€ wrangler dev (not Miniflare)
      Hot reload, automatic config
```

**Use Miniflare for:**
- Integration tests with full Worker runtime
- Testing bindings/storage locally
- Multiple Workers with service bindings
- Programmatic event dispatch (fetch, queue, scheduled)

**Use getPlatformProxy for:**
- Fast unit tests of business logic
- Testing without HTTP overhead
- Vitest/Jest environments

**Use Wrangler for:**
- Local development workflow
- Production deployments

## Setup

```bash
npm i -D miniflare
```

Requires ES modules in `package.json`:
```json
{"type": "module"}
```

## Quick Start

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
  modules: true,
  script: `
    export default {
      async fetch(request, env, ctx) {
        return new Response("Hello Miniflare!");
      }
    }
  `,
});

const res = await mf.dispatchFetch("http://localhost:8787/");
console.log(await res.text()); // Hello Miniflare!
await mf.dispose();
```

## Reading Order

**New to Miniflare?** Start here:
1. [Quick Start](#quick-start) - Running in 2 minutes
2. [When to Use](#when-to-use) - Choose your testing approach
3. [patterns.md](./patterns.md) - Testing patterns (getPlatformProxy, Vitest, node:test)
4. [configuration.md](./configuration.md) - Configure bindings, storage, multiple workers

**Troubleshooting:**
- [gotchas.md](./gotchas.md) - Common errors and debugging

**API reference:**
- [api.md](./api.md) - Complete method reference

## See Also
- [wrangler](../wrangler/) - CLI tool that embeds Miniflare for `wrangler dev`
- [workerd](../workerd/) - Runtime that powers Miniflare
- [workers](../workers/) - Workers runtime API documentation
