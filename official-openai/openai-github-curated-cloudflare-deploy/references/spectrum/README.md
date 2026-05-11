# Cloudflare Spectrum Skill Reference

## Overview

Cloudflare Spectrum provides security and acceleration for ANY TCP or UDP-based application. It's a global Layer 4 (L4) reverse proxy running on Cloudflare's edge nodes that routes MQTT, email, file transfer, version control, games, and more through Cloudflare to mask origins and protect from DDoS attacks.

**When to Use Spectrum**: When your protocol isn't HTTP/HTTPS (use Cloudflare proxy for HTTP). Spectrum handles everything else: SSH, gaming, databases, MQTT, SMTP, RDP, custom protocols.

## Plan Capabilities

| Capability | Pro/Business | Enterprise |
|------------|--------------|------------|
| TCP protocols | Selected ports only | All ports (1-65535) |
| UDP protocols | Selected ports only | All ports (1-65535) |
| Port ranges | âŒ | âœ… |
| Argo Smart Routing | âœ… | âœ… |
| IP Firewall | âœ… | âœ… |
| Load balancer origins | âœ… | âœ… |

## Decision Tree

**What are you trying to do?**

1. **Create/manage Spectrum app**
   - Via Dashboard â†’ See [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Via API â†’ See [api.md](api.md) - REST endpoints
   - Via SDK â†’ See [api.md](api.md) - TypeScript/Python/Go examples
   - Via IaC â†’ See [configuration.md](configuration.md) - Terraform/Pulumi

2. **Protect specific protocol**
   - SSH â†’ See [patterns.md](patterns.md#1-ssh-server-protection)
   - Gaming (Minecraft, etc) â†’ See [patterns.md](patterns.md#2-game-server)
   - MQTT/IoT â†’ See [patterns.md](patterns.md#3-mqtt-broker)
   - SMTP/Email â†’ See [patterns.md](patterns.md#4-smtp-relay)
   - Database â†’ See [patterns.md](patterns.md#5-database-proxy)
   - RDP â†’ See [patterns.md](patterns.md#6-rdp-remote-desktop)

3. **Choose origin type**
   - Direct IP (single server) â†’ See [configuration.md](configuration.md#direct-ip-origin)
   - CNAME (hostname) â†’ See [configuration.md](configuration.md#cname-origin)
   - Load balancer (HA/failover) â†’ See [configuration.md](configuration.md#load-balancer-origin)

## Reading Order

1. Start with [patterns.md](patterns.md) for your specific protocol
2. Then [configuration.md](configuration.md) for your origin type
3. Check [gotchas.md](gotchas.md) before going to production
4. Use [api.md](api.md) for programmatic access

## See Also

- [Cloudflare Docs](https://developers.cloudflare.com/spectrum/)
