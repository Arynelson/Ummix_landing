/* @ds-bundle: {"format":3,"namespace":"UmmixDesignSystem_df2ec9","components":[],"sourceHashes":{"landing_v2/Header.jsx":"aedbf58882ae","landing_v2/Hero.jsx":"110210b5ed14","landing_v2/Sections.jsx":"37b7cbc790ae","subpages/Cashback.jsx":"502879bcc7d9","subpages/Chrome.jsx":"cdfff648c817","subpages/Partner.jsx":"762866736b1d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.UmmixDesignSystem_df2ec9 = window.UmmixDesignSystem_df2ec9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// landing_v2/Header.jsx
try { (() => {
// Header.jsx — fixed nav, transparent until scrolled
const {
  useState: useStateHdr,
  useEffect: useEffectHdr
} = React;
function V2Header({
  platformUrl
}) {
  const [scrolled, setScrolled] = useStateHdr(false);
  useEffectHdr(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', on, {
      passive: true
    });
    on();
    return () => window.removeEventListener('scroll', on);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    className: `v2-hdr ${scrolled ? 'is-scrolled' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hdr-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "v2-logo",
    "aria-label": "Ummix Ads"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo_ummix_branca.png",
    alt: "Ummix Ads",
    className: "v2-logo-light"
  }), /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo_ummix_escura.png",
    alt: "Ummix Ads",
    className: "v2-logo-dark"
  })), /*#__PURE__*/React.createElement("nav", {
    className: "v2-nav",
    "aria-label": "Principal"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#metodo"
  }, "M\xE9todo"), /*#__PURE__*/React.createElement("a", {
    href: "#segmentacoes"
  }, "Segmenta\xE7\xE3o"), /*#__PURE__*/React.createElement("a", {
    href: "../subpages/partner.html"
  }, "Parceiros"), /*#__PURE__*/React.createElement("a", {
    href: "../subpages/cashback.html"
  }, "Cashback")), /*#__PURE__*/React.createElement("a", {
    href: platformUrl,
    target: "_blank",
    rel: "noopener",
    className: "v2-hdr-cta"
  }, "Acessar plataforma", /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 5l7 7-7 7"
  })))));
}
window.V2Header = V2Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "landing_v2/Header.jsx", error: String((e && e.message) || e) }); }

// landing_v2/Hero.jsx
try { (() => {
// Hero.jsx — 3 hero variants sharing the same copy + CTAs
// Hero photos — verified Unsplash UUIDs (broadcast / TV studio / cinema camera).
// These are direct photo-page URLs so they're stable and render the intended image.
const HERO_PHOTOS = {
  studio: 'https://images.unsplash.com/photo-1622829118131-27ab20ded438?w=1400&q=80&auto=format&fit=crop',
  // RED cinema camera w/ tally light
  control: 'https://images.unsplash.com/photo-1651465531201-7e430660fd82?w=1400&q=80&auto=format&fit=crop',
  // broadcast room w/ camera + equipment
  newsroom: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1400&q=80&auto=format&fit=crop',
  // camera studio set up
  antenna: 'https://images.unsplash.com/photo-1671575584088-03eb2811c30f?w=1400&q=80&auto=format&fit=crop' // camera in front of red/white wall
};
function V2HeroEyebrow() {
  return /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow-dot"
  }), "Vencedor \xB7 Pr\xEAmio Nacional de Inova\xE7\xE3o \xB7 CNI/SEBRAE");
}
function V2HeroCTAs({
  platformUrl
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-ctas"
  }, /*#__PURE__*/React.createElement("a", {
    className: "v2-btn v2-btn-primary",
    href: platformUrl,
    target: "_blank",
    rel: "noopener"
  }, "Criar conta gr\xE1tis", /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 5l7 7-7 7"
  }))), /*#__PURE__*/React.createElement("a", {
    className: "v2-btn v2-btn-ghost",
    href: platformUrl,
    target: "_blank",
    rel: "noopener"
  }, "Entrar na plataforma"));
}
function V2HeroTrust() {
  return /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-trust"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-hero-trust-item"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "SBT"), ", RedeTV, Band e mais")), /*#__PURE__*/React.createElement("span", {
    className: "v2-hero-trust-item"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })), /*#__PURE__*/React.createElement("span", null, "Dados de ", /*#__PURE__*/React.createElement("strong", null, "150+ ve\xEDculos"))), /*#__PURE__*/React.createElement("span", {
    className: "v2-hero-trust-item"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "R$ 50M+"), " em m\xEDdia gerenciada")));
}

// === Variant A — editorial split with photo card + floating stats ===
function V2HeroA({
  platformUrl,
  photo
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "v2-hero v2-hero-a"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-copy"
  }, /*#__PURE__*/React.createElement(V2HeroEyebrow, null), /*#__PURE__*/React.createElement("h1", {
    className: "v2-hero-h1"
  }, "Intelig\xEAncia de m\xEDdia para os ", /*#__PURE__*/React.createElement("em", null, "ve\xEDculos de massa"), "."), /*#__PURE__*/React.createElement("p", {
    className: "v2-hero-sub"
  }, "Pela primeira vez, r\xE1dio, TV, jornal e m\xEDdia exterior operam com a mesma precis\xE3o do digital. Segmenta\xE7\xE3o por dados, veicula\xE7\xE3o nas maiores emissoras do Brasil e mensura\xE7\xE3o em tempo real \u2014 em uma \xFAnica plataforma."), /*#__PURE__*/React.createElement(V2HeroCTAs, {
    platformUrl: platformUrl
  }), /*#__PURE__*/React.createElement(V2HeroTrust, null)), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-media"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-photo"
  }, /*#__PURE__*/React.createElement("img", {
    src: HERO_PHOTOS[photo],
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "v2-hero-photo-tag"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "6"
  })), "NO AR \xB7 m\xEDdia veiculando em tempo real")), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-stat-card top-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-stat-label"
  }, "Alcance"), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-stat-value"
  }, "+38M"), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-stat-sub"
  }, "impress\xF5es/semana")), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-stat-card bottom-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-stat-label"
  }, "Performance"), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-stat-value"
  }, "3.4\xD7"), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-stat-sub"
  }, "ROI m\xE9dio ponderado")))));
}

