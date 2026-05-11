# Cloudflare Email Routing Skill Reference

## Overview

Cloudflare Email Routing enables custom email addresses for your domain that route to verified destination addresses. It's free, privacy-focused (no storage/access), and includes Email Workers for programmatic email processing.

**Available to all Cloudflare customers using Cloudflare as authoritative nameserver.**

## Quick Start

```typescript
// Basic email handler
export default {
  async email(message, env, ctx) {
    // CRITICAL: Must consume stream before response
    const parser = new PostalMime.default();
    const email = await parser.parse(await message.raw.arrayBuffer());

    // Process email
    console.log(`From: ${message.from}, Subject: ${email.subject}`);

    // Forward or reject
    await message.forward("verified@destination.com");
  }
} satisfies ExportedHandler<Env>;
```

## Reading Order

**Start here based on your goal:**

1. **New to Email Routing?** â†’ [configuration.md](configuration.md) â†’ [patterns.md](patterns.md)
2. **Adding Workers?** â†’ [api.md](api.md) Â§ Worker Runtime API â†’ [patterns.md](patterns.md)
3. **Sending emails?** â†’ [api.md](api.md) Â§ SendEmail Binding
4. **Managing via API?** â†’ [api.md](api.md) Â§ REST API Operations
5. **Debugging issues?** â†’ [gotchas.md](gotchas.md)

## Decision Tree

```
Need to receive emails?
â”œâ”€ Simple forwarding only? â†’ Dashboard rules (configuration.md)
â”œâ”€ Complex logic/filtering? â†’ Email Workers (api.md + patterns.md)
â””â”€ Parse attachments/body? â†’ postal-mime library (patterns.md Â§ Parse Email)

Need to send emails?
â”œâ”€ From Worker? â†’ SendEmail binding (api.md Â§ SendEmail)
â””â”€ From external app? â†’ Use external SMTP/API service

Having issues?
â”œâ”€ Email not arriving? â†’ gotchas.md Â§ Mail Authentication
â”œâ”€ Worker crashing? â†’ gotchas.md Â§ Stream Consumption
â””â”€ Forward failing? â†’ gotchas.md Â§ Destination Verification
```

## Key Concepts

**Routing Rules**: Pattern-based forwarding configured via Dashboard/API. Simple but limited.

**Email Workers**: Custom TypeScript handlers with full email access. Handles complex logic, parsing, storage, rejection.

**SendEmail Binding**: Outbound email API for Workers. Transactional email only (no marketing/bulk).

**ForwardableEmailMessage**: Runtime interface for incoming emails. Provides headers, raw stream, forward/reject methods.

## In This Reference

- **[configuration.md](configuration.md)** - Setup, deployment, wrangler config
- **[api.md](api.md)** - REST API + Worker runtime API + types
- **[patterns.md](patterns.md)** - Common patterns with working examples
- **[gotchas.md](gotchas.md)** - Critical pitfalls, troubleshooting, limits

## Architecture

```
Internet â†’ MX Records â†’ Cloudflare Email Routing
                            â”œâ”€ Routing Rules (dashboard)
                            â””â”€ Email Worker (your code)
                                â”œâ”€ Forward to destination
                                â”œâ”€ Reject with reason
                                â”œâ”€ Store in R2/KV/D1
                                â””â”€ Send outbound (SendEmail)
```

## See Also

- [Cloudflare Docs: Email Routing](https://developers.cloudflare.com/email-routing/)
- [Cloudflare Docs: Email Workers](https://developers.cloudflare.com/email-routing/email-workers/)
- [postal-mime npm package](https://www.npmjs.com/package/postal-mime)
