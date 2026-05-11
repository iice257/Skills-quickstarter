# Cloudflare API Shield Reference

Expert guidance for API Shield - comprehensive API security suite for discovery, protection, and monitoring.

## Reading Order

| Task | Files to Read |
|------|---------------|
| Initial setup | README â†’ configuration.md |
| Implement JWT validation | configuration.md â†’ api.md |
| Add schema validation | configuration.md â†’ patterns.md |
| Detect API attacks | patterns.md â†’ api.md |
| Debug issues | gotchas.md |

## Feature Selection

What protection do you need?

```
â”œâ”€ Validate request/response structure â†’ Schema Validation 2.0 (configuration.md)
â”œâ”€ Verify auth tokens â†’ JWT Validation (configuration.md)
â”œâ”€ Client certificates â†’ mTLS (configuration.md)
â”œâ”€ Detect BOLA attacks â†’ BOLA Detection (patterns.md)
â”œâ”€ Track auth coverage â†’ Auth Posture (patterns.md)
â”œâ”€ Stop volumetric abuse â†’ Abuse Detection (patterns.md)
â””â”€ Discover shadow APIs â†’ API Discovery (api.md)
```

## In This Reference

- **[configuration.md](configuration.md)** - Setup, session identifiers, rules, token/mTLS configs
- **[api.md](api.md)** - Endpoint management, discovery, validation APIs, GraphQL operations
- **[patterns.md](patterns.md)** - Common patterns, progressive rollout, OWASP mappings, workflows
- **[gotchas.md](gotchas.md)** - Troubleshooting, false positives, performance, best practices

## Quick Start

API Shield: Enterprise-grade API security (Discovery, Schema Validation 2.0, JWT, mTLS, BOLA Detection, Auth Posture). Available as Enterprise add-on with preview access.

## See Also

- [API Shield Docs](https://developers.cloudflare.com/api-shield/)
- [API Reference](https://developers.cloudflare.com/api/resources/api_gateway/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
