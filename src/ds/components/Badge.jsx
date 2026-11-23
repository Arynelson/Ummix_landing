import React from "react";
const TONES = {
  neutral: ["var(--bg-sunken)", "var(--text-body)"], brand: ["var(--accent-soft)", "var(--text-brand)"],
  success: ["var(--success-100)", "var(--success-600)"], warning: ["var(--warning-100)", "var(--warning-600)"],
  danger: ["var(--danger-100)", "var(--danger-600)"], info: ["var(--info-100)", "var(--info-600)"],
};
export function Badge({ tone = "neutral", dot, children }) {
  const [bg, fg] = TONES[tone] || TONES.neutral;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 22, padding: "0 8px", borderRadius: "var(--radius-pill)", background: bg, color: fg, font: "500 12px/1 var(--font-body)", whiteSpace: "nowrap" }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />}{children}
    </span>
  );
}
