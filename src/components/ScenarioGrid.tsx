import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { scenarios } from "../data";
import { ExpandableInstallCard } from "./ExpandableInstallCard";

export function ScenarioGrid() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="scenarios" className="panel scenario-panel">
      <div className="panel-heading">
        <div>
          <span>Scenario bundles</span>
          <h2>Popular scenario bundles</h2>
        </div>
        <a href="https://github.com/iice257/Skills-quickstarter/tree/main/categories" target="_blank" rel="noreferrer">
          View all scenarios
          <ArrowRight aria-hidden="true" />
        </a>
      </div>

      <div className="scenario-grid">
        {scenarios.map((scenario, index) => {
          return (
            <ExpandableInstallCard
              key={scenario.name}
              item={{
                title: scenario.name,
                description: scenario.description,
                command: scenario.command,
                summary: scenario.summary,
                includes: scenario.includes,
                icon: scenario.icon,
                action: "Expand"
              }}
              index={index}
              variant="scenario"
              expanded={expanded === scenario.name}
              onToggle={() =>
                setExpanded((current) => (current === scenario.name ? null : scenario.name))
              }
            />
          );
        })}
      </div>
    </section>
  );
}
