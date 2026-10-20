import { useState } from "react";
import { newSkills, orchestrationCopy } from "../data";
import type { MultiSelectControls } from "../types";
import { ExpandableInstallCard } from "./ExpandableInstallCard";

type NewSkillsSectionProps = {
  multiSelect: MultiSelectControls;
};

export function NewSkillsSection({ multiSelect }: NewSkillsSectionProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="new" className="favorites-section" aria-labelledby="new-title">
      <div className="section-header">
        <div>
          <span className="section-eyebrow">New in this release</span>
          <h2 id="new-title">
            Orchestrate
            <br />
            and ship.
          </h2>
        </div>
        <p>{orchestrationCopy}</p>
      </div>

      <div className="favorites-grid release-grid">
        {newSkills.map((skill, index) => (
          <ExpandableInstallCard
            key={skill.name}
            item={{
              title: skill.name,
              description: skill.description,
              command: skill.command,
              summary: skill.summary,
              includes: skill.includes,
              icon: skill.icon,
              action: null
            }}
            index={index}
            expanded={expanded === index}
            multiSelect={multiSelect}
            onToggle={() => setExpanded((current) => (current === index ? null : index))}
            variant="provider"
          />
        ))}
      </div>
    </section>
  );
}
