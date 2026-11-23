import React from "react";
import { Field, useFieldIds, frameStyle, controlStyle } from "./Field.jsx";
// Componente local (não existe no design system oficial): mesma moldura do Input.
export const Textarea = React.forwardRef(function Textarea(
  { label, hint, error, disabled, id, required, rows = 3, className, style, ...rest },
  ref,
) {
  const { fieldId, msgId } = useFieldIds(id);
  return (
    <Field label={label} hint={hint} error={error} fieldId={fieldId} msgId={msgId} required={required} className={className}>
      <span className="ds-field" data-invalid={error ? "true" : undefined} style={{ ...frameStyle({ error, disabled, multiline: true }), ...style }}>
        <textarea ref={ref} id={fieldId} rows={rows} disabled={disabled} required={required}
          aria-invalid={error ? "true" : undefined} aria-describedby={error || hint ? msgId : undefined}
          style={{ ...controlStyle, resize: "vertical" }} {...rest} />
      </span>
    </Field>
  );
});
