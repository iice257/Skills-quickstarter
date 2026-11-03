import { orchestrateV2 } from "../data";
import { CopyButton } from "./CopyButton";

export function OrchestrateV2Section() {
  return (
    <section id="orchestrate-v2" className="favorites-section v2-section" aria-labelledby="v2-title">
      <div className="section-header">
        <div>
          <span className="section-eyebrow">New version / 3 Nov 2026</span>
          <h2 id="v2-title">
            Orchestrate
            <br />
            v2.
          </h2>
        </div>
        <p>{orchestrateV2.intro}</p>
      </div>

      <div className="v2-install">
        <code>{orchestrateV2.install}</code>
        <CopyButton value={orchestrateV2.install} />
      </div>

      <div className="v2-grid">
        {orchestrateV2.changes.map((change) => (
          <article key={change.title} className="v2-card">
            <h3>{change.title}</h3>
            <p>{change.text}</p>
          </article>
        ))}
      </div>

      <div className="v2-table-wrap">
        <table className="v2-table">
          <thead>
            <tr>
              <th scope="col">Tier</th>
              <th scope="col">Job</th>
              <th scope="col">Model today</th>
              <th scope="col">Account</th>
            </tr>
          </thead>
          <tbody>
            {orchestrateV2.tiers.map((row) => (
              <tr key={row.tier}>
                <th scope="row">{row.tier}</th>
                <td>{row.role}</td>
                <td>{row.model}</td>
                <td>{row.account}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
