import React from "react";
export function Tag({ children, selected, onClick, onRemove }) {
  const [hover, setHover] = React.useState(false);
  return (
    <span onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 30, padding: "0 12px", borderRadius: "var(--radius-pill)",
        border: `1px solid ${selected ? "var(--accent)" : "var(--border-default)"}`, background: selected ? "var(--accent-soft)" : hover && onClick ? "var(--bg-sunken)" : "var(--surface-card)",
        color: selected ? "var(--text-brand)" : "var(--text-body)", font: "500 13px/1 var(--font-body)", cursor: onClick ? "pointer" : "default", userSelect: "none", whiteSpace: "nowrap" }}>
      {children}
      {onRemove && <span role="button" aria-label="Remover" onClick={(e) => { e.stopPropagation(); onRemove(); }} style={{ display: "flex", cursor: "pointer", opacity: 0.7 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg></span>}
    </span>
  );
}
