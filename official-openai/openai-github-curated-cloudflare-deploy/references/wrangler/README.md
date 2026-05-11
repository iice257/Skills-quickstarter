# Cloudflare Wrangler

Official CLI for Cloudflare Workers - develop, manage, and deploy Workers from the command line.

## What is Wrangler?

Wrangler is the Cloudflare Developer Platform CLI that allows you to:
- Create, develop, and deploy Workers
- Manage bindings (KV, D1, R2, Durable Objects, etc.)
- Configure routing and environments
- Run local development servers
- Execute migrations and manage resources
- Perform integration testing

## Installation

```bash
npm install wrangler --save-dev
# or globally
npm install -g wrangler
```

Run commands: `npx wrangler <command>` (or `pnpm`/`yarn wrangler`)

## Reading Order

| If you want to... | Start here |
|-------------------|------------|
| Create/deploy Worker quickly | Essential Commands below â†’ [patterns.md](./patterns.md) Â§New Worker |
| Configure bindings (KV, D1, R2) | [configuration.md](./configuration.md) Â§Bindings |
| Write integration tests | [api.md](./api.md) Â§startWorker |
| Debug production issues | [gotchas.md](./gotchas.md) + Essential Commands Â§Monitoring |
| Set up multi-environment workflow | [configuration.md](./configuration.md) Â§Environments |

## Essential Commands

### Project & Development
```bash
wrangler init [name]              # Create new project
wrangler dev                      # Local dev server (fast, simulated)
wrangler dev --remote             # Dev with remote resources (production-like)
wrangler deploy                   # Deploy to production
wrangler deploy --env staging     # Deploy to environment
wrangler versions list            # List versions
wrangler rollback [id]            # Rollback deployment
wrangler login                    # OAuth login
wrangler whoami                   # Check auth status
```

## Resource Management

### KV
```bash
wrangler kv namespace create NAME
wrangler kv key put "key" "value" --namespace-id=<id>
wrangler kv key get "key" --namespace-id=<id>
```

### D1
```bash
wrangler d1 create NAME
wrangler d1 execute NAME --command "SQL"
wrangler d1 migrations create NAME "description"
wrangler d1 migrations apply NAME
```

### R2
```bash
wrangler r2 bucket create NAME
wrangler r2 object put BUCKET/key --file path
wrangler r2 object get BUCKET/key
```

### Other Resources
```bash
wrangler queues create NAME
wrangler vectorize create NAME --dimensions N --metric cosine
wrangler hyperdrive create NAME --connection-string "..."
wrangler workflows create NAME
wrangler constellation create NAME
wrangler pages project create NAME
wrangler pages deployment create --project NAME --branch main
```

### Secrets
```bash
wrangler secret put NAME          # Set Worker secret
wrangler secret list              # List Worker secrets
wrangler secret delete NAME       # Delete Worker secret
wrangler secret bulk FILE.json    # Bulk upload from JSON

# Secrets Store (centralized, reusable across Workers)
wrangler secret-store:secret put STORE_NAME SECRET_NAME
wrangler secret-store:secret list STORE_NAME
```

### Monitoring
```bash
wrangler tail                     # Real-time logs
wrangler tail --env production    # Tail specific env
wrangler tail --status error      # Filter by status
```

## In This Reference

- [auth.md](./auth.md) - Authentication setup (`wrangler login`, API tokens)
- [configuration.md](./configuration.md) - wrangler.jsonc setup, environments, bindings
- [api.md](./api.md) - Programmatic API (`startWorker`, `getPlatformProxy`, events)
- [patterns.md](./patterns.md) - Common workflows and development patterns
- [gotchas.md](./gotchas.md) - Common pitfalls, limits, and troubleshooting

## Quick Decision Tree

```
Need to test your Worker?
â”œâ”€ Testing full Worker with bindings â†’ api.md Â§startWorker
â”œâ”€ Testing individual functions â†’ api.md Â§getPlatformProxy
â””â”€ Testing with Vitest â†’ patterns.md Â§Testing with Vitest

Need to configure something?
â”œâ”€ Bindings (KV, D1, R2, etc.) â†’ configuration.md Â§Bindings
â”œâ”€ Multiple environments â†’ configuration.md Â§Environments
â”œâ”€ Static files â†’ configuration.md Â§Workers Assets
â””â”€ Routing â†’ configuration.md Â§Routing

Development not working?
â”œâ”€ Local differs from production â†’ Use `wrangler dev --remote`
â”œâ”€ Bindings not available â†’ gotchas.md Â§Binding Not Available
â””â”€ Auth issues â†’ auth.md

Authentication issues?
â”œâ”€ "Not logged in" / "Unauthorized" â†’ auth.md
â”œâ”€ First time deploying â†’ `wrangler login` (one-time OAuth)
â””â”€ CI/CD setup â†’ auth.md Â§API Token
```

## See Also

- [workers](../workers/) - Workers runtime API reference
- [miniflare](../miniflare/) - Local testing with Miniflare
- [workerd](../workerd/) - Runtime that powers `wrangler dev`
