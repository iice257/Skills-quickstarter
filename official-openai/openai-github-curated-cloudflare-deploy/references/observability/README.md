# Cloudflare Observability Skill Reference

**Purpose**: Comprehensive guidance for implementing observability in Cloudflare Workers, covering traces, logs, metrics, and analytics.

**Scope**: Cloudflare Observability features ONLY - Workers Logs, Traces, Analytics Engine, Logpush, Metrics & Analytics, and OpenTelemetry exports.

---

## Decision Tree: Which File to Load?

Use this to route to the correct file without loading all content:

```
â”œâ”€ "How do I enable/configure X?"           â†’ configuration.md
â”œâ”€ "What's the API/method/binding for X?"   â†’ api.md
â”œâ”€ "How do I implement X pattern?"          â†’ patterns.md
â”‚   â”œâ”€ Usage tracking/billing               â†’ patterns.md
â”‚   â”œâ”€ Error tracking                       â†’ patterns.md
â”‚   â”œâ”€ Performance monitoring               â†’ patterns.md
â”‚   â”œâ”€ Multi-tenant tracking                â†’ patterns.md
â”‚   â”œâ”€ Tail Worker filtering                â†’ patterns.md
â”‚   â””â”€ OpenTelemetry export                 â†’ patterns.md
â””â”€ "Why isn't X working?" / "Limits?"       â†’ gotchas.md
```

## Reading Order

Load files in this order based on task:

| Task Type | Load Order | Reason |
|-----------|------------|--------|
| **Initial setup** | configuration.md â†’ gotchas.md | Setup first, avoid pitfalls |
| **Implement feature** | patterns.md â†’ api.md â†’ gotchas.md | Pattern â†’ API details â†’ edge cases |
| **Debug issue** | gotchas.md â†’ configuration.md | Common issues first |
| **Query data** | api.md â†’ patterns.md | API syntax â†’ query examples |

## Product Overview

### Workers Logs
- **What:** Console output from Workers (console.log/warn/error)
- **Access:** Dashboard (Real-time Logs), Logpush, Tail Workers
- **Cost:** Free (included with all Workers)
- **Retention:** Real-time only (no historical storage in dashboard)

### Workers Traces
- **What:** Execution traces with timing, CPU usage, outcome
- **Access:** Dashboard (Workers Analytics â†’ Traces), Logpush
- **Cost:** $0.10/1M spans (GA pricing starts March 1, 2026), 10M free/month
- **Retention:** 14 days included

### Analytics Engine
- **What:** High-cardinality event storage and SQL queries
- **Access:** SQL API, Dashboard (Analytics â†’ Analytics Engine)
- **Cost:** $0.25/1M writes beyond 10M free/month
- **Retention:** 90 days (configurable up to 1 year)

### Tail Workers
- **What:** Workers that receive logs/traces from other Workers
- **Use Cases:** Log filtering, transformation, external export
- **Cost:** Standard Workers pricing

### Logpush
- **What:** Stream logs to external storage (S3, R2, Datadog, etc.)
- **Access:** Dashboard, API
- **Cost:** Requires Business/Enterprise plan

## Pricing Summary (2026)

| Feature | Free Tier | Cost Beyond Free Tier | Plan Requirement |
|---------|-----------|----------------------|------------------|
| Workers Logs | Unlimited | Free | Any |
| Workers Traces | 10M spans/month | $0.10/1M spans | Paid Workers (GA: March 1, 2026) |
| Analytics Engine | 10M writes/month | $0.25/1M writes | Paid Workers |
| Logpush | N/A | Included in plan | Business/Enterprise |

## In This Reference

- **[configuration.md](configuration.md)** - Setup, deployment, configuration (Logs, Traces, Analytics Engine, Tail Workers, Logpush)
- **[api.md](api.md)** - API endpoints, methods, interfaces (GraphQL, SQL, bindings, types)
- **[patterns.md](patterns.md)** - Common patterns, use cases, examples (billing, monitoring, error tracking, exports)
- **[gotchas.md](gotchas.md)** - Troubleshooting, best practices, limitations (common errors, performance gotchas, pricing)

## See Also

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Analytics Engine Docs](https://developers.cloudflare.com/analytics/analytics-engine/)
- [Workers Traces Docs](https://developers.cloudflare.com/workers/observability/traces/)