// === Variant B — full-bleed photo, centered editorial headline ===
function V2HeroB({
  platformUrl,
  photo
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "v2-hero v2-hero-b"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-bgphoto"
  }, /*#__PURE__*/React.createElement("img", {
    src: HERO_PHOTOS[photo],
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-inner"
  }, /*#__PURE__*/React.createElement(V2HeroEyebrow, null), /*#__PURE__*/React.createElement("h1", {
    className: "v2-hero-h1"
  }, "Seu or\xE7amento de m\xEDdia", /*#__PURE__*/React.createElement("br", null), "agora tem ", /*#__PURE__*/React.createElement("em", null, "b\xFAssola"), "."), /*#__PURE__*/React.createElement("p", {
    className: "v2-hero-sub"
  }, "A Ummix Ads transforma r\xE1dio, TV e m\xEDdia impressa em canais de performance \u2014 com segmenta\xE7\xE3o por dados, veicula\xE7\xE3o nos maiores ve\xEDculos do pa\xEDs e m\xE9tricas que antes s\xF3 existiam no digital."), /*#__PURE__*/React.createElement(V2HeroCTAs, {
    platformUrl: platformUrl
  }), /*#__PURE__*/React.createElement(V2HeroTrust, null)));
}

// === Variant C — dashboard-forward split ===
function V2HeroC({
  platformUrl
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "v2-hero v2-hero-c"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-copy"
  }, /*#__PURE__*/React.createElement(V2HeroEyebrow, null), /*#__PURE__*/React.createElement("h1", {
    className: "v2-hero-h1"
  }, "A plataforma da ", /*#__PURE__*/React.createElement("em", null, "m\xEDdia inteligente"), " no Brasil."), /*#__PURE__*/React.createElement("p", {
    className: "v2-hero-sub"
  }, "Planeje, veicule e mensure campanhas em r\xE1dio, TV, m\xEDdia exterior e impressos com a mesma precis\xE3o do digital. Tudo em tempo real, em um s\xF3 lugar."), /*#__PURE__*/React.createElement(V2HeroCTAs, {
    platformUrl: platformUrl
  }), /*#__PURE__*/React.createElement(V2HeroTrust, null)), /*#__PURE__*/React.createElement("div", {
    className: "v2-dashboard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-dashboard-chrome"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-dashboard-dots"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("div", {
    className: "v2-dashboard-url"
  }, "app.ummixads.com.br / campanhas / 2026-q1")), /*#__PURE__*/React.createElement("img", {
    className: "v2-dashboard-img",
    src: "../assets/platform-preview-dashboard.png",
    alt: "Dashboard Ummix Ads"
  }))));
}
Object.assign(window, {
  V2HeroA,
  V2HeroB,
  V2HeroC,
  HERO_PHOTOS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "landing_v2/Hero.jsx", error: String((e && e.message) || e) }); }

// landing_v2/Sections.jsx
try { (() => {
// Sections.jsx — Logos, Metrics, Pillars, Method, Segmentation, Testimonial, CTA, Footer
const {
  useState: useStateSec,
  useEffect: useEffectSec
} = React;

/* ---------- Logos strip ---------- */
const AUTHORITY_LOGOS = [['SBT', '../assets/logo_sbt.png'], ['RedeTV', '../assets/logo_redetv.png'], ['Band News', '../assets/logo_bandnews.png'], ['Rádio 89', '../assets/logo_radio89.png'], ['Sicredi', '../assets/logo_sicredi.png'], ['Sicoob', '../assets/logo_sicoob.png'], ['Detran', '../assets/logo_detran.png']];
function V2Logos() {
  return /*#__PURE__*/React.createElement("section", {
    id: "veiculos",
    className: "v2-logos"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-wrap"
  }, /*#__PURE__*/React.createElement("p", {
    className: "v2-logos-lead"
  }, "M\xEDdia veiculada em emissoras e parceiros como"), /*#__PURE__*/React.createElement("div", {
    className: "v2-logos-row"
  }, AUTHORITY_LOGOS.map(([name, src]) => /*#__PURE__*/React.createElement("img", {
    key: name,
    src: src,
    alt: name
  })))));
}

/* ---------- Metrics ---------- */
const METRICS = [{
  v: '150',
  s: '+',
  l: 'Veículos de mídia conectados em todo o país'
}, {
  v: '38',
  s: 'M',
  l: 'Pessoas alcançadas por semana em nossas campanhas'
}, {
  v: '3,4',
  s: '×',
  l: 'ROI médio ponderado dos anunciantes da plataforma'
}, {
  v: '50',
  s: 'M+',
  l: 'Em reais de mídia gerenciada pela Ummix Ads'
}];
function V2Metrics() {
  return /*#__PURE__*/React.createElement("section", {
    className: "v2-metrics"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-metrics-grid"
  }, METRICS.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "v2-metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-metric-value"
  }, m.v, /*#__PURE__*/React.createElement("span", {
    className: "suffix"
  }, m.s)), /*#__PURE__*/React.createElement("p", {
    className: "v2-metric-label"
  }, m.l))))));
}

