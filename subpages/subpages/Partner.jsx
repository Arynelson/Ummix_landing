// Partner.jsx — hero (2 variants), process, partners grid w/ hover, form
const { useState: useStatePtr } = React;

// TODO: paste the real external form link (Google Forms / Typeform) here
const PARTNER_FORM_URL = '#';

/* ---- Hero ---- */
function PartnerEyebrow() {
  return (
    <span className="v2-eyebrow">
      <span className="v2-eyebrow-dot" />
      Programa de Parcerias Ummix Ads
    </span>
  );
}

function PartnerHeroCTAs() {
  return (
    <div className="sp-hero-ctas">
      <a className="v2-btn v2-btn-primary" href="#candidatura">
        Quero ser parceiro
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </a>
      <a className="v2-btn v2-btn-ghost" href="#processo">Como funciona</a>
    </div>
  );
}

function PartnerHeroA() {
  return (
    <section className="sp-hero sp-hero-a">
      <div className="v2-hero-bg" />
      <div className="v2-hero-grid" />
      <div className="sp-hero-inner">
        <PartnerEyebrow />
        <h1 className="sp-hero-h1">
          Sua agência, agora com acesso à <em>mídia de massa orientada a dados</em>.
        </h1>
        <p className="sp-hero-sub">
          Some o seu trabalho de criação e estratégia à inteligência de veiculação da Ummix
          em rádio, TV e mídia exterior. Mais resultado para o seu cliente, mais margem para a sua agência.
        </p>
        <PartnerHeroCTAs />
      </div>
    </section>
  );
}

