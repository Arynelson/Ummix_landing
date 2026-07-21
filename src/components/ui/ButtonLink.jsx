const VARIANTS = {
  primary: 'bg-ummix-red text-white shadow-lg hover:scale-[1.03] hover:bg-ummix-red-dark',
  'outline-dark': 'border-[1.5px] border-ummix-dark text-ummix-dark hover:scale-[1.03] hover:bg-ummix-dark hover:text-white',
  'outline-light': 'border-[1.5px] border-white/40 text-white hover:scale-[1.03] hover:bg-white/10',
};

const SIZES = {
  md: 'px-7 py-4 text-sm',
  lg: 'px-8 py-4.5 text-sm',
  xl: 'px-10 py-4 text-base',
};

export default function ButtonLink({ children, className = '', size = 'md', variant = 'primary', ...props }) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-bold transition-all ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
