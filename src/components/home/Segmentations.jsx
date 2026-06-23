import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const TABS = [
  {
    id: 'demografica',
    label: 'Demográfica',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
      </svg>
    ),
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
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
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
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 4 5-5" />
      </svg>
    ),
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
  const anim = useAnimateOnScroll();
  const [activeTab, setActiveTab] = useState('demografica');

  const activeTabData = TABS.find((tab) => tab.id === activeTab);

  return (
    <section id="segmentacoes" className="relative border-t border-[#f0eeec] bg-white px-6 py-24 md:px-16 md:py-32">
      <div ref={anim.ref} style={anim.style} className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="font-sans text-[11px] font-bold uppercase leading-none tracking-[.22em] text-ummix-red">
            A precisão do digital, na mídia OFF
          </div>
          <h2 className="mt-3.5 font-heading text-4xl font-extrabold leading-tight tracking-tight text-ummix-dark md:text-5xl">
            Segmentações <span className="text-ummix-red">disponíveis</span>.
          </h2>
          <p className="mt-4.5 text-[17px] leading-relaxed text-[#555]">
            Escolha o público certo. Atinja exatamente quem importa para sua campanha.
          </p>
        </div>

        <div role="tablist" aria-label="Tipos de segmentação" className="mt-14 flex flex-wrap justify-center gap-2.5">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-current={isActive ? 'true' : 'false'}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2.5 rounded-full px-6.5 py-3.5 font-sans text-sm font-bold tracking-wide transition-colors ${
                  isActive
                    ? 'border-none bg-ummix-red text-white shadow-[0_8px_20px_-8px_rgba(155,25,26,.6)]'
                    : 'border border-[#e5e3e0] bg-white text-ummix-dark hover:border-ummix-red/40 hover:bg-ummix-gray'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="relative mt-12 min-h-[240px]">
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
                  className="flex items-center gap-3.5 rounded-2xl border border-transparent bg-ummix-gray px-5.5 py-4.5 font-sans text-sm font-semibold text-ummix-dark transition-all duration-300 hover:-translate-y-0.5 hover:border-ummix-red/50 hover:bg-white hover:shadow-[0_8px_20px_-10px_rgba(155,25,26,.3)]"
                >
                  <span
                    className="h-2 w-2 flex-none rounded-full bg-ummix-red"
                    style={{ boxShadow: '0 0 0 3px rgba(155,25,26,.15)' }}
                    aria-hidden="true"
                  />
                  {attribute.label}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center font-sans text-sm font-medium text-[#888]">
          Cruzamos múltiplas dimensões para atingir o público exato da sua campanha.
        </div>
      </div>
    </section>
  );
}
