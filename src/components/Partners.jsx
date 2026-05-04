import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

const vehicles = [
  { name: 'SBT',      src: '/assets/logo_sbt.png' },
  { name: 'RedeTV',   src: '/assets/logo_redetv.png' },
  { name: 'Band News',src: '/assets/logo_bandnews.png' },
  { name: 'Radio 89', src: '/assets/logo_radio89.png' },
   { name: 'SBT',      src: '/assets/logo_sbt.png' },
  { name: 'RedeTV',   src: '/assets/logo_redetv.png' },
  { name: 'Band News',src: '/assets/logo_bandnews.png' },
  { name: 'Radio 89', src: '/assets/logo_radio89.png' },
]

const clients = [
  { name: 'ALKA',           src: '/assets/logo_cliente/ALKA.png' },
  { name: 'Col Vitória',    src: '/assets/logo_cliente/COL VITORIA.png' },
  { name: 'Eysecor',        src: '/assets/logo_cliente/Eysecor.png' },
  { name: 'Faje Go',        src: '/assets/logo_cliente/FAJE GO.png' },
  { name: 'Fecomércio',     src: '/assets/logo_cliente/Fecomercio.png' },
  { name: 'GWM',            src: '/assets/logo_cliente/GWM.png' },
  { name: 'Realizatto',     src: '/assets/logo_cliente/Realizatto_logo.png' },
  { name: 'RedeFonte',      src: '/assets/logo_cliente/RedeFonte_logo.jpg' },
  { name: 'Secovi Goiás',   src: '/assets/logo_cliente/SecoviGoias_logo.jpg' },
  { name: 'TerraForte',     src: '/assets/logo_cliente/TerraForte_Goias.png' },
  { name: 'DPA',            src: '/assets/logo_cliente/dpa.png' },
  { name: 'Jasper',         src: '/assets/logo_cliente/jasper_logo.jpg' },
  { name: 'OMenu',          src: '/assets/logo_cliente/omenu_logo.jpg' },
  { name: 'Paeze',          src: '/assets/logo_cliente/paeze_logo.jpg' },
  { name: 'Pignatti',       src: '/assets/logo_cliente/pignatti_logo.png' },
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
            Sua marca nos veículos mais compatíveis
          </h2>
          <Marquee items={vehicles} speed={28} />
        </div>

        {/* Clients */}
        <div ref={animClients.ref} style={animClients.style}>
          <h2 className="text-2xl md:text-3xl font-bold text-ummix-dark text-center mb-10">
             Anunciantes que confiam na ummix
          </h2>
          <Marquee items={clients} reverse speed={40} />
        </div>

      </div>
    </section>
  )
}
