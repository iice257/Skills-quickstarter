import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { needCards } from "../data";

export function NeedCards() {
  return (
    <section id="skills" className="need-section">
      <div className="section-heading dark">
        <span>Choose a path</span>
        <h2>What do you need today?</h2>
        <p>Pick the install or config area that matches the setup you want.</p>
      </div>
      <div className="need-grid">
        {needCards.map((card, index) => {
          const Icon = card.icon;
          const external = card.href.startsWith("http");

          return (
            <motion.a
              key={card.title}
              className="spotlight-card"
              href={card.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.04, duration: 0.45 }}
            >
              <span className="icon-chip">
                <Icon aria-hidden="true" />
              </span>
              <strong>{card.title}</strong>
              <p>{card.text}</p>
              <span className="card-action">
                {card.action}
                <ArrowRight aria-hidden="true" />
              </span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
