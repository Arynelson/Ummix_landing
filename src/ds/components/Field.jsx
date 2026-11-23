import React from "react";
// Moldura comum dos campos (Input, Select, Textarea). Adaptação local: label ligado por id,
// hint/erro ligados por aria-describedby, aria-invalid no erro.
export function useFieldIds(id) {
  const auto = React.useId();
  const fieldId = id || `f${auto.replace(/:/g, "")}`;
  return { fieldId, msgId: `${fieldId}-msg` };
}

export function Field({ label, hint, error, fieldId, msgId, required, className = "", children }) {
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
      {label && (
        <label htmlFor={fieldId} style={{ font: "var(--type-label)", color: "var(--text-strong)" }}>
          {label}{required && <span aria-hidden="true" style={{ color: "var(--text-brand)" }}> *</span>}
        </label>
      )}
      {children}
      {(error || hint) && (
        <span id={msgId} role={error ? "alert" : undefined} style={{ font: "var(--type-caption)", color: error ? "var(--danger-600)" : "var(--text-muted)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}

export function frameStyle({ error, disabled, multiline }) {
  return {
    display: "flex", alignItems: multiline ? "stretch" : "center", gap: 8, minHeight: multiline ? undefined : "var(--control-lg)",
    padding: multiline ? "10px 12px" : "0 12px", borderRadius: "var(--radius-md)",
    background: disabled ? "var(--bg-sunken)" : "var(--surface-card)",
    border: `1px solid ${error ? "var(--danger-600)" : "var(--border-default)"}`,
  };
}

export const controlStyle = { flex: 1, minWidth: 0, border: 0, outline: 0, background: "transparent", font: "var(--type-body)", color: "var(--text-strong)" };
