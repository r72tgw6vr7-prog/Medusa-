import { HelpCircle, Clock, MapPin, Euro, Shield, Languages } from 'lucide-react';
import { Card } from '../ui/Card';

const faqData = [
  {
    question: "Do you take walk-ins at Marienplatz?",
    answer: "Yes! We welcome walk-ins at our Marienplatz location, though appointments are recommended for larger custom designs. Our artists are usually available for consultations and smaller tattoos throughout the day.",
    icon: Clock,
    keywords: ["walk-in tattoo munich", "no appointment tattoo", "same day tattoo"]
  },
  {
    question: "How much does a small tattoo cost in Munich?",
    answer: "Small tattoos start at 80-150 EUR depending on complexity and placement. Larger custom designs are priced at 120-180 EUR per hour. We provide exact quotes during free consultations.",
    icon: Euro,
    keywords: ["tattoo price munich", "cheap tattoo munich", "tattoo cost germany"]
  },
  {
    question: "Is it safe to get a tattoo in Munich?",
    answer: "Absolutely! Germany has strict health and safety regulations. Our studio follows premium hygiene standards, uses only sterile equipment, and all artists are certified and vaccinated. Your safety is our top priority.",
    icon: Shield,
    keywords: ["safe tattoo munich", "hygiene tattoo studio", "sterile tattoo germany"]
  },
  {
    question: "Do you speak English at Medusa Tattoo?",
    answer: "Yes! Our entire team speaks fluent English. We're perfectly equipped for international clients and tourists visiting Munich. Feel free to discuss your design ideas in English or German.",
    icon: Languages,
    keywords: ["english speaking tattoo munich", "tattoo for tourists", "international tattoo studio"]
  },
  {
    question: "Where exactly is your tattoo studio located?",
    answer: "We're centrally located at Altheimer Eck 11, 80331 München - just 2 minutes from Marienplatz. We're easily reachable via U-Bahn/S-Bahn (Marienplatz station) and close to Viktualienmarkt.",
    icon: MapPin,
    keywords: ["tattoo studio location munich", "marienplatz tattoo", "city center tattoo"]
  },
  {
    question: "What tattoo styles do you specialize in?",
    answer: "Our artists specialize in Realism, Japanese/Irezumi, Blackwork, Fine Line, Geometric, Watercolor, Traditional, and Custom Designs. We also excel at professional cover-ups and tattoo transformations.",
    icon: HelpCircle,
    keywords: ["tattoo styles munich", "realistic tattoo munich", "japanese tattoo germany"]
  }
];

export function FAQSection() {
  return (
    <section className="py-16 bg-luxury-bg-dark">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-accent mb-8">
            Häufig gestellte Fragen
          </h2>
          <p className="text-lg text-luxury-text-inverse/80 max-w-3xl mx-auto">
            Alles, was Sie über unser Tattoo Studio am Marienplatz wissen müssen. 
            Von der Anreise bis zur Nachpflege – wir haben die Antworten.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {faqData.map((faq, index) => {
            const IconComponent = faq.icon;
            return (
              <Card 
                key={index}
                variant="default"
                size="default"
                asChild
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-8">
                    <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center shrink-0">
                      <IconComponent className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-brand-accent mb-8">
                        {faq.question}
                      </h3>
                      <p className="text-luxury-text-inverse/80 leading-relaxed">
                        {faq.answer}
                      </p>
                      
                      {/* Hidden keywords for SEO (featured snippet optimization) */}
                      <div className="mt-8 flex flex-wrap gap-2">
                        {faq.keywords.map((keyword, keywordIndex) => (
                          <span 
                            key={keywordIndex}
                            className="text-sm lg:text-xs text-luxury-text-inverse/40 bg-luxury-text-inverse/5 px-2 py-2 rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* SEO-Optimized Additional Information */}
        <Card variant="default" size="default" asChild>
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-8 text-brand-accent">
              Tattoo Studio München – Ihre Fragen, unsere Antworten
            </h3>
            <div className="grid md:grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="font-semibold mb-8 text-brand-accent">Für Einheimische:</h4>
                <p className="text-luxury-text-inverse/70">
                  Als lokales Tattoo Studio in München Innenstadt kennen wir die Bedürfnisse 
                  unserer Münchner Kunden. Von Schwabing bis Garching – wir sind Ihr Tattoo 
                  Studio in der Stadtmitte.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-8 text-brand-accent">Für Touristen:</h4>
                <p className="text-luxury-text-inverse/70">
                  Perfekt für Besucher Münchens! Englisch sprechende Künstler, zentrale Lage 
                  am Marienplatz und professionelle Service machen uns zur Top-Wahl für 
                  Ihr München-Tattoo.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-8 text-brand-accent">Für Erstbesucher:</h4>
                <p className="text-luxury-text-inverse/70">
                  Keine Sorge! Unsere Künstler führen Sie durch den gesamten Prozess. 
                  Von der Design-Idee bis zur Nachpflege – wir sind für Sie da.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
