import React from "react";
import { useInView } from "../../utils/useInView";
import "./Reveal.scss";

// ✅ Réglages en dur (tu touches ici une seule fois)
const OBSERVER = {
  once: true,
  threshold: 0.18,
  rootMargin: "0px 0px -14% 0px",
};

const TIMING = {
  delayMs: 0, // si tu veux un léger retard global, change ici
};

export function Reveal({ as: Tag = "div", children, className = "" }) {
  const { ref, inView } = useInView(OBSERVER);

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${TIMING.delayMs}ms` }}
    >
      {children}
    </Tag>
  );
}
