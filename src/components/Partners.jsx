import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

const vehicles = [
  { name: 'TV Anhanguera',  src: '/assets/canais/tv_anhanguera.png' },
  { name: 'Band News',      src: '/assets/canais/band_news.png' },
  { name: 'CBN',            src: '/assets/canais/cbn.png' },
  { name: 'Antena 1',       src: '/assets/canais/antena1.png' },
  { name: 'Nativa',         src: '/assets/canais/nativa.png' },
  { name: 'Brahma FM',      src: '/assets/canais/brahma_fm.png' },
  { name: 'Canadá FM',      src: '/assets/canais/canada_fm.png' },
  { name: 'Líder',          src: '/assets/canais/lider.png' },
  { name: 'Manchester',     src: '/assets/canais/manchester.png' },
  { name: 'Modão',          src: '/assets/canais/modao.png' },
  { name: 'Morada do Sol',  src: '/assets/canais/morada_do_sol.png' },
  { name: 'Paz',            src: '/assets/canais/paz.png' },
  { name: 'Positiva',       src: '/assets/canais/positiva.png' },
  { name: 'Serra Dourada',  src: '/assets/canais/serra_dourada.png' },
  { name: 'Sucesso',        src: '/assets/canais/sucesso.png' },
  { name: 'Sul Goiana',     src: '/assets/canais/sul_goiana.png' },
  { name: 'Terra',          src: '/assets/canais/terra.png' },
  { name: 'Vinha',          src: '/assets/canais/vinha.png' },
  { name: 'Bons Ventos',    src: '/assets/canais/bons_ventos.png' },
  { name: 'Imprensa',       src: '/assets/canais/imprensa.png' },
  { name: 'Kativa',         src: '/assets/canais/kativa.png' },
  { name: 'Rádio 89',       src: '/assets/canais/89.png' },
  { name: 'Rádio 92',       src: '/assets/canais/92.png' },
  { name: 'Rádio 93',       src: '/assets/canais/93.png' },
  { name: 'Rádio 94',       src: '/assets/canais/94.png' },
  { name: 'Rádio 95',       src: '/assets/canais/95.png' },
  { name: 'Rádio 95.1',     src: '/assets/canais/radio95.png' },
  { name: 'Rádio 96',       src: '/assets/canais/radio96.png' },
]

const clients = [
  { name: 'ALKA',             src: '/assets/partners/alka.png' },
  { name: 'AM Comercial',     src: '/assets/partners/am_comercial.png' },
  { name: 'Colégio Vitória',  src: '/assets/partners/colegio_vitoria.png' },
  { name: 'Construjá',        src: '/assets/partners/construja.png' },
  { name: 'Creative Pack',    src: '/assets/partners/creative_pack.png' },
  { name: 'DPA',              src: '/assets/partners/dpa.png' },
  { name: 'Eysecor',          src: '/assets/partners/eysecor.png' },
  { name: 'Faje',             src: '/assets/partners/faje.png' },
  { name: 'Fecomércio',       src: '/assets/partners/fecomercio.png' },
  { name: 'Gabisa',           src: '/assets/partners/gabisa.png' },
  { name: 'Grupo Vellore',    src: '/assets/partners/grupo_vellore.png' },
  { name: 'GWM',              src: '/assets/partners/gwm.png' },
  { name: 'Hub Cerrado',      src: '/assets/partners/hub_cerrado.png' },
  { name: 'Inovatech',        src: '/assets/partners/inovatech.png' },
  { name: 'Jasper',           src: '/assets/partners/jasper.png' },
  { name: 'Loja das Tendas',  src: '/assets/partners/loja_das_tendas.png' },
  { name: 'Lopes',            src: '/assets/partners/lopes.png' },
  { name: 'Nova Casa',        src: '/assets/partners/nova_casa.png' },
  { name: 'Paeze',            src: '/assets/partners/paeze.png' },
  { name: 'PedeMenu',         src: '/assets/partners/pedemenu.png' },
  { name: 'Pignatti',         src: '/assets/partners/pignatti.png' },
  { name: 'Realizzato',       src: '/assets/partners/realizzato.png' },
  { name: 'Senac',            src: '/assets/partners/senac.png' },
  { name: 'Tudo',             src: '/assets/partners/tudo.png' },
  { name: 'Workintech',       src: '/assets/partners/workintech.png' },
]

function Marquee({ items, reverse = false, speed = 35 }) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex items-center gap-10 w-max"
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 px-2"
          >
            <img
              src={item.src}
              alt={item.name}
              className="h-12 md:h-14 w-auto object-contain max-w-30"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Partners() {
  const animVehicles = useAnimateOnScroll()
  const animClients  = useAnimateOnScroll()

  return (
    <section id="veiculos" className="py-16 md:py-20 bg-ummix-gray overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Vehicles */}
        <div ref={animVehicles.ref} style={animVehicles.style} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-ummix-dark text-center mb-10">
            Veículos com histórico de mídia pela Ummix
          </h2>
          <Marquee items={vehicles} speed={45} />
        </div>

        {/* Clients */}
        <div ref={animClients.ref} style={animClients.style}>
          <h2 className="text-2xl md:text-3xl font-bold text-ummix-dark text-center mb-10">
            Anunciantes que confiam na Ummix
          </h2>
          <Marquee items={clients} reverse speed={50} />
        </div>

      </div>
    </section>
  )
}