/* ---------- Value pillars ---------- */
const PILLARS = [{
  num: '01',
  t: 'Autoridade no veículo certo',
  d: 'Colocamos sua marca nas emissoras, rádios e títulos mais compatíveis com o seu público — com acesso direto às maiores redes do país.',
  icon: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4 6h16v10H4z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 20h8M12 16v4"
  }))
}, {
  num: '02',
  t: 'Precisão de dados',
  d: 'Segmentamos audiências por geolocalização, renda, comportamento e afinidade usando uma base proprietária de milhões de brasileiros.',
  icon: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.2",
    fill: "currentColor"
  }))
}, {
  num: '03',
  t: 'Performance mensurável',
  d: 'Dashboards em tempo real, atribuição de resultado e relatórios executivos — a mesma régua do digital aplicada à mídia tradicional.',
  icon: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 3v18h18"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 15 12 10 16 14 21 8"
  }))
}];
function V2Pillars() {
  return /*#__PURE__*/React.createElement("section", {
    id: "solucoes",
    className: "v2-section v2-pillars"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-section-tag"
  }, "Por que Ummix"), /*#__PURE__*/React.createElement("h2", null, "A m\xEDdia de massa, finalmente orientada a dados."), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-lede"
  }, "Tr\xEAs pilares que fazem a Ummix Ads a escolha de anunciantes que querem presen\xE7a nacional com a disciplina do performance marketing.")), /*#__PURE__*/React.createElement("div", {
    className: "v2-pillars-grid"
  }, PILLARS.map(p => /*#__PURE__*/React.createElement("article", {
    key: p.num,
    className: "v2-pillar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-pillar-num"
  }, p.num), /*#__PURE__*/React.createElement("div", {
    className: "v2-pillar-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p.icon)), /*#__PURE__*/React.createElement("h3", null, p.t), /*#__PURE__*/React.createElement("p", null, p.d))))));
}

/* ---------- Method ---------- */
const METHOD = [{
  n: '01',
  t: 'Diagnóstico e público-alvo',
  d: 'Entendemos o seu negócio, mapeamos a jornada do consumidor e desenhamos o perfil ideal do público que será impactado.'
}, {
  n: '02',
  t: 'Planejamento de mídia',
  d: 'Nosso método proprietário cruza dados de audiência, afinidade e geolocalização para escolher os veículos com maior retorno potencial.'
}, {
  n: '03',
  t: 'Criação e veiculação',
  d: 'Produzimos as peças, negociamos com as emissoras e colocamos sua campanha no ar nos espaços mais relevantes do país.'
}, {
  n: '04',
  t: 'Mensuração contínua',
  d: 'Acompanhamos alcance, frequência e performance em tempo real — e ajustamos a campanha conforme os resultados aparecem.'
}, {
  n: '05',
  t: 'Relatórios executivos',
  d: 'Você recebe leitura executiva do que funcionou, onde investir mais e quais veículos devem entrar no próximo ciclo.'
}, {
  n: '06',
  t: 'Otimização recorrente',
  d: 'A cada onda, refinamos segmentação e alocação — transformando mídia tradicional em um canal de performance previsível.'
}];
function V2Method() {
  return /*#__PURE__*/React.createElement("section", {
    id: "metodo",
    className: "v2-section v2-method"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-section-tag"
  }, "M\xE9todo Ummix"), /*#__PURE__*/React.createElement("h2", null, "Do briefing aos resultados, um processo que escala."), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-lede"
  }, "Uma metodologia desenhada para tirar a m\xEDdia tradicional do achismo e coloc\xE1-la sob a mesma disciplina de qualquer canal de performance.")), /*#__PURE__*/React.createElement("div", {
    className: "v2-method-grid"
  }, METHOD.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    className: "v2-method-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-method-step-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-method-step-num-dot"
  }), "ETAPA ", s.n), /*#__PURE__*/React.createElement("h3", null, s.t), /*#__PURE__*/React.createElement("p", null, s.d))))));
}

