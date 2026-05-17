import { useState } from "react";
import { needCards } from "../data";
import { ExpandableInstallCard } from "./ExpandableInstallCard";

export function NeedCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="categories" className="paths-section">
      <div className="section-header">
        <div>
          <span className="section-eyebrow">Choose a path</span>
          <h2>
            What do you
            <br />
            need today?
          </h2>
        </div>
        <p>Pick the install or config area that matches the setup you want. Mix and match freely.</p>
      </div>
      <div className="need-grid">
        {needCards.map((card, index) => {
          return (
            <ExpandableInstallCard
              key={card.title}
              item={{
                title: card.title,
                description: card.text,
                command: card.command,
                summary: card.summary,
                includes: card.includes,
                icon: card.icon,
                action: card.action
              }}
              index={index}
              variant="path"
              expanded={expanded === card.title}
              onToggle={() => setExpanded((current) => (current === card.title ? null : card.title))}
            />
          );
        })}
      </div>
    </section>
  );
}
