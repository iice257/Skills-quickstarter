import { ArrowRight } from "lucide-react";
import { commands, repoUrl } from "../data";
import { CopyButton } from "./CopyButton";

export function QuickStart() {
  return (
    <section id="quick-start" className="quick-panel">
      <div className="quick-panel-top">
        <span>Quick start</span>
        <h2>Copy a command into your agent.</h2>
        <p>Each command points to a real README, folder, or shortlist in the repo.</p>
      </div>

      <div className="command-list">
        {commands.map((item) => {
          const Icon = item.icon;

          return (
            <div className="command-row" key={item.label}>
              <span className="command-icon">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <strong>{item.label}</strong>
                <p>{item.description}</p>
                <code>{item.command}</code>
              </div>
              <CopyButton value={item.command} />
            </div>
          );
        })}
      </div>

      <a className="quick-more" href={`${repoUrl}#quick-start`} target="_blank" rel="noreferrer">
        View all quick start options
        <ArrowRight aria-hidden="true" />
      </a>
    </section>
  );
}
