# Cloudflare Workers for Platforms

Multi-tenant platform with isolated customer code execution at scale.

## Use Cases

- Multi-tenant SaaS running customer code
- AI-generated code execution in secure sandboxes
- Programmable platforms with isolated compute
- Edge functions/serverless platforms
- Website builders with static + dynamic content
- Unlimited app deployment at scale

**NOT for general Workers** - only for Workers for Platforms architecture.

## Quick Start

**One-click deploy:** [Platform Starter Kit](https://github.com/cloudflare/workers-for-platforms-example) deploys complete WfP setup with dispatch namespace, dispatch worker, and user worker example.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/workers-for-platforms-example)

**Manual setup:** See [configuration.md](./configuration.md) for namespace creation and dispatch worker configuration.

## Key Features

- Unlimited Workers per namespace (no script limits)
- Automatic tenant isolation
- Custom CPU/subrequest limits per customer
- Hostname routing (subdomains/vanity domains)
- Egress/ingress control
- Static assets support
- Tags for bulk operations

## Architecture

**4 Components:**
1. **Dispatch Namespace** - Container for unlimited customer Workers, automatic isolation (untrusted mode by default - no request.cf access, no shared cache)
2. **Dynamic Dispatch Worker** - Entry point, routes requests, enforces platform logic (auth, limits, validation)
3. **User Workers** - Customer code in isolated sandboxes, API-deployed, optional bindings (KV/D1/R2/DO)
4. **Outbound Worker** (optional) - Intercepts external fetch, controls egress, logs subrequests (blocks TCP socket connect() API)

**Request Flow:**
```
Request â†’ Dispatch Worker â†’ Determines user Worker â†’ env.DISPATCHER.get("customer")
â†’ User Worker executes (Outbound Worker for external fetch) â†’ Response â†’ Dispatch Worker â†’ Client
```

## Decision Trees

### When to Use Workers for Platforms
```
Need to run code?
â”œâ”€ Your code only â†’ Regular Workers
â”œâ”€ Customer/AI code â†’ Workers for Platforms
â””â”€ Untrusted code in sandbox â†’ Workers for Platforms OR Sandbox API
```

### Routing Strategy Selection
```
Hostname routing needed?
â”œâ”€ Subdomains only (*.saas.com) â†’ `*.saas.com/*` route + subdomain extraction
â”œâ”€ Custom domains â†’ `*/*` wildcard + Cloudflare for SaaS + KV/metadata routing
â””â”€ Path-based (/customer/app) â†’ Any route + path parsing
```

### Isolation Mode Selection
```
Worker mode?
â”œâ”€ Running customer code â†’ Untrusted (default)
â”œâ”€ Need request.cf geolocation â†’ Trusted mode
â”œâ”€ Internal platform, controlled code â†’ Trusted mode with cache key prefixes
â””â”€ Maximum isolation â†’ Untrusted + unique resources per customer
```

## In This Reference

| File | Purpose | When to Read |
|------|---------|--------------|
| [configuration.md](./configuration.md) | Namespace setup, dispatch worker config | First-time setup, changing limits |
| [api.md](./api.md) | User worker API, dispatch API, outbound worker | Deploying workers, SDK integration |
| [patterns.md](./patterns.md) | Multi-tenancy, routing, egress control | Planning architecture, scaling |
| [gotchas.md](./gotchas.md) | Limits, isolation issues, best practices | Debugging, production prep |

## See Also
- [workers](../workers/) - Core Workers runtime documentation
- [durable-objects](../durable-objects/) - Stateful multi-tenant patterns
- [sandbox](../sandbox/) - Alternative for untrusted code execution
- [Reference Architecture: Programmable Platforms](https://developers.cloudflare.com/reference-architecture/diagrams/serverless/programmable-platforms/)
- [Reference Architecture: AI Vibe Coding Platform](https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-vibe-coding-platform/)
