# Services & Pricing Audit (2026-01-20)

## Objective
Conduct a read-only forensic audit of all service offerings, pricing structures, package names, included items, and booking requirements across the codebase. Extract exact wording as implemented and compare to client specifications. No code changes were made.

## Scope & Method
- Read-only review of service data sources, UI components that render services/prices, and booking flow content.
- Extracted text and pricing verbatim (including capitalization/typos) from code and localization files.
- Verified presence/absence of required client specifications.

## Data Sources (Primary)
- `src/components/pages/TattooServicesPage.tsx` (tattoo packages, design services, product placeholder, tattoo page headings)
- `src/components/pages/PiercingServicesPage.tsx` (piercing categories, services, detailed price lists, consultation banner)
- `src/components/pages/ServicesPageInteractive.tsx` (interactive service packages for tattoos, piercings, products, consultations)
- `src/data/services.ts` (master service catalog for tattoos, piercings, permanent makeup, specials)
- `src/data/serviceCategories.ts` (piercing/service category carousel data)
- `src/components/molecules/Card/ServiceCards.tsx` (homepage service cards)
- `src/components/seo/FAQSection.tsx` (walk-in and pricing statements)
- `src/components/booking/bookingConfig.ts` (booking service card config)
- `src/components/booking/BookingModalMobile.tsx` + `src/components/booking/steps/*` (booking flow and requirements)
- `src/i18n/locales/de/booking.json`, `src/i18n/locales/en/booking.json` (booking UI copy)
- `src/pages/BookingPage.tsx` (booking page headings)
- `src/sections/BookingSection.tsx`, `src/components/PreFooterBookingCTA.tsx` (booking CTA messaging)

---

## Inventory: Tattoo Services & Packages

### A) Tattoo page headings (`TattooServicesPage`)
- Eyebrow: "Medusa München"
- Title: "Tattoo"
- Subtitle: "Wählen Sie aus unseren Signature-Angeboten und entdecken Sie Premium-Optionen, die perfekt zu Ihrem Projekt passen."

### B) Category tiles on tattoo page
1) **Tattoo Artistry**
   - Subtitle: "Von Basic bis Exklusiv für jeden Geschmack"
   - PriceFrom: "80€"
2) **Custom Design**
   - Subtitle: "Individuelle Entwürfe nach Ihren Wünschen"
   - PriceFrom: "20€"
3) **Ink Solutions**
   - Subtitle: "Professionelle Lösungen für Ihre Tattoo-Projekte"
   - PriceFrom: "TBD"

### C) Tattoo packages (tattoo category)
| ID | Title | Price | Duration | Description | Features | CTA |
| --- | --- | --- | --- | --- | --- | --- |
| packet-s | Packet S | 80 `€ - 150€` | 30 minutes | Small tattoos - symbols, letters, souvenirs. For customers with concrete ideas. | Persönliche Beratung; Kleine Motive; Schnelle Umsetzung | Jetzt buchen |
| packet-m | Packet M | 160 `€ - 480€` | 1-3 hours | Personalized projects, unique designs. Includes aftercare guide & products. | Einzigartiges Design; Aftercare Guide; Premium Produkte | Jetzt buchen |
| packet-l | Packet L | 600 `€+` | 4-7 hours | Größere Projekte mit detaillierter Ausarbeitung. Includes aftercare guide & products. | Detailarbeit; Aftercare Guide; Premium Produkte | Jetzt buchen |
| day-session | Complete Day Session | 0 `Auf Anfrage` | Ganztägig | Ganztägige Session für umfangreiche Projekte und Sleeves. | Individuelle Planung; VIP Betreuung; Flexible Gestaltung | Let's Talk |

### D) Design services (piercing category on tattoo page)
| ID | Title | Price | Duration | Description | Features | CTA |
| --- | --- | --- | --- | --- | --- | --- |
| dynamic-pricing | Dynamic Pricing | 20 `€+` | Up to 2 hours | €20 for simple motifs, symbols, letters. Price increases based on complexity. | Einfache Motive ab €20; Preis nach Komplexität; Kleine/reguläre Designs bis 2 Std. | Beratung anfragen |
| free-design | Design Service | 0 `GRATIS bei Tattoo` | Nach Vereinbarung | Get your tattoo at Medusa → Design is FREE. Individuelle Entwürfe inklusive. | Design kostenlos bei Tattoo; Individuelle Entwürfe; Unbegrenzte Revisionen | Jetzt anfragen |
| design-only | Design Only | 20 `€+` | Nach Aufwand | Nur Design ohne Tattoo. Preise nach Komplexität und Größe. | Digitale Vorlage; Alle Stilrichtungen; Schnelle Lieferung | Anfragen |

