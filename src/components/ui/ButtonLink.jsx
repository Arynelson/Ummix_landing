import { Button } from '../../ds/components';

// Mantém a API antiga (variant/size/className/...props de <a>) e renderiza o Button oficial com href.
// Variantes antigas → oficiais:
//   primary       → primary   (vermelho chapado)
//   inverse       → inverse   (branco com texto vermelho, para fundo vermelho/escuro)
//   outline-dark  → secondary (fundo claro)
//   outline-light → secondary (em seção com data-theme="dark" os aliases invertem sozinhos)
// As oficiais (primary | secondary | soft | ghost | inverse) também são aceitas direto.
const VARIANTS = {
  primary: 'primary',
  inverse: 'inverse',
  'outline-dark': 'secondary',
  'outline-light': 'secondary',
  secondary: 'secondary',
  soft: 'soft',
  ghost: 'ghost',
};

// Tamanhos antigos (md/lg/xl) eram todos CTAs grandes → lg oficial. sm aceito para casos compactos.
const SIZES = {
  sm: 'sm',
  md: 'lg',
  lg: 'lg',
  xl: 'lg',
};

export default function ButtonLink({ children, className = '', size = 'md', variant = 'primary', href, ...props }) {
  return (
    <Button
      href={href}
      variant={VARIANTS[variant] || 'primary'}
      size={SIZES[size] || 'lg'}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
}
