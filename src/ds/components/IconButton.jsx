import React from "react";
// Cópia adaptada de ummix-ads-design/components/actions/IconButton.jsx: hover em CSS (.ds-btn), className e ...rest.
export const IconButton = React.forwardRef(function IconButton(
  { label, variant = "ghost", size = "md", children, onClick, disabled, className = "", style, ...rest },
  ref,
) {
  const dim = size === "sm" ? 32 : size === "lg" ? 48 : 40;
  const bg = variant === "primary" ? "var(--accent)" : variant === "secondary" ? "var(--surface-card)" : "transparent";
  const hover = variant === "primary" ? "var(--accent-hover)" : "var(--bg-sunken)";
  const fg = variant === "primary" ? "var(--on-accent)" : "var(--text-body)";
  return (
    <button ref={ref} type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick} className={`ds-btn ${className}`.trim()}
      style={{ "--ds-bg": bg, "--ds-bg-hover": hover, "--ds-fg": fg, width: dim, height: dim, display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--radius-md)", border: variant === "secondary" ? "1px solid var(--border-default)" : "1px solid transparent",
        color: fg, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, padding: 0, ...style }}
      {...rest}>
      {children}
    </button>
  );
});