### E) Products (products category on tattoo page)
| ID | Title | Price | Duration | Description | Features | CTA |
| --- | --- | --- | --- | --- | --- | --- |
| ink-solutions-info | Ink Solutions | 0 `TBD` | (null) | Weitere Informationen folgen in Kürze. | Coming Soon; Weitere Details folgen; Kontaktieren Sie uns | Anfragen |

---

## Inventory: Piercing Services & Pricing

### A) Piercing page headings (`PiercingServicesPage`)
- Eyebrow: "Medusa München"
- Title: "Piercing"
- Subtitle: "Professionelles Piercing mit über 5 Jahren Erfahrung und höchsten Hygienestandards."
- Consultation banner: "Kostenlose Beratung" + "Allow us to help you choose the right team member and piercing"

### B) Category tiles on piercing page
1) **Stechen**
   - Subtitle: "Professionelles Piercing mit Titan-Schmuck"
   - PriceFrom: "35€"
2) **Jewelry**
   - Subtitle: "Titan-Schmuck in Silber, Gold & Rosé"
   - PriceFrom: "Inklusive"
3) **Extra Services**
   - Subtitle: "Wechseln, Entfernen & Pflege"
   - PriceFrom: "5€"

### C) Piercing service cards (Stechen)
| ID | Title | Price | Duration | Description | Features | CTA |
| --- | --- | --- | --- | --- | --- | --- |
| ohr | Ohr \| Ear | 35 `€ - 110€` | 15-30 Min | Lobe, Helix, Tragus, Conch, Rook, Daith, Industrial und mehr. | Titan-Schmuck inklusive; Sterile Einwegmaterialien; Nachsorgeberatung | Jetzt buchen |
| mund | Mund \| Mouth | 70 `€ - 150€` | 15-30 Min | Lippe, Grübchen, Dahlia, Lippenband, Zunge, Snake Eye. | Titan-Schmuck inklusive; Mundspülung inklusive; Pflegehinweise | Jetzt buchen |
| gesicht | Gesicht \| Face | 60 `€ - 150€` | 15-30 Min | Augenbraue, Bridge, Nase, Septum, Anti Eyebrow, Dermal Anchor. | Titan-Schmuck inklusive; Sterile Umgebung; Follow-up möglich | Jetzt buchen |
| koerper | Körper \| Body | 80 `€ - 160€` | 20-45 Min | Brustwarze, Bauchnabel, Surface, Dermal Anchor, Skindiver. | Titan-Schmuck inklusive; Anatomie-Check; Premium Nachsorge | Jetzt buchen |
| intim | Intim \| Intimate | 90 `€ - 170€` | 30-45 Min | Professionelle Intim-Piercings. Mindestalter 18 Jahre. | Titan-Schmuck inklusive; Private Atmosphäre; mind. 18 Jahre | Beratung anfragen |

### D) Jewelry services
| ID | Title | Price | Duration | Description | Features | CTA |
| --- | --- | --- | --- | --- | --- | --- |
| titanium | Titanium Schmuck | 0 `Inklusive` | (null) | Hochwertiger Titan-Schmuck in Silber - bei jedem Piercing inklusive. | Hypoallergen; Implant-Grade Titan; Silber Finish | Mehr erfahren |
| upgrades | Upgrades | 5 `€+` | (null) | Veredeln Sie Ihren Schmuck mit Gold, Rosé oder Glitzer. | Titan Gold: +€5; Titan Rosé: +€5; Glitzer: +€5 | Upgrade wählen |

### E) Extra services
| ID | Title | Price | Duration | Description | Features | CTA |
| --- | --- | --- | --- | --- | --- | --- |
| entfernen | Entfernen | 5 `€ - 25€` | 5-15 Min | Professionelles Entfernen von Piercings und Implantaten. | Standard: €5; Dermal/Skindiver: €10; Implantat: €25 | Termin buchen |
| service | Service | 5 `€ - 15€` | 5-20 Min | Einsetzen, Wechseln, Kürzen und Pflege bei Problemen. | Einsetzen: €5-10; Wechseln: €5-10; Kürzen: €5-10 | Termin buchen |
| probleme | Probleme & Pflege | 5 `€ - 15€` | 10-20 Min | Hilfe bei eingewachsenen Piercings und Wildfleisch. | Eingewachsen: €5-15; Wildfleisch: €5-15; Beratung inklusive | Hilfe anfragen |
| implantat | Implantat | 25 `€ - 50€` | 20-45 Min | Professionelles Einsetzen und Entfernen von Implantaten. | Einsetzen: €50; Entfernen: €25; Beratung vorab | Beratung anfragen |