/* ---------- Segmentation ---------- */
const SEG_TABS = [{
  key: 'demo',
  label: 'Demográfico',
  title: 'Fale com quem realmente importa.',
  desc: 'Filtros clássicos com a granularidade certa para posicionar sua marca diante da audiência com maior propensão de compra.',
  chips: ['Faixa etária', 'Gênero', 'Renda familiar', 'Escolaridade', 'Ocupação', 'Classe social', 'Estado civil', 'Filhos no domicílio']
}, {
  key: 'geo',
  label: 'Geográfico',
  title: 'Cobertura nacional, execução local.',
  desc: 'Do alcance nacional à praça em que você quer ganhar market share — com a precisão de CEP e raio de cobertura.',
  chips: ['País', 'Estado', 'Cidade', 'Bairro', 'CEP', 'Região metropolitana', 'Raio de cobertura', 'Micro-região']
}, {
  key: 'comp',
  label: 'Comportamental',
  title: 'Audiência de verdade, não suposição.',
  desc: 'Cruzamos sinais de consumo, afinidade e hábitos de mídia para identificar quem está pronto para ouvir sua mensagem.',
  chips: ['Interesses', 'Hábitos de consumo', 'Estilo de vida', 'Audiência de TV', 'Horário de pico', 'Afinidade de marca', 'Intenção de compra']
}];
function V2Segmentation() {
  const [active, setActive] = useStateSec(SEG_TABS[0].key);
  const cur = SEG_TABS.find(t => t.key === active);
  return /*#__PURE__*/React.createElement("section", {
    id: "segmentacoes",
    className: "v2-section v2-seg"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-section-tag"
  }, "Segmenta\xE7\xE3o"), /*#__PURE__*/React.createElement("h2", null, "Mais de 40 atributos para desenhar a sua audi\xEAncia."), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-lede"
  }, "Cruzamentos de dados que antes s\xF3 existiam no digital, aplicados \xE0 maior m\xEDdia do pa\xEDs.")), /*#__PURE__*/React.createElement("div", {
    className: "v2-seg-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-seg-tabs"
  }, SEG_TABS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.key,
    onClick: () => setActive(t.key),
    className: `v2-seg-tab ${active === t.key ? 'is-active' : ''}`
  }, t.label, /*#__PURE__*/React.createElement("span", {
    className: "v2-seg-tab-count"
  }, t.chips.length)))), /*#__PURE__*/React.createElement("div", {
    className: "v2-seg-content"
  }, /*#__PURE__*/React.createElement("h3", null, cur.title), /*#__PURE__*/React.createElement("p", null, cur.desc), /*#__PURE__*/React.createElement("div", {
    className: "v2-seg-chips"
  }, cur.chips.map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    className: "v2-seg-chip"
  }, c)))))));
}

/* ---------- Testimonial ---------- */
const QUOTES = [{
  q: 'Anunciar em rádio e TV sempre foi um salto de fé. Com a Ummix, pela primeira vez temos clareza de onde cada real de mídia está indo — e triplicamos o retorno da verba no primeiro semestre.',
  a: 'Gerente de Marketing',
  r: 'Anunciante do setor financeiro · 2025',
  i: 'GM'
}, {
  q: 'A combinação de segmentação com autoridade dos veículos mudou nossa régua de aquisição. Reduzimos o CAC em 40% mantendo presença nas maiores emissoras da praça.',
  a: 'Diretor Comercial',
  r: 'Grupo de franquias de varejo · 2025',
  i: 'DC'
}, {
  q: 'Nunca imaginei ter dashboard em tempo real para TV e rádio. A Ummix Ads não apenas profissionalizou nossa compra de mídia — redefiniu como medimos sucesso em campanhas offline.',
  a: 'CEO',
  r: 'E-commerce nacional · 2024',
  i: 'CE'
}];
function V2Testimonial() {
  const [cur, setCur] = useStateSec(0);
  useEffectSec(() => {
    const t = setInterval(() => setCur(c => (c + 1) % QUOTES.length), 8000);
    return () => clearInterval(t);
  }, []);
  const q = QUOTES[cur];
  return /*#__PURE__*/React.createElement("section", {
    id: "depoimentos",
    className: "v2-section v2-testi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-section-tag"
  }, "Quem confia"), /*#__PURE__*/React.createElement("h2", null, "Anunciantes exigentes, resultados consistentes.")), /*#__PURE__*/React.createElement("div", {
    className: "v2-testi-card",
    key: cur
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-testi-mark"
  }, "\u201C"), /*#__PURE__*/React.createElement("blockquote", {
    className: "v2-testi-quote"
  }, q.q), /*#__PURE__*/React.createElement("div", {
    className: "v2-testi-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-testi-avatar"
  }, q.i), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "v2-testi-name"
  }, q.a), /*#__PURE__*/React.createElement("p", {
    className: "v2-testi-role"
  }, q.r)))), /*#__PURE__*/React.createElement("div", {
    className: "v2-testi-dots"
  }, QUOTES.map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setCur(i),
    className: i === cur ? 'is-cur' : '',
    "aria-label": `Depoimento ${i + 1}`
  })))));
}

/* ---------- Final CTA ---------- */
function V2FinalCTA({
  platformUrl
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "acesso",
    className: "v2-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-cta-inner"
  }, /*#__PURE__*/React.createElement("h2", null, "Sua pr\xF3xima campanha come\xE7a na Ummix."), /*#__PURE__*/React.createElement("p", null, "Crie sua conta gratuitamente, explore a base de ve\xEDculos e monte sua primeira campanha em minutos. Nossa equipe acompanha voc\xEA em todo o processo."), /*#__PURE__*/React.createElement("div", {
    className: "v2-cta-ctas"
  }, /*#__PURE__*/React.createElement("a", {
    className: "v2-btn v2-btn-primary",
    href: platformUrl,
    target: "_blank",
    rel: "noopener"
  }, "Criar conta gr\xE1tis", /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 5l7 7-7 7"
  }))), /*#__PURE__*/React.createElement("a", {
    className: "v2-btn v2-btn-ghost",
    href: platformUrl,
    target: "_blank",
    rel: "noopener"
  }, "J\xE1 tenho conta \u2014 Entrar")), /*#__PURE__*/React.createElement("p", {
    className: "v2-cta-note"
  }, "Precisa falar com um especialista? ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:fale@ummixads.com.br"
  }, "fale@ummixads.com.br"))));
}

