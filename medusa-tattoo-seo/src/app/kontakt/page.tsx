export const metadata = {
  title: "Kontakt – Medusa Tattoo München am Marienplatz",
  description: "Kontaktieren Sie Medusa Tattoo München. Direkt am Marienplatz. Telefon: +49-89-269313. English speaking. Walk-ins willkommen.",
  keywords: "tattoo münchen kontakt, tattoo marienplatz telefon, tattoo studio münchen anfahrt, medusa tattoo kontakt"
};

export default function KontaktPage() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-12">
        Kontakt – Medusa Tattoo München
      </h1>
      
      <section className="mb-16 p-8 bg-gray-100 rounded-3xl">
        <h2 className="text-3xl font-bold mb-6">Direkt am Marienplatz</h2>
        <div className="space-y-4 text-lg">
          <p><strong>Adresse:</strong> Altheimer Eck 11, 80331 München</p>
          <p><strong>Telefon:</strong> +49-89-269313</p>
          <p><strong>Email:</strong> info@medusa-tattoo.de</p>
          <p><strong>🇬🇧 English spoken</strong></p>
        </div>
      </section>
    </main>
  )
}