### F) Detailed price list: PREISLISTE_STECHEN
**Ohr**
- Ohrläppchen | Lobe: 35,- | 65,-
- Helix (Forward/Hidden): 60,- | 110,-
- Flat: 70,-
- Tragus: 60,-
- Anti-Tragus: 70,-
- Conch: 70,-
- Rook: 70,-
- Daith: 70,-
- Industrial: 80,-
- Snug: 70,-
- Transverse Lobe: 60,-
- Surface Tragus: 90,-

**Mund**
- Lippe | Lip: 70,- | 130,-
- Grübchen | Cheek: 80,- | 150,-
- Dahlia: 80,- | 150,-
- Lippenband | Lipband: 70,-
- Zunge | Tongue: 80,- | 150,-
- Snake Eye: 90,-

**Gesicht**
- Augenbraue | Eyebrow: 70,- | 130,-
- Bridge: 70,-
- Nase | Nose: 60,- | 110,-
- Septum: 80,-
- Anti Eyebrow (Surface): 90,-
- Dermal Anchor: 80,- | 150,-
- Skindiver: 80,- | 150,-

**Körper**
- Brustwarze | Nipple: 80,- | 150,-
- Bauchnabel | Belly Button: 80,- | 150,-
- Surface: 90,- | 160,-
- Dermal Anchor: 80,- | 150,-
- Skindiver: 80,- | 150,-

**Intim**
- Frau | Woman: 90,- | 170,-
- Mann | Men: 90,- | 170,-
- Note: "mind. 18 Jahre / min. 18 Years"

---

## Inventory: Service Catalog (`src/data/services.ts`)

### 1) Custom Tattoo
- Name (DE/EN): "Custom Tattoo" / "Custom Tattoo"
- Tagline (DE/EN): "Einzigartige Designs für einzigartige Menschen" / "Unique designs for unique people"
- Description (DE): "Arbeiten Sie mit unseren talentierten Künstlern zusammen, um Ihr perfektes Custom Tattoo zu kreieren. Von der ersten Idee bis zum fertigen Kunstwerk begleiten wir Sie durch den gesamten Prozess. Jedes Design wird individuell für Sie erstellt und perfekt auf Ihre Vorstellungen abgestimmt."
- Description (EN): "Work with our talented artists to create your perfect custom tattoo. From initial concept to finished artwork, we guide you through the entire process. Each design is individually created for you and perfectly tailored to your vision."
- Pricing: from 150 EUR / "Stunde" (note: "Preis abhängig von Größe, Detail und Künstler" / "Price depends on size, detail, and artist")
- Duration: 2-8 "Stunden"
- Process: Kostenlose Beratung und Konzeptentwicklung; Individuelle Design-Erstellung durch Ihren Künstler; Design-Revision und finaler Entwurf; Tattoo-Session mit professioneller Nachsorge; Follow-up und Touch-up falls nötig
- Features: Individuelle Design-Erstellung; Unbegrenzte Revisions-Runden; Professionelle Künstler; Premium Tattoo-Farben; Sterile Einweg-Ausrüstung; Kostenlose Touch-ups innerhalb 6 Monaten
- Consultation: true | Recommended: true | Popular: true

### 2) Traditional Tattoo
- Name (DE/EN): "Traditional Tattoo" / "Traditional Tattoo"
- Tagline (DE/EN): "Klassische Tattoo-Kunst mit modernem Touch" / "Classic tattoo art with modern touch"
- Description (DE): "Erleben Sie die zeitlose Schönheit traditioneller Tattoos. Mit kräftigen Linien, leuchtenden Farben und ikonischen Motiven schaffen wir klassische Designs, die ein Leben lang halten. Unsere Künstler sind Meister der alten Schule mit modernem Know-how."
- Description (EN): "Experience the timeless beauty of traditional tattoos. With bold lines, vibrant colors, and iconic motifs, we create classic designs that last a lifetime. Our artists are masters of old school with modern expertise."
- Pricing: from 120 EUR / "Stunde" (note: "Kleine Flash-Designs ab 80€" / "Small flash designs from 80€")
- Duration: 1-6 "Stunden"
- Process: Motivauswahl aus unserem Flash oder Custom Design; Platzierungs-Beratung; Tattoo-Session; Nachsorge-Anleitung; Kostenlose Touch-ups
- Features: Kräftige Linien & leuchtende Farben; Ikonische traditionelle Motive; Flash-Designs verfügbar; Schnelle Heilung; Zeitlose Ästhetik
- Consultation: false | Recommended: false | Popular: true

