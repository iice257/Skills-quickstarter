# Cloudflare Durable Objects

Expert guidance for building stateful applications with Cloudflare Durable Objects.

## Reading Order

1. **First time?** Read this overview + Quick Start
2. **Setting up?** See [Configuration](./configuration.md)
3. **Building features?** Use decision trees below â†’ [Patterns](./patterns.md)
4. **Debugging issues?** Check [Gotchas](./gotchas.md)
5. **Deep dive?** [API](./api.md) and [DO Storage](../do-storage/README.md)

## Overview

Durable Objects combine compute with storage in globally-unique, strongly-consistent packages:
- **Globally unique instances**: Each DO has unique ID for multi-client coordination
- **Co-located storage**: Fast, strongly-consistent storage with compute
- **Automatic placement**: Objects spawn near first request location
- **Stateful serverless**: In-memory state + persistent storage
- **Single-threaded**: Serial request processing (no race conditions)

## Rules of Durable Objects

Critical rules preventing most production issues:

1. **One alarm per DO** - Schedule multiple events via queue pattern
2. **~1K req/s per DO max** - Shard for higher throughput
3. **Constructor runs every wake** - Keep initialization light; use lazy loading
4. **Hibernation clears memory** - In-memory state lost; persist critical data
5. **Use `ctx.waitUntil()` for cleanup** - Ensures completion after response sent
6. **No setTimeout for persistence** - Use `setAlarm()` for reliable scheduling

## Core Concepts

### Class Structure
All DOs extend `DurableObject` base class with constructor receiving `DurableObjectState` (storage, WebSockets, alarms) and `Env` (bindings).

### Lifecycle States

```
[Not Created] â†’ [Active] â‡„ [Hibernated] â†’ [Evicted]
                   â†“
              [Destroyed]
```

- **Not Created**: DO ID exists but instance never spawned
- **Active**: Processing requests, in-memory state valid, billed per GB-hour
- **Hibernated**: WebSocket connections open but zero compute, zero cost
- **Evicted**: Removed from memory; next request triggers cold start
- **Destroyed**: Data deleted via migration or manual deletion

### Accessing from Workers
Workers use bindings to get stubs, then call RPC methods directly (recommended) or use fetch handler (legacy).

**RPC vs fetch() decision:**
```
â”œâ”€ New project + compat â‰¥2024-04-03 â†’ RPC (type-safe, simpler)
â”œâ”€ Need HTTP semantics (headers, status) â†’ fetch()
â”œâ”€ Proxying requests to DO â†’ fetch()
â””â”€ Legacy compatibility â†’ fetch()
```

See [Patterns: RPC vs fetch()](./patterns.md) for examples.

### ID Generation
- `idFromName()`: Deterministic, named coordination (rate limiting, locks)
- `newUniqueId()`: Random IDs for sharding high-throughput workloads
- `idFromString()`: Derive from existing IDs
- Jurisdiction option: Data locality compliance

### Storage Options

**Which storage API?**
```
â”œâ”€ Structured data, relations, transactions â†’ SQLite (recommended)
â”œâ”€ Simple KV on SQLite DO â†’ ctx.storage.kv (sync KV)
â””â”€ Legacy KV-only DO â†’ ctx.storage (async KV)
```

- **SQLite** (recommended): Structured data, transactions, 10GB/DO
- **Synchronous KV API**: Simple key-value on SQLite objects
- **Asynchronous KV API**: Legacy/advanced use cases

See [DO Storage](../do-storage/README.md) for deep dive.

### Special Features
- **Alarms**: Schedule future execution per-DO (1 per DO - use queue pattern for multiple)
- **WebSocket Hibernation**: Zero-cost idle connections (memory cleared on hibernation)
- **Point-in-Time Recovery**: Restore to any point in 30 days (SQLite only)

## Quick Start

```typescript
import { DurableObject } from "cloudflare:workers";

export class Counter extends DurableObject<Env> {
  async increment(): Promise<number> {
    const result = this.ctx.storage.sql.exec(
      `INSERT INTO counters (id, value) VALUES (1, 1)
       ON CONFLICT(id) DO UPDATE SET value = value + 1
       RETURNING value`
    ).one();
    return result.value;
  }
}

// Worker access
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const id = env.COUNTER.idFromName("global");
    const stub = env.COUNTER.get(id);
    const count = await stub.increment();
    return new Response(`Count: ${count}`);
  }
};
```

## Decision Trees

### What do you need?

```
â”œâ”€ Coordinate requests (rate limit, lock, session)
â”‚   â†’ idFromName(identifier) â†’ [Patterns: Rate Limiting/Locks](./patterns.md)
â”‚
â”œâ”€ High throughput (>1K req/s)
â”‚   â†’ Sharding with newUniqueId() or hash â†’ [Patterns: Sharding](./patterns.md)
â”‚
â”œâ”€ Real-time updates (WebSocket, chat, collab)
â”‚   â†’ WebSocket hibernation + room pattern â†’ [Patterns: Real-time](./patterns.md)
â”‚
â”œâ”€ Background work (cleanup, notifications, scheduled tasks)
â”‚   â†’ Alarms + queue pattern (1 alarm/DO) â†’ [Patterns: Multiple Events](./patterns.md)
â”‚
â””â”€ User sessions with expiration
    â†’ Session pattern + alarm cleanup â†’ [Patterns: Session Management](./patterns.md)
```

### Which access pattern?

```
â”œâ”€ New project + typed methods â†’ RPC (compat â‰¥2024-04-03)
â”œâ”€ Need HTTP semantics â†’ fetch()
â”œâ”€ Proxying to DO â†’ fetch()
â””â”€ Legacy compat â†’ fetch()
```

See [Patterns: RPC vs fetch()](./patterns.md) for examples.

### Which storage?

```
â”œâ”€ Structured data, SQL queries, transactions â†’ SQLite (recommended)
â”œâ”€ Simple KV on SQLite DO â†’ ctx.storage.kv (sync API)
â””â”€ Legacy KV-only DO â†’ ctx.storage (async API)
```

See [DO Storage](../do-storage/README.md) for complete guide.

## Essential Commands

```bash
npx wrangler dev              # Local dev with DOs
npx wrangler dev --remote     # Test against prod DOs
npx wrangler deploy           # Deploy + auto-apply migrations
```

## Resources

**Docs**: https://developers.cloudflare.com/durable-objects/
**API Reference**: https://developers.cloudflare.com/durable-objects/api/
**Examples**: https://developers.cloudflare.com/durable-objects/examples/

## In This Reference

- **[Configuration](./configuration.md)** - wrangler.jsonc setup, migrations, bindings, environments
- **[API](./api.md)** - Class structure, ctx methods, alarms, WebSocket hibernation
- **[Patterns](./patterns.md)** - Sharding, rate limiting, locks, real-time, sessions
- **[Gotchas](./gotchas.md)** - Limits, hibernation caveats, common errors

## See Also

- **[DO Storage](../do-storage/README.md)** - SQLite, KV, transactions (detailed storage guide)
- **[Workers](../workers/README.md)** - Core Workers runtime features
- **[WebSockets](../websockets/README.md)** - WebSocket APIs and patterns