function PartnerHeroB() {
  return (
    <section className="sp-hero sp-hero-b">
      <div className="v2-hero-bg" />
      <div className="v2-hero-grid" />
      <div className="sp-hero-inner">
        <div>
          <PartnerEyebrow />
          <h1 className="sp-hero-h1">
            Cresça junto com a <em>Ummix Ads</em>.
          </h1>
          <p className="sp-hero-sub">
            Um programa de parcerias pensado para agências que querem entregar mídia tradicional
            com a precisão do digital — sem montar uma estrutura de veiculação do zero.
          </p>
          <PartnerHeroCTAs />
        </div>
        <div className="sp-hero-panel">
          <div className="sp-hero-kpi">
            <div className="sp-hero-kpi-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><polyline points="7 15 12 10 16 14 21 8"/></svg>
            </div>
            <div>
              <div className="sp-hero-kpi-value">+150 veículos</div>
              <div className="sp-hero-kpi-label">à disposição das agências parceiras</div>
            </div>
          </div>
          <div className="sp-hero-kpi">
            <div className="sp-hero-kpi-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/><path d="M18 8l2 2 3-4"/></svg>
            </div>
            <div>
              <div className="sp-hero-kpi-value">Comissionamento</div>
              <div className="sp-hero-kpi-label">recorrente sobre a mídia veiculada</div>
            </div>
          </div>
          <div className="sp-hero-kpi">
            <div className="sp-hero-kpi-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.6L5.7 21l2.3-7.2-6-4.4h7.6z"/></svg>
            </div>
            <div>
              <div className="sp-hero-kpi-value">Suporte dedicado</div>
              <div className="sp-hero-kpi-label">planejamento e mensuração junto com você</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Process (placeholder copy — user fills later) ---- */
const PROCESS = [
  { t: 'Candidatura', d: 'Você preenche o formulário de interesse e nosso time avalia o perfil da sua agência.' },
  { t: 'Onboarding', d: 'Apresentamos a plataforma, o método Ummix e as condições comerciais da parceria.' },
  { t: 'Ativação', d: 'Sua agência ganha acesso à base de veículos e começa a montar campanhas para os clientes.' },
  { t: 'Crescimento', d: 'Você acompanha resultados em tempo real e amplia a operação com nosso suporte contínuo.' },
];

function PartnerProcess() {
  return (
    <section id="processo" className="v2-section sp-process">
      <div className="v2-wrap">
        <div className="v2-section-head">
          <span className="v2-section-tag">Como virar parceiro</span>
          <h2>Quatro passos para começar.</h2>
          <p className="v2-section-lede">
            Um processo simples e transparente — da candidatura à primeira campanha no ar.
          </p>
          <div className="sp-placeholder-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01"/><circle cx="12" cy="12" r="9"/></svg>
            Texto provisório — substitua pela descrição oficial do processo
          </div>
        </div>
        <div className="sp-process-grid">
          {PROCESS.map((s, i) => (
            <div key={i} className="sp-process-card">
              <div className="sp-process-step">{i + 1}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              {i < PROCESS.length - 1 && (
                <span className="sp-process-connector">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Partners grid (placeholder agencies) ---- */
const PARTNERS = [
  { mark: 'NA', name: 'Nome da Agência', city: 'Goiânia · GO', desc: 'Breve descrição da agência parceira — especialidade e foco de atuação.' },
  { mark: 'AG', name: 'Agência Exemplo', city: 'São Paulo · SP', desc: 'Performance e branding para marcas de varejo em todo o país.' },
  { mark: 'MK', name: 'Marca & Co.', city: 'Brasília · DF', desc: 'Comunicação integrada com forte atuação no setor público.' },
  { mark: 'PB', name: 'Publi Brasil', city: 'Curitiba · PR', desc: 'Mídia e criação para o agronegócio e indústria.' },
  { mark: 'ST', name: 'Studio Traço', city: 'Belo Horizonte · MG', desc: 'Branding e conteúdo para marcas em crescimento.' },
  { mark: 'VX', name: 'Vértice X', city: 'Recife · PE', desc: 'Performance marketing e mídia programática.' },
  { mark: 'ID', name: 'Ideia Viva', city: 'Porto Alegre · RS', desc: 'Campanhas regionais com forte presença em rádio e TV.' },
  { mark: 'CR', name: 'Criativa Hub', city: 'Florianópolis · SC', desc: 'Estratégia digital e mídia offline integradas.' },
];

function PartnerGrid() {
  return (
    <section id="parceiros" className="v2-section sp-partners">
      <div className="v2-wrap">
        <div className="v2-section-head">
          <span className="v2-section-tag">Quem já é parceiro</span>
          <h2>Agências que já operam com a Ummix.</h2>
          <p className="v2-section-lede">
            Passe o mouse sobre cada agência para conhecer um pouco mais. (Logos provisórios — envie os oficiais para substituirmos.)
          </p>
        </div>
        <div className="sp-partners-grid">
          {PARTNERS.map((p, i) => (
            <div key={i} className="sp-partner" tabIndex="0">
              <span className="sp-partner-mark">{p.mark}</span>
              <div className="sp-partner-info">
                <p className="sp-partner-name">{p.name}</p>
                <span className="sp-partner-city">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {p.city}
                </span>
                <p className="sp-partner-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Form ---- */
function PartnerForm() {
  const [sent, setSent] = useStatePtr(false);
  const onSubmit = (e) => {
    e.preventDefault();
    // If an external form URL is configured, you can redirect instead:
    // window.open(PARTNER_FORM_URL, '_blank');
    setSent(true);
  };
  return (
    <section id="candidatura" className="v2-section sp-form-section">
      <div className="v2-wrap">
        <div className="sp-form-wrap">
          <div className="sp-form-copy">
            <h2>Vamos construir essa parceria?</h2>
            <p>Conte um pouco sobre a sua agência. Nosso time entra em contato para apresentar o programa.</p>
            <div className="sp-form-bullets">
              {['Acesso à base de 150+ veículos de mídia', 'Comissionamento recorrente', 'Planejamento e mensuração com nosso time'].map(b => (
                <div key={b} className="sp-form-bullet">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {b}
                </div>
              ))}
            </div>
          </div>
          {!sent ? (
            <form className="sp-form" onSubmit={onSubmit}>
              <div className="sp-field">
                <label htmlFor="p-nome">Nome</label>
                <input id="p-nome" type="text" placeholder="Seu nome completo" required />
              </div>
              <div className="sp-field">
                <label htmlFor="p-email">E-mail corporativo</label>
                <input id="p-email" type="email" placeholder="voce@suaagencia.com.br" required />
              </div>
              <div className="sp-field">
                <label htmlFor="p-agencia">Nome da agência</label>
                <input id="p-agencia" type="text" placeholder="Como sua agência se chama" required />
              </div>
              <div className="sp-field">
                <label htmlFor="p-tel">Telefone / WhatsApp</label>
                <input id="p-tel" type="tel" placeholder="(00) 00000-0000" required />
              </div>
              <button type="submit" className="v2-btn v2-btn-primary">
                Enviar candidatura
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
              <p className="sp-form-alt">
                Prefere o formulário completo? <a href={PARTNER_FORM_URL} target="_blank" rel="noopener">Abrir formulário →</a>
              </p>
            </form>
          ) : (
            <div className="sp-form-success">
              <div className="sp-form-success-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3>Candidatura recebida!</h3>
              <p>Nosso time de parcerias entra em contato em breve.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PartnerHeroA, PartnerHeroB, PartnerProcess, PartnerGrid, PartnerForm });