### 3) Realism Tattoo
- Name (DE/EN): "Realism Tattoo" / "Realism Tattoo"
- Tagline (DE/EN): "Fotorealistische Kunstwerke auf der Haut" / "Photorealistic artwork on skin"
- Description (DE): "Unsere Realism-Spezialisten kreieren atemberaubende fotorealistische Tattoos. Von Portraits bis zu komplexen Szenen - jedes Detail wird mit höchster Präzision umgesetzt. Diese anspruchsvolle Kunst erfordert mehrere Sessions und absolute Hingabe."
- Description (EN): "Our realism specialists create breathtaking photorealistic tattoos. From portraits to complex scenes - every detail is executed with highest precision. This demanding art requires multiple sessions and absolute dedication."
- Pricing: 180-250 EUR / "Stunde" (note: "Großprojekte nach Absprache" / "Large projects by arrangement")
- Duration: 4-12 "Stunden"
- Process: Intensive Beratung & Referenzfotos; Detaillierte Design-Erstellung; Mehrere Sessions je nach Größe; Regelmäßige Heilungs-Checks; Final Touch-ups
- Features: Fotorealistische Details; Meisterhafte Schattierungen; Portrait-Spezialisten; Black & Grey oder Farbe; Mehrere Sessions für beste Qualität
- Consultation: true | Recommended: true | Popular: false

### 4) Fine Line Tattoo
- Name (DE/EN): "Fine Line Tattoo" / "Fine Line Tattoo"
- Tagline (DE/EN): "Zarte, minimalistische Eleganz" / "Delicate, minimalist elegance"
- Description (DE): "Entdecken Sie die Schönheit minimalistischer Fine Line Tattoos. Mit hauchdünnen Linien und eleganter Präzision kreieren wir subtile Kunstwerke, die Raffinesse ausstrahlen. Perfekt für Erstlinge oder diskrete Designs."
- Description (EN): "Discover the beauty of minimalist fine line tattoos. With ultra-thin lines and elegant precision, we create subtle artworks that radiate sophistication. Perfect for first-timers or discreet designs."
- Pricing: from 100 EUR / "Stück" (note: "Micro-Tattoos ab 80€" / "Micro tattoos from 80€")
- Duration: 1-3 "Stunden"
- Process: Design-Beratung; Präzise Platzierung; Schnelle, schonende Session; Einfache Heilung; Optional: Touch-up
- Features: Hauchdünne, präzise Linien; Minimalistische Designs; Schnelle Heilung; Diskret & elegant; Ideal für erste Tattoos
- Consultation: false | Recommended: false | Popular: true

### 5) Cover-Up & Restaurierung (category: special)
- Name (DE/EN): "Cover-Up & Restaurierung" / "Cover-Up & Restoration"
- Tagline (DE/EN): "Zweite Chancen für alte Tattoos" / "Second chances for old tattoos"
- Description (DE): "Verwandeln Sie alte, verblasste oder unerwünschte Tattoos in schöne neue Kunstwerke. Unsere Cover-Up Spezialisten sind Experten darin, aus Herausforderungen Meisterwerke zu schaffen. Auch Restaurierungen wertvoller alter Tattoos sind möglich."
- Description (EN): "Transform old, faded, or unwanted tattoos into beautiful new artwork. Our cover-up specialists are experts in turning challenges into masterpieces. Restoration of valuable old tattoos is also possible."
- Pricing: from 150 EUR / "Stunde" (note: "Preis abhängig vom Original-Tattoo" / "Price depends on original tattoo")
- Duration: 3-10 "Stunden"
- Process: Ausführliche Analyse des alten Tattoos; Cover-Up Design-Optionen; Eventuell Laser-Vorbehandlung; Mehrere Sessions; Finaler Touch-up
- Features: Expertentransformation; Kreative Lösungen; Laser-Partnerschaften; Realistische Planung; Garantierte Zufriedenheit
- Consultation: true | Recommended: true | Popular: false

