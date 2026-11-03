import { ArrowRight } from "lucide-react";
import { orchestrateV2 } from "../data";

export function AnnounceBar() {
  return (
    <a
      className="announce-bar"
      href="#orchestrate-v2"
      onClick={(event) => {
        event.preventDefault();
        document.getElementById("orchestrate-v2")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      <span className="announce-bar-text">Orchestrate has a new version!</span>
      <code className="announce-bar-command">{orchestrateV2.command}</code>
      <span className="announce-bar-link">
        What's new <ArrowRight aria-hidden="true" />
      </span>
    </a>
  );
}
