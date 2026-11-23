import React from "react";
// Cópia adaptada de ummix-ads-design/components/forms/Checkbox.jsx: usa <input type="checkbox"> nativo
// (visualmente escondido) para funcionar com required, name, teclado e envio de formulário.
// onChange recebe o evento nativo (o original recebia um boolean).
export const Checkbox = React.forwardRef(function Checkbox(
  { label, description, disabled, id, className = "", style, children, ...rest },
  ref,
) {
  const auto = React.useId();
  const fieldId = id || `c${auto.replace(/:/g, "")}`;
  return (
    <label htmlFor={fieldId} className={`ds-check ${className}`.trim()}
      style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }}>
      <input ref={ref} id={fieldId} type="checkbox" disabled={disabled} className="ds-check-input" {...rest} />
      <span aria-hidden="true" className="ds-check-box">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
      </span>
      {(label || description || children) && (
        <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {label && <span style={{ font: "var(--type-body-sm)", color: "var(--text-strong)" }}>{label}</span>}
          {children}
          {description && <span style={{ font: "var(--type-caption)", color: "var(--text-muted)" }}>{description}</span>}
        </span>
      )}
    </label>
  );
});
