import React from "react";
import { Field, useFieldIds, frameStyle } from "./Field.jsx";
// Cópia adaptada de ummix-ads-design/components/forms/Select.jsx: forwardRef, ...rest no <select>,
// label ligado por id, aceita children (<option>) além de options.
export const Select = React.forwardRef(function Select(
  { label, hint, error, options, children, disabled, id, required, className, style, ...rest },
  ref,
) {
  const { fieldId, msgId } = useFieldIds(id);
  return (
    <Field label={label} hint={hint} error={error} fieldId={fieldId} msgId={msgId} required={required} className={className}>
      <span className="ds-field" data-invalid={error ? "true" : undefined} style={{ ...frameStyle({ error, disabled }), position: "relative", padding: 0 }}>
        <select ref={ref} id={fieldId} disabled={disabled} required={required}
          aria-invalid={error ? "true" : undefined} aria-describedby={error || hint ? msgId : undefined}
          style={{ appearance: "none", width: "100%", minHeight: "var(--control-lg)", padding: "0 36px 0 12px", border: 0, outline: 0,
            background: "transparent", color: "var(--text-strong)", font: "var(--type-body)", cursor: "pointer", ...style }}
          {...rest}>
          {children ?? (options || []).map((o) => typeof o === "string"
            ? <option key={o} value={o}>{o}</option>
            : <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-muted)" }}><path d="m6 9 6 6 6-6" /></svg>
      </span>
    </Field>
  );
});
