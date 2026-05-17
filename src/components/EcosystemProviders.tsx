import { ArrowRight } from "lucide-react";
import { ecosystem, providers, stats } from "../data";

export function EcosystemProviders() {
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
