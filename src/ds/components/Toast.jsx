import React from "react";
const ICON = { success: "M20 6 9 17l-5-5", danger: "M12 8v4m0 4h.01", info: "M12 16v-4m0-4h.01" };
export function Toast({ tone = "info", title, message, onClose }) {
  const c = tone === "success" ? "var(--success-600)" : tone === "danger" ? "var(--danger-600)" : "var(--info-600)";
  return (
    <div role="status" style={{ display: "flex", gap: 12, alignItems: "flex-start", width: 360, maxWidth: "100%", padding: "14px 16px", background: "var(--ink-900)", color: "var(--ink-25)",
      borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-lg)" }}>
      <span style={{ width: 22, height: 22, borderRadius: "50%", background: c, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d={ICON[tone] || ICON.info} /></svg>
      </span>
      <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {title && <span style={{ font: "600 14px/1.3 var(--font-display)" }}>{title}</span>}
        {message && <span style={{ font: "var(--type-body-sm)", color: "var(--ink-300)" }}>{message}</span>}
      </span>
      {onClose && <button aria-label="Fechar" onClick={onClose} style={{ background: "none", border: 0, color: "var(--ink-400)", cursor: "pointer", padding: 2, display: "flex" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg></button>}
    </div>
  );
}
