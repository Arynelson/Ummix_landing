import React from "react";
export function StatCard({ label, value, unit, delta, deltaLabel, tone = "default", style }) {
  const dark = tone === "dark"; const brand = tone === "brand";
  const up = typeof delta === "number" ? delta >= 0 : null;
  return (
    <div style={{ background: brand ? "var(--red-600)" : dark ? "var(--ink-900)" : "var(--surface-card)", border: brand || dark ? "1px solid transparent" : "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)", padding: 20, display: "flex", flexDirection: "column", gap: 12, minWidth: 0, boxShadow: brand || dark ? "none" : "var(--shadow-xs)", ...style }}>
      <span style={{ font: "500 13px/1.3 var(--font-body)", color: brand ? "rgba(255,255,255,.85)" : dark ? "var(--ink-300)" : "var(--text-muted)" }}>{label}</span>
      <span style={{ display: "flex", alignItems: "baseline", gap: 4, color: brand || dark ? "#fff" : "var(--text-strong)" }}>
        <span style={{ font: "var(--type-metric)", letterSpacing: "-0.02em" }}>{value}</span>
        {unit && <span style={{ font: "500 16px/1 var(--font-mono)", color: brand ? "#fff" : dark ? "var(--red-400)" : "var(--text-brand)" }}>{unit}</span>}
      </span>
      {delta !== undefined && <span style={{ font: "500 12px/1 var(--font-mono)", color: brand ? "#fff" : up ? "var(--success-600)" : "var(--danger-600)" }}>
        {up ? "▲" : "▼"} {Math.abs(delta).toLocaleString("pt-BR")}% <span style={{ fontFamily: "var(--font-body)", color: brand ? "rgba(255,255,255,.8)" : "var(--text-muted)" }}>{deltaLabel}</span></span>}
    </div>
  );
}
