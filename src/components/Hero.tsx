import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import { trustItems } from "../data";
import { MagneticButton } from "./MagneticButton";

const HeroScene = lazy(() => import("./HeroScene").then((module) => ({ default: module.HeroScene })));

export function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <section
      id="home"
      className="hero-shell"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x, y });
      }}
      style={
        {
          "--tilt-x": `${tilt.x * 18}px`,
          "--tilt-y": `${tilt.y * 18}px`
        } as React.CSSProperties
      }
    >
      <div className="aurora" aria-hidden="true" />
      <div className="grid-glow" aria-hidden="true" />
      <div className="hero-inner">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="eyebrow">AI agent / harness essentials</span>
          <h1>
            Everything your <span>AI agent</span> needs, all in one place.
          </h1>
          <p>
            Curated skills, scenario bundles, provider packs, and MCP configs for Codex and other
            agentic IDEs.
          </p>

          <div className="hero-actions">
            <MagneticButton href="#scenarios">
              Explore Scenarios
              <ArrowRight aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href="#quick-start" variant="secondary">
              Quick Start
              <Zap aria-hidden="true" />
            </MagneticButton>
          </div>

          <div className="trust-row" aria-label="Trust signals">
            {trustItems.map((item) => (
              <span key={item}>
                <CheckCircle2 aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
        >
          <Suspense fallback={<div className="scene-placeholder">Loading agent workspace</div>}>
            <HeroScene />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