### 6) Piercing
- Name (DE/EN): "Piercing" / "Piercing"
- Tagline (DE/EN): "Professionelles Piercing in luxuriöser Umgebung" / "Professional piercing in luxurious environment"
- Description (DE): "Erleben Sie Piercing auf höchstem Niveau. Mit sterilen Techniken, hochwertigem Schmuck und erfahrenen Piercern bieten wir alle Arten von Piercings. Von klassischen Ohrpiercings bis zu individuellen Body Piercings - Ihre Sicherheit und Zufriedenheit stehen an erster Stelle."
- Description (EN): "Experience piercing at the highest level. With sterile techniques, high-quality jewelry, and experienced piercers, we offer all types of piercings. From classic ear piercings to individual body piercings - your safety and satisfaction come first."
- Pricing: 40-120 EUR / "Stück" (note: "Inklusive hochwertigem Erstschmuck" / "Including high-quality initial jewelry")
- Duration: 15-45 "Minuten"
- Process: Beratung & Platzierung; Desinfektion & Markierung; Professionelles Piercing; Erstschmuck-Einsetzung; Nachsorge-Anleitung
- Features: Sterile Einweg-Nadeln; Premium Titan-Schmuck; Erfahrene Piercer; Schnelle Heilung; Follow-up inklusive
- Consultation: false | Recommended: false | Popular: true

### 7) Permanent Make-up
- Name (DE/EN): "Permanent Make-up" / "Permanent Makeup"
- Tagline (DE/EN): "Natürliche Schönheit, dauerhaft" / "Natural beauty, permanent"
- Description (DE): "Wachen Sie jeden Tag perfekt geschminkt auf. Unser Permanent Make-up umfasst Augenbrauen (Microblading/Powder Brows), Eyeliner und Lippenkontur. Mit natürlichen Pigmenten und präzisen Techniken kreieren wir subtile, langanhaltende Ergebnisse."
- Description (EN): "Wake up perfectly made up every day. Our permanent makeup includes eyebrows (microblading/powder brows), eyeliner, and lip liner. With natural pigments and precise techniques, we create subtle, long-lasting results."
- Pricing: 250-450 EUR / "Behandlung" (note: "Touch-up nach 6-8 Wochen inklusive" / "Touch-up after 6-8 weeks included")
- Duration: 2-3 "Stunden"
- Process: Ausführliche Beratung & Farbauswahl; Design & Vorzeichnung; Betäubung für maximalen Komfort; Präzise Pigmentierung; Touch-up Session nach Heilung
- Features: Natürliche Ergebnisse; Premium Pigmente; Schmerzarm durch Betäubung; Hält 1-3 Jahre; Touch-up inklusive
- Consultation: true | Recommended: true | Popular: false

---

## Inventory: Interactive Services Page (`ServicesPageInteractive`)

### Category tiles
1) **Tattoo Services** – "Von Basic bis Exklusiv für jeden Geschmack" – PriceFrom: "120€"
2) **Premium Piercing** – "Hygienisch mit 5+ Jahren Erfahrung" – PriceFrom: "85€"
3) **Nachpflege Produkte** – "Speziell für Tattoos und Piercings entwickelt" – PriceFrom: "35€"
4) **Beratung & Planung** – "Kostenlos beraten lassen und Termin sichern" – PriceFrom: "Kostenlos"

### Tattoo packages
| ID | Title | Price | Duration | Description | Features | CTA |
| --- | --- | --- | --- | --- | --- | --- |
| custom-tattoo | Basis Tattoo | 120 `€ / Stunde` | 2-4 Stunden | Präzise Linien, perfekte Platzierung und starke Farbsättigung für kleinere Motive. | Persönliche Beratung; Skizzen-Erstellung; Alle Stilrichtungen | Jetzt buchen |
| premium-tattoo | Premium Tattoo | 280 `€ / Sitzung` | 4-8 Stunden | Aufwendige Projekte mit exklusiven Pigmenten und mehrstufiger Planung. | Artist Matching; Detailverliebte Ausarbeitung; Premium Nachsorge | Jetzt buchen |
| exclusive-tattoo | Exklusiv Tattoo | 450 `€ / Sitzung` | Ganztägig | Mehrteilige Meisterwerke mit individuellen Sessions und Concierge-Service. | Individuelle Projektplanung; Private Studiofläche; VIP Betreuung | Jetzt buchen |

