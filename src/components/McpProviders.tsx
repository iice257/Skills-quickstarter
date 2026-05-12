import { ArrowRight } from "lucide-react";
import { ecosystem, mcpConfigs, providers, stats } from "../data";

export function McpProviders() {
  return (
    <section className="mid-grid">
      <div className="proof-panel">
        <div className="stats-grid" aria-label="Repository stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="ecosystem-strip">
          <h3>Works with leading agentic environments</h3>
          <div>
            {ecosystem.map((item) => {
              const Icon = item.icon;
              return (
                <span key={item.label}>
                  <Icon aria-hidden="true" />
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <section id="mcps" className="panel mcp-panel">
        <div className="panel-heading compact">
          <div>
            <span>MCPs</span>
            <h2>MCP config examples</h2>
            <p>Configuration references for Model Context Protocol.</p>
          </div>
        </div>
        <div className="mcp-list">
          {mcpConfigs.map((mcp) => {
            const Icon = mcp.icon;
            return (
              <a className="mcp-card" href={mcp.href} target="_blank" rel="noreferrer" key={mcp.name}>
                <span>
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <strong>{mcp.name}</strong>
                  <p>{mcp.description}</p>
                </div>
                <em>View config</em>
              </a>
            );
          })}
        </div>
      </section>

      <section id="providers" className="panel providers-panel">
        <div className="panel-heading compact">
          <div>
            <span>Providers</span>
            <h2>Provider and ecosystem packs</h2>
            <p>Provider packs stay separate from favourites and originals.</p>
          </div>
        </div>
        <div className="provider-grid">
          {providers.map((provider) => {
            const Icon = provider.icon;
            return (
              <a
                className="provider-card"
                href={provider.href}
                target="_blank"
                rel="noreferrer"
                key={provider.name}
              >
                <span>
                  <Icon aria-hidden="true" />
                </span>
                <strong>{provider.name}</strong>
                <p>{provider.description}</p>
                <em>
                  Open pack
                  <ArrowRight aria-hidden="true" />
                </em>
              </a>
            );
          })}
        </div>
      </section>
    </section>
  );
}
