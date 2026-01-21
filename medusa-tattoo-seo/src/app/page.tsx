import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-8">
      
      {/* HERO - Primary Keywords */}
      <section>
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
          Medusa Tattoo München – Premium Studio direkt am Marienplatz
        </h1>
        <p className="text-xl text-center max-w-3xl mx-auto mb-12">
          Dein Tattoo Studio im Herzen der Altstadt. Nur 2 Minuten vom Viktualienmarkt, 
          Kaufingerstraße und Sendlinger Straße. Fineline, Realistic & Cover-Ups. 
          🇬🇧 English spoken.
        </p>
      </section>

      {/* TRUST BAR - Copy from Tempel München */}
      <section className="bg-black text-white py-12 mb-16 rounded-2xl">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div><h3 className="text-2xl font-bold">Marienplatz</h3><p>Direkt am Platz</p></div>
          <div><h3 className="text-2xl font-bold">🇬🇧 English</h3><p>Fluent spoken</p></div>
          <div><h3 className="text-2xl font-bold">Walk-ins</h3><p>Willkommen</p></div>
          <div><h3 className="text-2xl font-bold">Hygiene</h3><p>DIN EN 17169</p></div>
        </div>
      </section>

      {/* FAQ SECTION - Featured Snippet Gold */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-12">Tattoo Studio München FAQ</h2>
        <div className="space-y-8">
          <details className="border p-6 rounded-xl">
            <summary className="font-bold text-xl cursor-pointer">Walk-in Tattoos am Marienplatz möglich?</summary>
            <p className="mt-4">Ja! Kleine Tattoos ohne Termin direkt neben Viktualienmarkt. Größere Designs gerne nach Beratung.</p>
          </details>
          <details className="border p-6 rounded-xl">
            <summary className="font-bold text-xl cursor-pointer">Englisch sprechende Tätowierer München?</summary>
            <p className="mt-4">100% fluent. Perfekt für Touristen am Marienplatz und Innenstadt-Besucher.</p>
          </details>
        </div>
      </section>

      {/* LOCATION BLOCK - Hyperlocal SEO */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12 rounded-3xl mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Direkt am Marienplatz</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>🛍️ <strong>Kaufingerstraße</strong> - 3 min zu Fuß</div>
          <div>🍺 <strong>Viktualienmarkt</strong> - 2 min zu Fuß</div>
          <div>⛪ <strong>Alter Peter</strong> - 4 min zu Fuß</div>
        </div>
      </section>

    </main>
  )
}
