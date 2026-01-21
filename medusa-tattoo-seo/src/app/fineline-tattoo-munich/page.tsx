export const metadata = {
  title: "Fineline Tattoo München – Zarte Linien am Marienplatz | Medusa Tattoo",
  description: "Fineline Tattoo Spezialisten direkt am Marienplatz. Single Needle Technik, zarte Linien, minimalistische Designs. English spoken. Walk-ins willkommen.",
  keywords: "fineline tattoo münchen, single needle tattoo, minimalist tattoo münchen, feine linien tattoo, micro tattoo münchen"
};

export default function FinelinePage() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-12">
        Fineline Tattoo München – Zarte Linien am Marienplatz
      </h1>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Single Needle Spezialisten</h2>
        <p className="text-xl leading-relaxed mb-12">
          Perfekte feine Linien für München Innenstadt. Direkt am Marienplatz, 
          zwischen Kaufingerstraße und Viktualienmarkt. Ideal für minimalistische 
          Designs und Micro Tattoos.
        </p>
      </section>

      {/* Gallery Placeholder */}
      <section className="grid md:grid-cols-2 gap-6 mb-16">
        {[1,2,3,4].map(i => (
          <div key={i} className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
            Fineline Work #{i}
          </div>
        ))}
      </section>
    </main>
  )
}
