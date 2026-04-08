import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll'

const logos = [
  { name: 'SBT', src: '/assets/logo_sbt.png' },
  { name: 'RedeTV', src: '/assets/logo_redetv.png' },
  { name: 'Band News', src: '/assets/logo_bandnews.png' },
  { name: 'Radio 89', src: '/assets/logo_radio89.png' },
  { name: 'Sicredi', src: '/assets/logo_sicredi.png' },
  { name: 'Sicoob', src: '/assets/logo_sicoob.png' },
  { name: 'Detran', src: '/assets/logo_detran.png' },
  { name: 'Cebrom', src: '/assets/logo_cebrom.png' },
]

export default function Partners() {
  const anim = useAnimateOnScroll()

  return (
    <section id="veiculos" className="py-20 md:py-28 bg-ummix-gray">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={anim.ref} style={anim.style} className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-ummix-dark mb-4">
            Sua marca nos veículos mais compatíveis
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-items-center">
          {logos.map(logo => (
            <div
              key={logo.name}
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110 p-4"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-16 md:h-20 object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