/* ---------- Footer ---------- */
function V2Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "v2-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-footer-inner"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo_ummix_branca.png",
    alt: "Ummix Ads",
    style: {
      height: 24,
      width: 'auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "v2-footer-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#metodo"
  }, "M\xE9todo"), /*#__PURE__*/React.createElement("a", {
    href: "#segmentacoes"
  }, "Segmenta\xE7\xE3o"), /*#__PURE__*/React.createElement("a", {
    href: "#depoimentos"
  }, "Resultados"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:fale@ummixads.com.br"
  }, "Contato")), /*#__PURE__*/React.createElement("p", {
    className: "v2-footer-copy"
  }, "\xA9 ", new Date().getFullYear(), " Ummix Ads \xB7 Todos os direitos reservados")));
}
Object.assign(window, {
  V2Logos,
  V2Metrics,
  V2Pillars,
  V2Method,
  V2Segmentation,
  V2Testimonial,
  V2FinalCTA,
  V2Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "landing_v2/Sections.jsx", error: String((e && e.message) || e) }); }

// subpages/Cashback.jsx
try { (() => {
// Cashback.jsx — hero (2 variants), how-it-works, 3% highlight, CTA
// TODO: paste the real external cashback form link here
const CASHBACK_FORM_URL = '#';
const CASHBACK_PLATFORM = 'Live'; // external cashback platform name

/* ---- Hero ---- */
function CashbackEyebrow() {
  return /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow-dot"
  }), "Programa de Cashback Ummix Ads");
}
function CashbackHeroCTAs() {
  return /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-ctas"
  }, /*#__PURE__*/React.createElement("a", {
    className: "v2-btn v2-btn-primary",
    href: "#formulario"
  }, "Quero meu cashback", /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 5l7 7-7 7"
  }))), /*#__PURE__*/React.createElement("a", {
    className: "v2-btn v2-btn-ghost",
    href: "#como-funciona"
  }, "Como funciona"));
}
function CashbackHeroA() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sp-hero sp-hero-a"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-inner"
  }, /*#__PURE__*/React.createElement(CashbackEyebrow, null), /*#__PURE__*/React.createElement("h1", {
    className: "sp-hero-h1"
  }, "Invista em m\xEDdia e receba ", /*#__PURE__*/React.createElement("em", null, "3% de volta"), "."), /*#__PURE__*/React.createElement("p", {
    className: "sp-hero-sub"
  }, "O programa de cashback da Ummix Ads devolve parte do seu investimento em m\xEDdia diretamente na sua conta. Cadastre-se, anuncie e acumule \u2014 \xE9 simples assim."), /*#__PURE__*/React.createElement(CashbackHeroCTAs, null)));
}
function CashbackHeroB() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sp-hero sp-hero-b"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CashbackEyebrow, null), /*#__PURE__*/React.createElement("h1", {
    className: "sp-hero-h1"
  }, "Seu investimento em m\xEDdia rende ", /*#__PURE__*/React.createElement("em", null, "cashback"), "."), /*#__PURE__*/React.createElement("p", {
    className: "sp-hero-sub"
  }, "Cada real veiculado pela Ummix Ads acumula 3% de cashback, creditado atrav\xE9s da plataforma ", CASHBACK_PLATFORM, ". Basta preencher o nosso formul\xE1rio para ativar."), /*#__PURE__*/React.createElement(CashbackHeroCTAs, null)), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 17h.01"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-value"
  }, "3% de volta"), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-label"
  }, "sobre o total investido em m\xEDdia"))), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "5",
    width: "20",
    height: "14",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 10h20"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-value"
  }, "Cr\xE9dito via ", CASHBACK_PLATFORM), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-label"
  }, "plataforma parceira de cashback"))), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 11l3 3 8-8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-value"
  }, "Ativa\xE7\xE3o simples"), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-label"
  }, "um \xFAnico formul\xE1rio para come\xE7ar"))))));
}

