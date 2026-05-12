import { Github, Sparkles } from "lucide-react";
import { commands, repoUrl } from "../data";
import { CopyButton } from "./CopyButton";

export function BottomCta() {
  const guidedCommand = commands[0].command;

  return (
    <section className="bottom-cta">
      <div>
        <span>
          <Sparkles aria-hidden="true" />
          Guided setup
        </span>
        <h2>One command. Everything you need.</h2>
        <p>Point your agent at the README, choose the setup you want, then restart Codex after install.</p>
      </div>

      <div className="cta-command">
        <code>{guidedCommand}</code>
        <CopyButton value={guidedCommand} label="Copy command" />
      </div>

      <a href={repoUrl} target="_blank" rel="noreferrer" className="repo-link">
        <Github aria-hidden="true" />
        Open GitHub repo
      </a>
    </section>
  );
}
