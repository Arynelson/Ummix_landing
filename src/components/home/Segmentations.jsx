import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { useLocale } from '../../LocaleProvider.jsx';
import { HOME_COPY } from '../../home-copy.js';

const TABS = [
  {
    id: 'demografica',
    label: 'Demográfica',
    pixel: 'audiencia',
    attributes: [
      { id: 'idade', label: 'Idade' },
      { id: 'sexo', label: 'Sexo' },
      { id: 'renda-familiar', label: 'Renda familiar' },
      { id: 'escolaridade', label: 'Escolaridade' },
      { id: 'profissao', label: 'Profissão' },
      { id: 'estado-civil', label: 'Estado civil' },
      { id: 'tamanho-da-familia', label: 'Tamanho da família' },
      { id: 'faixa-etaria', label: 'Faixa etária' },
    ],
  },
  {
    id: 'geografica',
    label: 'Geográfica',
    pixel: 'praca',
    attributes: [
      { id: 'pais', label: 'País' },
      { id: 'regiao', label: 'Região' },
      { id: 'estado', label: 'Estado' },
      { id: 'cidade', label: 'Cidade' },
      { id: 'bairro', label: 'Bairro' },
      { id: 'cep', label: 'CEP' },
      { id: 'raio-de-alcance', label: 'Raio de alcance' },
      { id: 'pontos-de-interesse', label: 'Pontos de interesse' },
    ],
  },
  {
    id: 'comportamental',
    label: 'Comportamental',
    pixel: 'alvo',
    attributes: [
      { id: 'interesses', label: 'Interesses' },
      { id: 'habitos-de-consumo', label: 'Hábitos de consumo' },
      { id: 'estilo-de-vida', label: 'Estilo de vida' },
      { id: 'engajamento-digital', label: 'Engajamento digital' },
      { id: 'historico-de-compras', label: 'Histórico de compras' },
      { id: 'padrao-de-uso', label: 'Padrão de uso' },
      { id: 'eventos-sazonais', label: 'Eventos sazonais' },
      { id: 'perfil-socioemocional', label: 'Perfil socioemocional' },
    ],
  },
];

export default function Segmentations() {
  const { locale } = useLocale();
  const copy = HOME_COPY[locale].segmentations;
  const anim = useAnimateOnScroll();
  const [activeTab, setActiveTab] = useState('demografica');

  const activeTabData = TABS.find((tab) => tab.id === activeTab);

  return (
    <section id="segmentacoes" className="relative border-t border-line-subtle bg-sunken px-6 py-20 md:px-16 md:py-24">
      <div ref={anim.ref} style={anim.style} className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-mono text-[11px] font-medium uppercase leading-none tracking-[0.08em] text-brand">
            {copy.kicker}
          </div>
          <h2 className="mt-3.5 font-display text-4xl font-extrabold leading-tight tracking-tight text-strong md:text-5xl">
            {copy.title} <span className="text-brand">{copy.titleAccent}</span>.
          </h2>
          <p className="section-subtitle mt-4 text-[17px] leading-relaxed text-body">
            {copy.description}
          </p>
        </div>

        <div role="tablist" aria-label={copy.tabLabel} className="mt-10 flex flex-wrap justify-center gap-2.5 md:mt-12">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            const tabCopy = copy.tabs[tab.id];
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? 'true' : 'false'}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2.5 rounded-[var(--radius-md)] px-6.5 py-3.5 font-sans text-sm font-bold tracking-wide transition-colors ${
                  isActive
                    ? 'border border-transparent bg-accent text-white'
                    : 'border border-line bg-card text-strong hover:border-accent hover:bg-sunken'
                }`}
              >
                <img
                  src={`/assets/ds/icones-pixel/${tab.pixel}${isActive ? '-branco' : ''}.svg`}
                  alt=""
                  aria-hidden="true"
                  width={16}
                  height={16}
                />
                {tabCopy.label}
              </button>
            );
          })}
        </div>

        <div className="relative mt-10 min-h-[136px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabData.id}
              role="tabpanel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-4"
            >
              {activeTabData.attributes.map((attribute, index) => (
                <motion.div
                  key={attribute.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.04 }}
                  className="flex items-center gap-3.5 rounded-[var(--radius-lg)] border border-line-subtle bg-card px-5.5 py-4.5 font-sans text-sm font-semibold text-strong transition-[border-color,box-shadow] duration-[var(--duration-base)] hover:border-line-strong hover:shadow-[var(--shadow-md)]"
                >
                  <span
                    className="h-2 w-2 flex-none rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  {copy.tabs[activeTabData.id].attributes[index]}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center font-sans text-sm font-medium text-muted md:mt-10">
          {copy.footer}
        </div>
      </div>
    </section>
  );
}
