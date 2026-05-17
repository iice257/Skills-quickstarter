import { useState } from "react";
import { ecosystem, providers, stats } from "../data";
import { ExpandableInstallCard } from "./ExpandableInstallCard";

export function EcosystemProviders() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="ecosystem-section">
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
          <div className="environment-grid">
            {ecosystem.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="environment-card">
                  <Icon aria-hidden="true" />
                  <strong>{item.label}</strong>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <section id="providers" className="panel providers-panel">
        <div className="panel-heading compact">
          <div>
            <span>Providers</span>
            <h2>Provider and ecosystem packs</h2>
            <p>Provider packs stay separate from favourites and originals.</p>
          </div>
        </div>
        <div className="provider-grid">
          {providers.map((provider, index) => {
            return (
              <ExpandableInstallCard
                key={provider.name}
                item={{
                  title: provider.name,
                  description: provider.description,
                  command: provider.command,
                  summary: provider.summary,
                  includes: provider.includes,
                  icon: provider.icon,
                  action: "Expand pack"
                }}
                index={index}
                variant="provider"
                expanded={expanded === provider.name}
                onToggle={() =>
                  setExpanded((current) => (current === provider.name ? null : provider.name))
                }
              />
            );
          })}
        </div>
      </section>
    </section>
  );
}
