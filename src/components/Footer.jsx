import { CONTACT_EMAIL } from '../constants/urls'

export default function Footer() {
  return (
    <footer className="bg-ummix-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <img src="/assets/logo-ummix-ads.png" alt="Ummix Ads" className="h-10 brightness-0 invert" />
          <div className="flex flex-col items-center text-sm text-white/60 md:items-start">
            <a href="tel:+551152004038" className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-white">11 5200-4038</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-white">{CONTACT_EMAIL}</a>
          </div>
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} Ummix Ads. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
