import React from "react";
import { Field, useFieldIds, frameStyle, controlStyle } from "./Field.jsx";
// Cópia adaptada de ummix-ads-design/components/forms/Input.jsx: forwardRef, ...rest no <input>
// (id, name, required, autoComplete, inputMode, aria-*), foco em CSS (.ds-field).
export const Input = React.forwardRef(function Input(
  { label, hint, error, type = "text", prefix, suffix, disabled, id, required, className, style, ...rest },
  ref,
) {
  const { fieldId, msgId } = useFieldIds(id);
  return (
    <Field label={label} hint={hint} error={error} fieldId={fieldId} msgId={msgId} required={required} className={className}>
      <span className="ds-field" data-invalid={error ? "true" : undefined} style={{ ...frameStyle({ error, disabled }), ...style }}>
        {prefix && <span style={{ color: "var(--text-muted)", display: "flex", font: "var(--type-body-sm)" }}>{prefix}</span>}
        <input ref={ref} id={fieldId} type={type} disabled={disabled} required={required}
          aria-invalid={error ? "true" : undefined} aria-describedby={error || hint ? msgId : undefined}
          style={controlStyle} {...rest} />
        {suffix && <span style={{ color: "var(--text-muted)", display: "flex", font: "var(--type-body-sm)" }}>{suffix}</span>}
      </span>
    </Field>
  );
});