### Piercing packages
| ID | Title | Price | Duration | Description | Features | CTA |
| --- | --- | --- | --- | --- | --- | --- |
| standard-piercing | Basis Piercing | 45 `€ / Piercing` | 15-30 Min | Professionelles Body Piercing inklusive Titan-Schmuck und Hygiene-Check. | Sterile Einwegmaterialien; Titan-Schmuck; Nachsorgeberatung | Jetzt buchen |
| premium-piercing | Premium Piercing | 85 `€ / Piercing` | 30-45 Min | Premium Schmuckauswahl, Styling-Beratung und personalisierte Nachpflege. | Exklusive Schmuckauswahl; Styling-Beratung; Premium Pflegeprodukte | Jetzt buchen |
| exclusive-piercing | Exklusiv Piercing | 150 `€ / Projekt` | 60 Min | Komplexe Kurationsprojekte mit mehrteiligen Schmuckkonzepten. | Kurationsplanung; VIP Lounge; Follow-up Termine | Jetzt buchen |

### Products (Nachpflege)
| ID | Title | Price | Description | Features | CTA |
| --- | --- | --- | --- | --- | --- |
| basic-care | Basis Pflegeset | 25 `€` | Essentials für perfekte Tattoo-Heilung inklusive milder Reinigung. | Tattoo Cleanser; Healing Balm; Anwendungsguide | Jetzt kaufen |
| premium-care | Premium Pflegeset | 65 `€` | Glanz & Schutz mit hochwertigen, veganen Pflegeprodukten. | Vegan Balm; Hydro Spray; 24/7 Support | Jetzt kaufen |
| piercing-care | Piercing Pflege | 35 `€` | Schnelle Heilung mit pH-neutraler Pflege speziell für Piercings. | Saline Solution; Aftercare Mist; Sterile Pads | Jetzt kaufen |

### Consultation packages (Beratung & Planung)
| ID | Title | Price | Duration | Description | Features | CTA |
| --- | --- | --- | --- | --- | --- |
| consult | Grundberatung | 0 `Kostenlos` | 30 Min | Kostenloser Termin für Cover-Up- oder Refresh-Projekte. | Bedarfsanalyse; Stilberatung; Zeitplanung | Jetzt buchen |
| premium-consult | Premium Beratung | 75 `€ / Termin` | 60 Min | Intensive Konzeptionsphase inklusive Artist Matching. | Artist Matching; Skizzen Review; Budgetplanung | Jetzt buchen |
| vip-consult | VIP Beratung | 150 `€ / Termin` | 90 Min | Concierge-Service mit priorisierten Terminen und persönlicher Betreuung. | VIP Lounge; Concierge; Projekt Roadmap | Termin reservieren |

---

## Inventory: Service Categories (ServiceCarousel)
From `src/data/serviceCategories.ts`:
- Ohr – "Lobe · Helix · Conch · Tragus" – priceFrom "ab 45€" – link `/services#piercing`
- Mund – "Labret · Medusa · Snake Bites" – priceFrom "ab 50€" – link `/services#piercing`
- Körper – "Navel · Surface · Dermal" – priceFrom "ab 60€" – link `/services#piercing`
- Gesicht – "Nostril · Septum · Bridge" – priceFrom "ab 50€" – link `/services#piercing`
- Intim – "Diskret · Professionell · Sicher" – priceFrom "ab 80€" – link `/services#piercing`
- Service – "Wechsel · Dehnen · Beratung" – priceFrom "ab 15€" – link `/services#service`
- Pflege – "Aftercare · Premium Produkte" – priceFrom "ab 12€" – link `/services#products`

---

## Inventory: Service Cards (Homepage)
From `src/components/molecules/Card/ServiceCards.tsx` (default cards):
1) **Tattoo Artistry / Permanent Kunst**
   - Bullets: Individuelle Designs; Erfahrene Künstler; Sterile Arbeitsweise; Nachbetreuung
   - Price: "ab €180"
   - CTA: "Jetzt Entdecken" -> `/services#tattoo`
2) **Premium Piercing / Luxury Schmuck**
   - Bullets: Premium Schmuck; Professionelle Beratung; Hygienische Standards; Nachpflege
   - Price: "ab €60"
   - CTA: "Jetzt Entdecken" -> `/services#piercing`

---

## Inventory: FAQ / SEO Statements
From `src/components/seo/FAQSection.tsx`:
- Walk-ins: "Yes! We welcome walk-ins at our Marienplatz location, though appointments are recommended for larger custom designs. Our artists are usually available for consultations and smaller tattoos throughout the day."
- Small tattoo pricing: "Small tattoos start at 80-150 EUR depending on complexity and placement. Larger custom designs are priced at 120-180 EUR per hour. We provide exact quotes during free consultations."
- Additional: safety, English language, location, styles (Realism, Japanese/Irezumi, Blackwork, Fine Line, Geometric, Watercolor, Traditional, Custom Designs, cover-ups).