/* ---- How it works ---- */
const CB_STEPS = [{
  n: '01',
  t: 'Cadastre-se',
  d: 'Preencha o formulário de cashback da Ummix para ativar o programa na sua conta.',
  icon: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 8v6M22 11h-6"
  }))
}, {
  n: '02',
  t: 'Invista em mídia',
  d: 'Crie e veicule suas campanhas em rádio, TV e mídia exterior normalmente pela plataforma.',
  icon: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 3v18h18"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 15 12 10 16 14 21 8"
  }))
}, {
  n: '03',
  t: 'Acumule cashback',
  d: 'A cada investimento, 3% do valor é acumulado automaticamente como cashback.',
  icon: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 17h.01"
  }))
}, {
  n: '04',
  t: 'Resgate',
  d: `Seu saldo fica disponível para resgate através da plataforma ${CASHBACK_PLATFORM}.`,
  icon: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 2v14M6 10l6 6 6-6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 20h16"
  }))
}];
function CashbackHow() {
  return /*#__PURE__*/React.createElement("section", {
    id: "como-funciona",
    className: "v2-section cb-how"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-section-tag"
  }, "Como funciona"), /*#__PURE__*/React.createElement("h2", null, "Do cadastro ao resgate, em quatro passos."), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-lede"
  }, "O cashback \xE9 acumulado automaticamente \u2014 voc\xEA s\xF3 precisa ativar uma vez.")), /*#__PURE__*/React.createElement("div", {
    className: "cb-steps"
  }, CB_STEPS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    className: "cb-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cb-step-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cb-step-badge-dot"
  }), "PASSO ", s.n), /*#__PURE__*/React.createElement("div", {
    className: "cb-step-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, s.icon)), /*#__PURE__*/React.createElement("h3", null, s.t), /*#__PURE__*/React.createElement("p", null, s.d))))));
}

/* ---- Big 3% highlight ---- */
function CashbackHighlight() {
  return /*#__PURE__*/React.createElement("section", {
    className: "v2-section cb-highlight"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cb-highlight-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cb-big"
  }, "3", /*#__PURE__*/React.createElement("span", {
    className: "pct"
  }, "%")), /*#__PURE__*/React.createElement("div", {
    className: "cb-highlight-copy"
  }, /*#__PURE__*/React.createElement("h2", null, "De cada real investido, de volta para voc\xEA."), /*#__PURE__*/React.createElement("p", null, "Sem letra mi\xFAda escondida: o cashback incide sobre o total veiculado e \xE9 creditado de forma transparente na plataforma parceira."), /*#__PURE__*/React.createElement("span", {
    className: "cb-platform-tag"
  }, /*#__PURE__*/React.createElement("span", {
    className: "live-dot"
  }), "Cr\xE9dito via ", /*#__PURE__*/React.createElement("strong", null, CASHBACK_PLATFORM))))));
}

/* ---- Final CTA → form ---- */
function CashbackCTA() {
  return /*#__PURE__*/React.createElement("section", {
    id: "formulario",
    className: "v2-cta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-cta-inner"
  }, /*#__PURE__*/React.createElement("h2", null, "Ative seu cashback agora."), /*#__PURE__*/React.createElement("p", null, "Preencha o formul\xE1rio de cashback da Ummix Ads e comece a acumular 3% sobre todo o seu investimento em m\xEDdia."), /*#__PURE__*/React.createElement("div", {
    className: "v2-cta-ctas"
  }, /*#__PURE__*/React.createElement("a", {
    className: "v2-btn v2-btn-primary",
    href: CASHBACK_FORM_URL,
    target: "_blank",
    rel: "noopener"
  }, "Preencher formul\xE1rio de cashback", /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 5l7 7-7 7"
  }))), /*#__PURE__*/React.createElement("a", {
    className: "v2-btn v2-btn-ghost",
    href: "#como-funciona"
  }, "Rever como funciona")), /*#__PURE__*/React.createElement("p", {
    className: "v2-cta-note"
  }, "D\xFAvidas sobre o programa? ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:fale@ummixads.com.br"
  }, "fale@ummixads.com.br"))));
}
Object.assign(window, {
  CashbackHeroA,
  CashbackHeroB,
  CashbackHow,
  CashbackHighlight,
  CashbackCTA
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "subpages/Cashback.jsx", error: String((e && e.message) || e) }); }

