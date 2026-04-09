export default function VideoEmbed() {
  return (
    <section className="bg-ummix-dark py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="w-full sm:w-4/5 mx-auto">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full rounded-2xl shadow-2xl"
            src="https://www.youtube.com/embed/jOO0AB2y960"
            title="Ummix Ads"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        </div>
      </div>
    </section>
  )
}