---

## Inventory: Booking System Content

### Booking page headings
From `src/pages/BookingPage.tsx` + translations:
- Eyebrow: "Booking" (EN) / "Buchung" (DE)
- Title: "Book Appointment" (EN) / "Termin vereinbaren" (DE)
- Subtitle: "Schedule a consultation for your next tattoo or piercing." (EN) / "Vereinbaren Sie einen Beratungstermin für Ihr nächstes Tattoo oder Piercing." (DE)

### Booking steps and requirements
From `BookingModalMobile.tsx` + steps:
1) **Service selection step**
   - Question: "What would you like to book?" (EN) / "Was möchtest du buchen?" (DE)
   - Service cards driven by `SERVICE_CONFIG`: `tattoo`, `piercing`.
   - Required to proceed: service selected.
   - Project details field label: "Project details (optional)" (EN) / "Was genau? (optional)" (DE)

2) **Personal info step**
   - Required fields to proceed: name, email, phone, date, GDPR consent.
   - Optional: message/special requests.

3) **Payment step**
   - Required to proceed: payment method selected.

### Booking UI copy (EN)
From `src/i18n/locales/en/booking.json`:
- Labels: Full Name; Email; Phone Number; Date; Time; Number of Guests; Special Requests (Optional)
- Placeholders: John Doe; your@email.com; +1 (123) 456-7890; Select a time; Any special requirements or notes...
- Modal copy: Book Appointment; Your details; What would you like to book?; Project details (optional); Next; Back; Close
- Payment: Payment; Payment Method; Cash; Card; Bank Transfer; Request Appointment
- Toasts: Booking submitted; We'll contact you shortly to confirm your reservation.; Failed to submit booking; Please try again or contact us directly.
- Error: Something went wrong; Try again; Trying to resend...; Please complete all steps
- Confirmation: Appointment confirmed!; Your appointment request has been successfully submitted.; Booking Number:; Service:; Date:; We have sent a confirmation email with all details. Please check your inbox and spam folder.; Close
- GDPR: I agree to the processing of my data according to the privacy policy.*
- Booking services (cards):
  - Tattoo Artistry – from €150/hr – Custom Designs; Experienced Artists; Highest Hygiene Standards; Personal Consultation
  - Piercing – from €30 – Professional Consultation; High-Quality Jewelry; Sterile Working; Comprehensive Aftercare

### Booking UI copy (DE)
From `src/i18n/locales/de/booking.json`:
- Labels: Name; E-Mail; Telefonnummer; Datum; Uhrzeit; Anzahl Gäste; Sonderwünsche (optional)
- Placeholders: John Doe; ihre.email@beispiel.de; +49 (0) 89 269 313; Uhrzeit wählen; Kurzbeschreibung (z.B. Stil, Körperstelle, Größe, Referenzen)
- Modal copy: Termin buchen; Deine Daten; Was möchtest du buchen?; Was genau? (optional); Weiter; Zurück; Schließen
- Payment: Zahlung; Bezahlmethode; Bar; Karte; Überweisung; Termin anfragen
- Toasts: Buchungsanfrage gesendet; Wir melden uns in Kürze zur Bestätigung Ihrer Reservierung.; Buchungsanfrage fehlgeschlagen; Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.
- Error: Etwas ist schiefgelaufen; Erneut versuchen; Versuche erneut zu senden...; Bitte vervollständigen Sie alle Schritte
- Confirmation: Termin bestätigt!; Ihre Terminbuchung wurde erfolgreich übermittelt.; Buchungsnummer:; Service:; Datum:; Wir haben eine Bestätigungs-E-Mail mit allen Details gesendet. Bitte überprüfen Sie Ihr Postfach und den Spam-Ordner.; Schließen
- GDPR: Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.*
- Booking services (cards):
  - Tattoo Artistry – ab €150/Std – Individuelle Designs; Erfahrene Künstler; Höchste Hygienestandards; Persönliche Beratung
  - Piercing – ab €30 – Professionelle Beratung; Hochwertiger Schmuck; Steriles Arbeiten; Umfassende Nachsorge

