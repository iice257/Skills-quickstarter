import type { MouseEvent, ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

export function MagneticButton({
  children,
  href,
  variant = "primary",
  external = false,
  className = ""
}: MagneticButtonProps) {
  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    event.currentTarget.style.setProperty("--magnetic-x", `${x * 0.16}px`);
    event.currentTarget.style.setProperty("--magnetic-y", `${y * 0.16}px`);
  }

  function handleLeave(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.style.setProperty("--magnetic-x", "0px");
    event.currentTarget.style.setProperty("--magnetic-y", "0px");
  }

  return (
    <a
      className={`magnetic-button ${variant} ${className}`}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
