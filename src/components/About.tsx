import { CheckCircle2, Clock3, PackageOpen, Sparkles } from "lucide-react";

const notes = [
  {
    title: "Install only what matters",
    text: "Use favourites, lightweight quickstart, or a focused scenario before reaching for the full catalog.",
    icon: CheckCircle2
  },
  {
    title: "Bundles for every workflow",
    text: "Categories cover web development, design, debugging, CI, deployment, cybersec, documents, and more.",
    icon: PackageOpen
  },
  {
    title: "Start from the right scope",
    text: "Pick categories, scenarios, favourites, originals, or provider packs instead of installing blindly.",
    icon: Sparkles
  },
  {
    title: "Restart after install",
    text: "After installing skills in Codex, restart Codex so the new skills are picked up.",
    icon: Clock3
  }
];

export function About() {
  return (
    <section id="about" className="about-band">
      <div>
        <span>Curated. Focused. Agent-ready.</span>
        <h2>A practical index for agent workflows.</h2>
        <p>
          Skill Starter Pack points your agent to real skill paths, category bundles, provider packs,
          and focused shortlists. When the README is used as the starting point, the agent should ask
          what you are setting up before installing anything.
        </p>
      </div>
      <div className="about-points">
        {notes.map((note) => {
          const Icon = note.icon;
          return (
            <article key={note.title}>
              <Icon aria-hidden="true" />
              <strong>{note.title}</strong>
              <p>{note.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