### Booking CTAs (other components)
- `BookingSection`: Button text "Termin buchen" (navigates to `/booking`).
- `PreFooterBookingCTA`: Heading "Bereit für Ihr Meisterwerk?"; subtitle "Lassen Sie uns gemeinsam Ihre Vision in ein unvergessliches Kunstwerk verwandeln"; CTA button text "Termin jetzt anfragen →" (when service/artist selected) or "Jetzt Termin sichern →".

---

## Gap Analysis vs Client Specifications

### 1) Tattoo packages: Packet S/M/L, Whole Day Session
- **Found**: Packet S/M/L and **"Complete Day Session"** on tattoo page.
- **Mismatch**: Client spec says "Whole Day Session"; code uses "Complete Day Session".
- **Additional**: ServicesPageInteractive uses "Basis Tattoo", "Premium Tattoo", "Exklusiv Tattoo" (different naming/pricing). ServiceCards uses "Permanent Kunst" with price "ab €180". Service catalog uses "Custom Tattoo", "Traditional Tattoo", etc.

### 2) Inclusions: Aftercare package + guide + FREE design
- **Partial**: Packet M/L mention "Aftercare Guide" + "Premium Produkte" (no explicit "Aftercare package" wording).
- **Missing/Unclear**: Packet S has no aftercare mention. No explicit "FREE design" inclusion in Packet S/M/L cards.
- **Separate rule**: "Design Service" explicitly states free design with tattoo ("GRATIS bei Tattoo") and "Design Only" paid from €20.

### 3) Design pricing rule: FREE if tattoo booked, costs money if standalone
- **Found**: "Design Service" states free with tattoo; "Design Only" priced from €20.
- **Note**: This is not tied to specific tattoo packages; it appears as its own category on TattooServicesPage.

### 4) Piercing appointment rule: Normal = walk-in, Special = appointment required
- **Not explicitly found**: No explicit mapping of "normal" vs "special" piercing requiring appointment.
- **Related content**: Piercing page includes CTAs like "Jetzt buchen" vs "Beratung anfragen" and a general consultation banner. No explicit walk-in policy for piercings.
- **Walk-in policy present (FAQ)**: Applies to tattoos at Marienplatz, with appointments recommended for larger custom designs.

### 5) Kids service: "Ear Hole Magician" ear piercing
- **Not found**: No occurrences of "Ear Hole" or "Magician" in `src` or `docs` searches. No kids-specific piercing service detected.

### 6) Booking UX message: "We want to give you the best experience. Let us help you choose the right expert."
- **Mismatch**: Found "Allow us to help you choose the right team member and piercing" in piercing page consultation banner.
- **Not found**: Exact client wording not present in booking translations or booking UI.

---

## Inconsistencies & Conflicts (Observed)
- **Multiple tattoo pricing baselines**: Packet S starts at 80; FAQ says small tattoos start 80-150; ServicesPageInteractive starts at 120/hr; booking cards say from €150/hr; ServiceCards show "ab €180"; Services catalog pricing ranges differ by style.
- **Multiple piercing pricing baselines**: Booking cards say from €30; ServiceCards show "ab €60"; PiercingServicesPage starts at 35€ for Ohr and 70€+ for Mund.
- **Package naming conflicts**: Packet S/M/L vs Basis/Premium/Exklusiv vs Custom/Traditional/Realism/Fine Line.
- **Category conflicts**: ServiceCategories uses Ohr/Mund/Körper/Gesicht/Intim/Service/Pflege, while PiercingServicesPage uses Stechen/Jewelry/Extra Services.

---

## Files Scanned
- `src/components/pages/TattooServicesPage.tsx`
- `src/components/pages/PiercingServicesPage.tsx`
- `src/components/pages/ServicesPageInteractive.tsx`
- `src/data/services.ts`
- `src/data/serviceCategories.ts`
- `src/components/molecules/Card/ServiceCards.tsx`
- `src/components/seo/FAQSection.tsx`
- `src/components/booking/bookingConfig.ts`
- `src/components/booking/BookingModalMobile.tsx`
- `src/components/booking/steps/ServiceSelectionStep.tsx`
- `src/components/booking/steps/PersonalInfoStep.tsx`
- `src/components/booking/steps/PaymentStep.tsx`
- `src/components/booking/steps/ConfirmationStep.tsx`
- `src/i18n/locales/de/booking.json`
- `src/i18n/locales/en/booking.json`
- `src/pages/BookingPage.tsx`
- `src/sections/BookingSection.tsx`
- `src/components/PreFooterBookingCTA.tsx`

---

## Notes
- Read-only audit only; no code changes made.
