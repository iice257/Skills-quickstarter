# Cloudflare Vectorize

Globally distributed vector database for AI applications. Store and query vector embeddings for semantic search, recommendations, RAG, and classification.

**Status:** Generally Available (GA) | **Last Updated:** 2026-01-27

## Quick Start

```typescript
// 1. Create index
// npx wrangler vectorize create my-index --dimensions=768 --metric=cosine

// 2. Configure binding (wrangler.jsonc)
// { "vectorize": [{ "binding": "VECTORIZE", "index_name": "my-index" }] }

// 3. Query vectors
const matches = await env.VECTORIZE.query(queryVector, { topK: 5 });
```

## Key Features

- **10M vectors per index** (V2)
- Dimensions up to 1536 (32-bit float)
- Three distance metrics: cosine, euclidean, dot-product
- Metadata filtering (up to 10 indexes)
- Namespace support (50K namespaces paid, 1K free)
- Seamless Workers AI integration
- Global distribution

## Reading Order

| Task | Files to Read |
|------|---------------|
| New to Vectorize | README only |
| Implement feature | README + api + patterns |
| Setup/configure | README + configuration |
| Debug issues | gotchas |
| Integrate with AI | README + patterns |
| RAG implementation | README + patterns |

## File Guide

- **README.md** (this file): Overview, quick decisions
- **api.md**: Runtime API, types, operations (query/insert/upsert)
- **configuration.md**: Setup, CLI, metadata indexes
- **patterns.md**: RAG, Workers AI, OpenAI, LangChain, multi-tenant
- **gotchas.md**: Limits, pitfalls, troubleshooting

## Distance Metric Selection

Choose based on your use case:

```
What are you building?
â”œâ”€ Text/semantic search â†’ cosine (most common)
â”œâ”€ Image similarity â†’ euclidean
â”œâ”€ Recommendation system â†’ dot-product
â””â”€ Pre-normalized vectors â†’ dot-product
```

| Metric | Best For | Score Interpretation |
|--------|----------|---------------------|
| `cosine` | Text embeddings, semantic similarity | Higher = closer (1.0 = identical) |
| `euclidean` | Absolute distance, spatial data | Lower = closer (0.0 = identical) |
| `dot-product` | Recommendations, normalized vectors | Higher = closer |

**Note:** Index configuration is immutable. Cannot change dimensions or metric after creation.

## Multi-Tenancy Strategy

```
How many tenants?
â”œâ”€ < 50K tenants â†’ Use namespaces (recommended)
â”‚   â”œâ”€ Fastest (filter before vector search)
â”‚   â””â”€ Strict isolation
â”œâ”€ > 50K tenants â†’ Use metadata filtering
â”‚   â”œâ”€ Slower (post-filter after vector search)
â”‚   â””â”€ Requires metadata index
â””â”€ Per-tenant indexes â†’ Only if compliance mandated
    â””â”€ 50K index limit per account (paid plan)
```

## Common Workflows

### Semantic Search

```typescript
// 1. Generate embedding
const result = await env.AI.run("@cf/baai/bge-base-en-v1.5", { text: [query] });

// 2. Query Vectorize
const matches = await env.VECTORIZE.query(result.data[0], {
  topK: 5,
  returnMetadata: "indexed"
});
```

### RAG Pattern

```typescript
// 1. Generate query embedding
const embedding = await env.AI.run("@cf/baai/bge-base-en-v1.5", { text: [query] });

// 2. Search Vectorize
const matches = await env.VECTORIZE.query(embedding.data[0], { topK: 5 });

// 3. Fetch full documents from R2/D1/KV
const docs = await Promise.all(matches.matches.map(m =>
  env.R2.get(m.metadata.key).then(obj => obj?.text())
));

// 4. Generate LLM response with context
const answer = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
  prompt: `Context: ${docs.join("\n\n")}\n\nQuestion: ${query}\n\nAnswer:`
});
```

## Critical Gotchas

See `gotchas.md` for details. Most important:

1. **Async mutations**: Inserts take 5-10s to be queryable
2. **500 batch limit**: Workers API enforces 500 vectors per call (undocumented)
3. **Metadata truncation**: `"indexed"` returns first 64 bytes only
4. **topK with metadata**: Max 20 (not 100) when using returnValues or returnMetadata: "all"
5. **Metadata indexes first**: Must create before inserting vectors

## Resources

- [Official Docs](https://developers.cloudflare.com/vectorize/)
- [Client API Reference](https://developers.cloudflare.com/vectorize/reference/client-api/)
- [Workers AI Models](https://developers.cloudflare.com/workers-ai/models/#text-embeddings)
- [Discord: #vectorize](https://discord.cloudflare.com)
