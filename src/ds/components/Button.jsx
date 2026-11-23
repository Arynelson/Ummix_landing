import React from "react";
// Cópia adaptada de ummix-ads-design/components/actions/Button.jsx (ver src/ds/README.md):
// + href/target/rel (renderiza <a>), className e ...rest; hover/pressionado em CSS (.ds-btn), não em estado React.
const SIZES = { sm: { h: "var(--control-sm)", px: 12, fs: 13 }, md: { h: "var(--control-md)", px: 16, fs: 14 }, lg: { h: "var(--control-lg)", px: 22, fs: 16 } };
const VARIANTS = {
  primary: { bg: "var(--accent)", fg: "var(--on-accent)", bd: "transparent", hover: "var(--accent-hover)" },
  secondary: { bg: "var(--surface-card)", fg: "var(--text-strong)", bd: "var(--border-default)", hover: "var(--bg-sunken)" },
  soft: { bg: "var(--accent-soft)", fg: "var(--text-brand)", bd: "transparent", hover: "var(--accent-soft-strong)" },
  ghost: { bg: "transparent", fg: "var(--text-body)", bd: "transparent", hover: "var(--bg-sunken)" },
  inverse: { bg: "#FFFFFF", fg: "var(--red-600)", bd: "transparent", hover: "var(--red-50)" },
};
export const Button = React.forwardRef(function Button(
  { variant = "primary", size = "md", disabled, fullWidth, iconLeft, iconRight, children, onClick, type = "button", href, target, rel, className = "", style, ...rest },
  ref,
) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const css = {
    "--ds-bg": v.bg, "--ds-bg-hover": v.hover, "--ds-fg": v.fg,
    display: fullWidth ? "flex" : "inline-flex", width: fullWidth ? "100%" : undefined, alignItems: "center", justifyContent: "center", gap: 8,
    minHeight: s.h, padding: `0 ${s.px}px`, borderRadius: "var(--radius-md)", border: `1px solid ${v.bd}`,
    color: v.fg, font: `600 ${s.fs}px/1.2 var(--font-display)`, letterSpacing: "0.005em", textDecoration: "none",
    cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, whiteSpace: "nowrap", ...style,
  };
  const cls = `ds-btn ${className}`.trim();
  if (href) {
    const safeRel = rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);
    return (
      <a ref={ref} href={disabled ? undefined : href} target={target} rel={safeRel} aria-disabled={disabled || undefined} onClick={onClick} className={cls} style={css} {...rest}>
        {iconLeft}{children}{iconRight}
      </a>
    );
  }
  return (
    <button ref={ref} type={type} disabled={disabled} onClick={onClick} className={cls} style={css} {...rest}>
      {iconLeft}{children}{iconRight}
    </button>
  );
});
