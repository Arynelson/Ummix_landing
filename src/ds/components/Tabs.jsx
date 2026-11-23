import React from "react";
export function Tabs({ items = [], value, defaultValue, onChange, variant = "underline" }) {
  const [inner, setInner] = React.useState(defaultValue ?? (items[0] && (items[0].value ?? items[0])));
  const cur = value !== undefined ? value : inner;
  const pick = (v) => { setInner(v); onChange && onChange(v); };
  const seg = variant === "segmented";
  return (
    <div role="tablist" style={{ display: "flex", gap: seg ? 2 : 24, padding: seg ? 3 : 0, background: seg ? "var(--bg-sunken)" : "transparent", borderRadius: seg ? "var(--radius-md)" : 0,
      borderBottom: seg ? "none" : "1px solid var(--border-subtle)", width: seg ? "fit-content" : undefined }}>
      {items.map((it) => { const v = it.value ?? it; const l = it.label ?? it; const on = v === cur;
        return (
          <button key={v} role="tab" aria-selected={on} onClick={() => pick(v)}
            style={{ border: 0, cursor: "pointer", font: `${on ? 600 : 500} 14px/1 var(--font-display)`, color: on ? "var(--text-strong)" : "var(--text-muted)",
              background: seg ? (on ? "var(--surface-card)" : "transparent") : "transparent", boxShadow: seg && on ? "var(--shadow-xs)" : "none",
              padding: seg ? "8px 14px" : "12px 0", borderRadius: seg ? "var(--radius-sm)" : 0, marginBottom: seg ? 0 : -1,
              borderBottom: seg ? "none" : `2px solid ${on ? "var(--accent)" : "transparent"}`, transition: "color var(--duration-fast)" }}>
            {l}
          </button>);
      })}
    </div>
  );
}
