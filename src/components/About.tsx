import { CheckCircle2, Clock3, PackageOpen, ShieldCheck } from "lucide-react";

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
    title: "MCPs are references",
    text: "The MCP folder shows config examples. Those files are not Codex skill installs.",
    icon: ShieldCheck
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
        <h2>Built as a fast setup guide, not a mystery installer.</h2>
        <p>
          Skill Starter Pack points your agent to real skill paths, category bundles, provider packs,
          and MCP examples. The agent still asks what you need when the README is used as the starting
          point.
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
