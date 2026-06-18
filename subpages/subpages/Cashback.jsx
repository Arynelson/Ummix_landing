// Cashback.jsx — hero (2 variants), how-it-works, 3% highlight, CTA
// TODO: paste the real external cashback form link here
const CASHBACK_FORM_URL = '#';
const CASHBACK_PLATFORM = 'Live'; // external cashback platform name

/* ---- Hero ---- */
function CashbackEyebrow() {
  return (
    <span className="v2-eyebrow">
      <span className="v2-eyebrow-dot" />
      Programa de Cashback Ummix Ads
    </span>
  );
}

function CashbackHeroCTAs() {
  return (
    <div className="sp-hero-ctas">
      <a className="v2-btn v2-btn-primary" href="#formulario">
        Quero meu cashback
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </a>
      <a className="v2-btn v2-btn-ghost" href="#como-funciona">Como funciona</a>
    </div>
  );
}

function CashbackHeroA() {
  return (
    <section className="sp-hero sp-hero-a">
      <div className="v2-hero-bg" />
      <div className="v2-hero-grid" />
      <div className="sp-hero-inner">
        <CashbackEyebrow />
        <h1 className="sp-hero-h1">
          Invista em mídia e receba <em>3% de volta</em>.
        </h1>
        <p className="sp-hero-sub">
          O programa de cashback da Ummix Ads devolve parte do seu investimento em mídia
          diretamente na sua conta. Cadastre-se, anuncie e acumule — é simples assim.
        </p>
        <CashbackHeroCTAs />
      </div>
    </section>
  );
}

function CashbackHeroB() {
  return (
    <section className="sp-hero sp-hero-b">
      <div className="v2-hero-bg" />
      <div className="v2-hero-grid" />
      <div className="sp-hero-inner">
        <div>
          <CashbackEyebrow />
          <h1 className="sp-hero-h1">
            Seu investimento em mídia rende <em>cashback</em>.
          </h1>
          <p className="sp-hero-sub">
            Cada real veiculado pela Ummix Ads acumula 3% de cashback, creditado através
            da plataforma {CASHBACK_PLATFORM}. Basta preencher o nosso formulário para ativar.
          </p>
          <CashbackHeroCTAs />
        </div>
        <div className="sp-hero-panel">
          <div className="sp-hero-kpi">
            <div className="sp-hero-kpi-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5"/><path d="M12 17h.01"/></svg>
            </div>
            <div>
              <div className="sp-hero-kpi-value">3% de volta</div>
              <div className="sp-hero-kpi-label">sobre o total investido em mídia</div>
            </div>
          </div>
          <div className="sp-hero-kpi">
            <div className="sp-hero-kpi-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
            </div>
            <div>
              <div className="sp-hero-kpi-value">Crédito via {CASHBACK_PLATFORM}</div>
              <div className="sp-hero-kpi-label">plataforma parceira de cashback</div>
            </div>
          </div>
          <div className="sp-hero-kpi">
            <div className="sp-hero-kpi-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/></svg>
            </div>
            <div>
              <div className="sp-hero-kpi-value">Ativação simples</div>
              <div className="sp-hero-kpi-label">um único formulário para começar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- How it works ---- */
const CB_STEPS = [
  { n: '01', t: 'Cadastre-se', d: 'Preencha o formulário de cashback da Ummix para ativar o programa na sua conta.',
    icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></> },
  { n: '02', t: 'Invista em mídia', d: 'Crie e veicule suas campanhas em rádio, TV e mídia exterior normalmente pela plataforma.',
    icon: <><path d="M3 3v18h18"/><polyline points="7 15 12 10 16 14 21 8"/></> },
  { n: '03', t: 'Acumule cashback', d: 'A cada investimento, 3% do valor é acumulado automaticamente como cashback.',
    icon: <><circle cx="12" cy="12" r="9"/><path d="M9 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5"/><path d="M12 17h.01"/></> },
  { n: '04', t: 'Resgate', d: `Seu saldo fica disponível para resgate através da plataforma ${CASHBACK_PLATFORM}.`,
    icon: <><path d="M12 2v14M6 10l6 6 6-6"/><path d="M4 20h16"/></> },
];

function CashbackHow() {
  return (
    <section id="como-funciona" className="v2-section cb-how">
      <div className="v2-wrap">
        <div className="v2-section-head">
          <span className="v2-section-tag">Como funciona</span>
          <h2>Do cadastro ao resgate, em quatro passos.</h2>
          <p className="v2-section-lede">
            O cashback é acumulado automaticamente — você só precisa ativar uma vez.
          </p>
        </div>
        <div className="cb-steps">
          {CB_STEPS.map(s => (
            <div key={s.n} className="cb-step">
              <div className="cb-step-badge"><span className="cb-step-badge-dot" />PASSO {s.n}</div>
              <div className="cb-step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
              </div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Big 3% highlight ---- */
function CashbackHighlight() {
  return (
    <section className="v2-section cb-highlight">
      <div className="v2-wrap">
        <div className="cb-highlight-card">
          <div className="cb-big">3<span className="pct">%</span></div>
          <div className="cb-highlight-copy">
            <h2>De cada real investido, de volta para você.</h2>
            <p>
              Sem letra miúda escondida: o cashback incide sobre o total veiculado e é
              creditado de forma transparente na plataforma parceira.
            </p>
            <span className="cb-platform-tag">
              <span className="live-dot" />
              Crédito via <strong>{CASHBACK_PLATFORM}</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Final CTA → form ---- */
function CashbackCTA() {
  return (
    <section id="formulario" className="v2-cta">
      <div className="v2-cta-inner">
        <h2>Ative seu cashback agora.</h2>
        <p>
          Preencha o formulário de cashback da Ummix Ads e comece a acumular 3% sobre
          todo o seu investimento em mídia.
        </p>
        <div className="v2-cta-ctas">
          <a className="v2-btn v2-btn-primary" href={CASHBACK_FORM_URL} target="_blank" rel="noopener">
            Preencher formulário de cashback
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
          <a className="v2-btn v2-btn-ghost" href="#como-funciona">Rever como funciona</a>
        </div>
        <p className="v2-cta-note">
          Dúvidas sobre o programa? <a href="mailto:fale@ummixads.com.br">fale@ummixads.com.br</a>
        </p>
      </div>
    </section>
  );
}

Object.assign(window, { CashbackHeroA, CashbackHeroB, CashbackHow, CashbackHighlight, CashbackCTA });
