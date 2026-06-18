// Chrome.jsx — shared header + footer for subpages, using the new full lockups.
const { useState: useStateChrome, useEffect: useEffectChrome } = React;

const PLATFORM_URL = 'https://ummix.workingtech.com.br/';
// Cross-page links (relative to /subpages/)
const NAV = {
  home: '../landing_v2/index.html',
  partner: 'partner.html',
  cashback: 'cashback.html',
};

function SubHeader({ active }) {
  const [scrolled, setScrolled] = useStateChrome(false);
  useEffectChrome(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', on, { passive: true });
    on();
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className={`v2-hdr ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="v2-hdr-inner">
        <a href={NAV.home} className="v2-logo" aria-label="Ummix Ads">
          {/* White lockup on dark hero, dark lockup once scrolled onto off-white */}
          <img src="../assets/logo_ummix_branca.png" alt="Ummix Ads" className="v2-logo-light" />
          <img src="../assets/logo_ummix_escura.png" alt="Ummix Ads" className="v2-logo-dark" />
        </a>
        <nav className="v2-nav" aria-label="Principal">
          <a href={NAV.home}>Início</a>
          <a href={NAV.partner} className={active === 'partner' ? 'is-current' : ''}>Parceiros</a>
          <a href={NAV.cashback} className={active === 'cashback' ? 'is-current' : ''}>Cashback</a>
        </nav>
        <a href={PLATFORM_URL} target="_blank" rel="noopener" className="v2-hdr-cta">
          Acessar plataforma
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
        </a>
      </div>
    </header>
  );
}

function SubFooter() {
  return (
    <footer className="v2-footer">
      <div className="v2-footer-inner">
        <img src="../assets/logo_ummix_branca.png" alt="Ummix Ads" style={{ height: 24, width: 'auto' }} />
        <div className="v2-footer-links">
          <a href={NAV.home}>Início</a>
          <a href={NAV.partner}>Parceiros</a>
          <a href={NAV.cashback}>Cashback</a>
          <a href="mailto:fale@ummixads.com.br">Contato</a>
        </div>
        <p className="v2-footer-copy">© {new Date().getFullYear()} Ummix Ads · Todos os direitos reservados</p>
      </div>
    </footer>
  );
}

Object.assign(window, { SubHeader, SubFooter, PLATFORM_URL, NAV });