// subpages/Chrome.jsx
try { (() => {
// Chrome.jsx — shared header + footer for subpages, using the new full lockups.
const {
  useState: useStateChrome,
  useEffect: useEffectChrome
} = React;
const PLATFORM_URL = 'https://ummix.workingtech.com.br/';
// Cross-page links (relative to /subpages/)
const NAV = {
  home: '../landing_v2/index.html',
  partner: 'partner.html',
  cashback: 'cashback.html'
};
function SubHeader({
  active
}) {
  const [scrolled, setScrolled] = useStateChrome(false);
  useEffectChrome(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', on, {
      passive: true
    });
    on();
    return () => window.removeEventListener('scroll', on);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    className: `v2-hdr ${scrolled ? 'is-scrolled' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hdr-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: NAV.home,
    className: "v2-logo",
    "aria-label": "Ummix Ads"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo_ummix_branca.png",
    alt: "Ummix Ads",
    className: "v2-logo-light"
  }), /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo_ummix_escura.png",
    alt: "Ummix Ads",
    className: "v2-logo-dark"
  })), /*#__PURE__*/React.createElement("nav", {
    className: "v2-nav",
    "aria-label": "Principal"
  }, /*#__PURE__*/React.createElement("a", {
    href: NAV.home
  }, "In\xEDcio"), /*#__PURE__*/React.createElement("a", {
    href: NAV.partner,
    className: active === 'partner' ? 'is-current' : ''
  }, "Parceiros"), /*#__PURE__*/React.createElement("a", {
    href: NAV.cashback,
    className: active === 'cashback' ? 'is-current' : ''
  }, "Cashback")), /*#__PURE__*/React.createElement("a", {
    href: PLATFORM_URL,
    target: "_blank",
    rel: "noopener",
    className: "v2-hdr-cta"
  }, "Acessar plataforma", /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 5l7 7-7 7"
  })))));
}
function SubFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "v2-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-footer-inner"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../assets/logo_ummix_branca.png",
    alt: "Ummix Ads",
    style: {
      height: 24,
      width: 'auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "v2-footer-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: NAV.home
  }, "In\xEDcio"), /*#__PURE__*/React.createElement("a", {
    href: NAV.partner
  }, "Parceiros"), /*#__PURE__*/React.createElement("a", {
    href: NAV.cashback
  }, "Cashback"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:fale@ummixads.com.br"
  }, "Contato")), /*#__PURE__*/React.createElement("p", {
    className: "v2-footer-copy"
  }, "\xA9 ", new Date().getFullYear(), " Ummix Ads \xB7 Todos os direitos reservados")));
}
Object.assign(window, {
  SubHeader,
  SubFooter,
  PLATFORM_URL,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "subpages/Chrome.jsx", error: String((e && e.message) || e) }); }

// subpages/Partner.jsx
try { (() => {
// Partner.jsx — hero (2 variants), process, partners grid w/ hover, form
const {
  useState: useStatePtr
} = React;

// TODO: paste the real external form link (Google Forms / Typeform) here
const PARTNER_FORM_URL = '#';

/* ---- Hero ---- */
function PartnerEyebrow() {
  return /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-eyebrow-dot"
  }), "Programa de Parcerias Ummix Ads");
}
function PartnerHeroCTAs() {
  return /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-ctas"
  }, /*#__PURE__*/React.createElement("a", {
    className: "v2-btn v2-btn-primary",
    href: "#candidatura"
  }, "Quero ser parceiro", /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 5l7 7-7 7"
  }))), /*#__PURE__*/React.createElement("a", {
    className: "v2-btn v2-btn-ghost",
    href: "#processo"
  }, "Como funciona"));
}
function PartnerHeroA() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sp-hero sp-hero-a"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-inner"
  }, /*#__PURE__*/React.createElement(PartnerEyebrow, null), /*#__PURE__*/React.createElement("h1", {
    className: "sp-hero-h1"
  }, "Sua ag\xEAncia, agora com acesso \xE0 ", /*#__PURE__*/React.createElement("em", null, "m\xEDdia de massa orientada a dados"), "."), /*#__PURE__*/React.createElement("p", {
    className: "sp-hero-sub"
  }, "Some o seu trabalho de cria\xE7\xE3o e estrat\xE9gia \xE0 intelig\xEAncia de veicula\xE7\xE3o da Ummix em r\xE1dio, TV e m\xEDdia exterior. Mais resultado para o seu cliente, mais margem para a sua ag\xEAncia."), /*#__PURE__*/React.createElement(PartnerHeroCTAs, null)));
}
function PartnerHeroB() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sp-hero sp-hero-b"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "v2-hero-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PartnerEyebrow, null), /*#__PURE__*/React.createElement("h1", {
    className: "sp-hero-h1"
  }, "Cres\xE7a junto com a ", /*#__PURE__*/React.createElement("em", null, "Ummix Ads"), "."), /*#__PURE__*/React.createElement("p", {
    className: "sp-hero-sub"
  }, "Um programa de parcerias pensado para ag\xEAncias que querem entregar m\xEDdia tradicional com a precis\xE3o do digital \u2014 sem montar uma estrutura de veicula\xE7\xE3o do zero."), /*#__PURE__*/React.createElement(PartnerHeroCTAs, null)), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 3v18h18"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 15 12 10 16 14 21 8"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-value"
  }, "+150 ve\xEDculos"), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-label"
  }, "\xE0 disposi\xE7\xE3o das ag\xEAncias parceiras"))), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21v-1a6 6 0 0 1 12 0v1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 8l2 2 3-4"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-value"
  }, "Comissionamento"), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-label"
  }, "recorrente sobre a m\xEDdia veiculada"))), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.6L5.7 21l2.3-7.2-6-4.4h7.6z"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-value"
  }, "Suporte dedicado"), /*#__PURE__*/React.createElement("div", {
    className: "sp-hero-kpi-label"
  }, "planejamento e mensura\xE7\xE3o junto com voc\xEA"))))));
}

/* ---- Process (placeholder copy — user fills later) ---- */
const PROCESS = [{
  t: 'Candidatura',
  d: 'Você preenche o formulário de interesse e nosso time avalia o perfil da sua agência.'
}, {
  t: 'Onboarding',
  d: 'Apresentamos a plataforma, o método Ummix e as condições comerciais da parceria.'
}, {
  t: 'Ativação',
  d: 'Sua agência ganha acesso à base de veículos e começa a montar campanhas para os clientes.'
}, {
  t: 'Crescimento',
  d: 'Você acompanha resultados em tempo real e amplia a operação com nosso suporte contínuo.'
}];
function PartnerProcess() {
  return /*#__PURE__*/React.createElement("section", {
    id: "processo",
    className: "v2-section sp-process"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-section-tag"
  }, "Como virar parceiro"), /*#__PURE__*/React.createElement("h2", null, "Quatro passos para come\xE7ar."), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-lede"
  }, "Um processo simples e transparente \u2014 da candidatura \xE0 primeira campanha no ar."), /*#__PURE__*/React.createElement("div", {
    className: "sp-placeholder-note"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 9v4M12 17h.01"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  })), "Texto provis\xF3rio \u2014 substitua pela descri\xE7\xE3o oficial do processo")), /*#__PURE__*/React.createElement("div", {
    className: "sp-process-grid"
  }, PROCESS.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "sp-process-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-process-step"
  }, i + 1), /*#__PURE__*/React.createElement("h3", null, s.t), /*#__PURE__*/React.createElement("p", null, s.d), i < PROCESS.length - 1 && /*#__PURE__*/React.createElement("span", {
    className: "sp-process-connector"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 5l7 7-7 7"
  }))))))));
}

/* ---- Partners grid (placeholder agencies) ---- */
const PARTNERS = [{
  mark: 'NA',
  name: 'Nome da Agência',
  city: 'Goiânia · GO',
  desc: 'Breve descrição da agência parceira — especialidade e foco de atuação.'
}, {
  mark: 'AG',
  name: 'Agência Exemplo',
  city: 'São Paulo · SP',
  desc: 'Performance e branding para marcas de varejo em todo o país.'
}, {
  mark: 'MK',
  name: 'Marca & Co.',
  city: 'Brasília · DF',
  desc: 'Comunicação integrada com forte atuação no setor público.'
}, {
  mark: 'PB',
  name: 'Publi Brasil',
  city: 'Curitiba · PR',
  desc: 'Mídia e criação para o agronegócio e indústria.'
}, {
  mark: 'ST',
  name: 'Studio Traço',
  city: 'Belo Horizonte · MG',
  desc: 'Branding e conteúdo para marcas em crescimento.'
}, {
  mark: 'VX',
  name: 'Vértice X',
  city: 'Recife · PE',
  desc: 'Performance marketing e mídia programática.'
}, {
  mark: 'ID',
  name: 'Ideia Viva',
  city: 'Porto Alegre · RS',
  desc: 'Campanhas regionais com forte presença em rádio e TV.'
}, {
  mark: 'CR',
  name: 'Criativa Hub',
  city: 'Florianópolis · SC',
  desc: 'Estratégia digital e mídia offline integradas.'
}];
function PartnerGrid() {
  return /*#__PURE__*/React.createElement("section", {
    id: "parceiros",
    className: "v2-section sp-partners"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-section-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v2-section-tag"
  }, "Quem j\xE1 \xE9 parceiro"), /*#__PURE__*/React.createElement("h2", null, "Ag\xEAncias que j\xE1 operam com a Ummix."), /*#__PURE__*/React.createElement("p", {
    className: "v2-section-lede"
  }, "Passe o mouse sobre cada ag\xEAncia para conhecer um pouco mais. (Logos provis\xF3rios \u2014 envie os oficiais para substituirmos.)")), /*#__PURE__*/React.createElement("div", {
    className: "sp-partners-grid"
  }, PARTNERS.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "sp-partner",
    tabIndex: "0"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sp-partner-mark"
  }, p.mark), /*#__PURE__*/React.createElement("div", {
    className: "sp-partner-info"
  }, /*#__PURE__*/React.createElement("p", {
    className: "sp-partner-name"
  }, p.name), /*#__PURE__*/React.createElement("span", {
    className: "sp-partner-city"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })), p.city), /*#__PURE__*/React.createElement("p", {
    className: "sp-partner-desc"
  }, p.desc)))))));
}

/* ---- Form ---- */
function PartnerForm() {
  const [sent, setSent] = useStatePtr(false);
  const onSubmit = e => {
    e.preventDefault();
    // If an external form URL is configured, you can redirect instead:
    // window.open(PARTNER_FORM_URL, '_blank');
    setSent(true);
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "candidatura",
    className: "v2-section sp-form-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v2-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-form-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-form-copy"
  }, /*#__PURE__*/React.createElement("h2", null, "Vamos construir essa parceria?"), /*#__PURE__*/React.createElement("p", null, "Conte um pouco sobre a sua ag\xEAncia. Nosso time entra em contato para apresentar o programa."), /*#__PURE__*/React.createElement("div", {
    className: "sp-form-bullets"
  }, ['Acesso à base de 150+ veículos de mídia', 'Comissionamento recorrente', 'Planejamento e mensuração com nosso time'].map(b => /*#__PURE__*/React.createElement("div", {
    key: b,
    className: "sp-form-bullet"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })), b)))), !sent ? /*#__PURE__*/React.createElement("form", {
    className: "sp-form",
    onSubmit: onSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "p-nome"
  }, "Nome"), /*#__PURE__*/React.createElement("input", {
    id: "p-nome",
    type: "text",
    placeholder: "Seu nome completo",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "sp-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "p-email"
  }, "E-mail corporativo"), /*#__PURE__*/React.createElement("input", {
    id: "p-email",
    type: "email",
    placeholder: "voce@suaagencia.com.br",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "sp-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "p-agencia"
  }, "Nome da ag\xEAncia"), /*#__PURE__*/React.createElement("input", {
    id: "p-agencia",
    type: "text",
    placeholder: "Como sua ag\xEAncia se chama",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "sp-field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "p-tel"
  }, "Telefone / WhatsApp"), /*#__PURE__*/React.createElement("input", {
    id: "p-tel",
    type: "tel",
    placeholder: "(00) 00000-0000",
    required: true
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "v2-btn v2-btn-primary"
  }, "Enviar candidatura", /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 5l7 7-7 7"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "sp-form-alt"
  }, "Prefere o formul\xE1rio completo? ", /*#__PURE__*/React.createElement("a", {
    href: PARTNER_FORM_URL,
    target: "_blank",
    rel: "noopener"
  }, "Abrir formul\xE1rio \u2192"))) : /*#__PURE__*/React.createElement("div", {
    className: "sp-form-success"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sp-form-success-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "30",
    height: "30",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("h3", null, "Candidatura recebida!"), /*#__PURE__*/React.createElement("p", null, "Nosso time de parcerias entra em contato em breve.")))));
}
Object.assign(window, {
  PartnerHeroA,
  PartnerHeroB,
  PartnerProcess,
  PartnerGrid,
  PartnerForm
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "subpages/Partner.jsx", error: String((e && e.message) || e) }); }

})();
