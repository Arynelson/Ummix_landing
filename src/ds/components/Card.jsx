import React from "react";
export function Card({ children, padding = 24, interactive, tone = "default", style, onClick }) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    default: { bg: "var(--surface-card)", bd: "var(--border-subtle)", fg: "inherit" },
    sunken: { bg: "var(--bg-sunken)", bd: "transparent", fg: "inherit" },
    brand: { bg: "var(--red-600)", bd: "transparent", fg: "#fff" },
    dark: { bg: "var(--ink-900)", bd: "#2A2321", fg: "var(--ink-25)" },
  };
  const t = tones[tone] || tones.default;
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ background: t.bg, color: t.fg, border: `1px solid ${interactive && hover ? "var(--border-default)" : t.bd}`, borderRadius: "var(--radius-lg)", padding,
        boxShadow: tone === "default" ? (interactive && hover ? "var(--shadow-md)" : "var(--shadow-xs)") : "none",
        transition: "box-shadow var(--duration-base) var(--ease-out), border-color var(--duration-base)", cursor: interactive ? "pointer" : undefined, minWidth: 0, ...style }}>
      {children}
    </div>
  );
}
