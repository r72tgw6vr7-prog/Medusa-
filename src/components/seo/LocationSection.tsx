import { MapPin, Train, ShoppingBag, Landmark } from 'lucide-react';
import Section from '@/components/primitives/Section';
import Container from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';

export function LocationSection() {
  return (
    <Section
      bg='dark'
      spacing='none'
      variant='default'
      className='py-16 md:py-20 lg:py-24'
      aria-labelledby='location-section-title'
    >
      <Container size='default'>
        <div className='text-center mb-16'>
          <h2
            className='font-headline text-(length:--text-h3) md:text-(length:--text-h2) text-(--color-text-primary)'
            id='location-section-title'
          >
            Tattoo Studio direkt am Marienplatz
          </h2>
          <p className='font-body text-(length:--text-body) text-brand-chrome/80 font-semibold max-w-3xl mx-auto leading-(--line-height-normal)'>
            Im Herzen Münchens gelegen – die beste Lage für Ihr Tattoo Erlebnis. Erreichbar von überall
            in der Stadt und perfekt für Touristen und Einheimische.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
          {/* Marienplatz - Main Location */}
          <div className='text-center flex flex-col h-full'>
            <div className="w-16 bg-luxury-text-inverse/5 rounded-full flex flex-col items-center justify-center mx-auto mb-8 h-full min-h-16 max-h-16">
              <Landmark className='w-8 h-8 text-(--brand-accent)' />
            </div>
            <h3 className='font-headline font-semibold text-(length:--text-body) text-luxury-text-inverse mb-0'>Marienplatz</h3>
            <p className='font-body text-luxury-text-inverse/70 text-(length:--text-sm) leading-(--line-height-normal)'>
              Nur 2 Minuten vom zentralen Marienplatz entfernt – dem pulsierenden Herzen Münchens
            </p>
          </div>

          {/* Viktualienmarkt - Tourist attraction */}
          <div className='text-center flex flex-col h-full'>
            <div className="w-16 bg-luxury-text-inverse/5 rounded-full flex flex-col items-center justify-center mx-auto mb-8 h-full min-h-16 max-h-16">
              <ShoppingBag className='w-8 h-8 text-(--brand-accent)' />
            </div>
            <h3 className='font-headline font-semibold text-(length:--text-body) text-luxury-text-inverse mb-0'>Viktualienmarkt</h3>
            <p className='font-body text-luxury-text-inverse/70 text-(length:--text-sm) leading-(--line-height-normal)'>
              5 Minuten vom berühmten Viktualienmarkt – perfekt für einen Besuch vor/nach dem Tattoo
            </p>
          </div>

          {/* Public Transport */}
          <div className='text-center flex flex-col h-full'>
            <div className="w-16 bg-luxury-text-inverse/5 rounded-full flex flex-col items-center justify-center mx-auto mb-8 h-full min-h-16 max-h-16">
              <Train className='w-8 h-8 text-(--brand-accent)' />
            </div>
            <h3 className='font-headline font-semibold text-(length:--text-body) text-luxury-text-inverse mb-0'>ÖPNV perfekt</h3>
            <p className='font-body text-luxury-text-inverse/70 text-(length:--text-sm) leading-(--line-height-normal)'>
              U-Bahn/S-Bahn Marienplatz (U1-U5, S1-S8) – Direkt vor unserer Tür
            </p>
          </div>

          {/* City Center */}
          <div className='text-center flex flex-col h-full'>
            <div className="w-16 bg-luxury-text-inverse/5 rounded-full flex flex-col items-center justify-center mx-auto mb-8 h-full min-h-16 max-h-16">
              <MapPin className='w-8 h-8 text-(--brand-accent)' />
            </div>
            <h3 className='font-headline font-semibold text-(length:--text-body) text-luxury-text-inverse mb-0'>Innenstadt</h3>
            <p className='font-body text-luxury-text-inverse/70 text-(length:--text-sm) leading-(--line-height-normal)'>
              Zentral in der Münchner Innenstadt – Altheimer Eck 11, 80331 München
            </p>
          </div>
        </div>

        {/* SEO-Optimized Location Description */}
        <Card variant="default" size="default" asChild>
          <div className="mt-16">
            <h3 className='font-headline text-(length:--text-h4) font-semibold text-luxury-text-inverse mb-8'>
              Tattoo Studio Innenstadt München – Die beste Lage
            </h3>
            <div className='grid md:grid-cols-2 gap-8 text-luxury-text-inverse/70'>
              <div>
                <h4 className='font-headline font-semibold text-(length:--text-body) mb-0 text-luxury-text-inverse'>Für Einheimische:</h4>
                <p className='font-body text-(length:--text-sm) leading-(--line-height-normal)'>
                  Unser Tattoo Studio in München Innenstadt ist von allen Stadtteilen perfekt erreichbar.
                  Ob aus Schwabing, Haidhausen, Neuhausen oder Sendling – die Anreise mit öffentlichen
                  Verkehrsmitteln dauert maximal 20 Minuten.
                </p>
              </div>
              <div>
                <h4 className='font-headline font-semibold text-(length:--text-body) mb-0 text-luxury-text-inverse'>Für Touristen:</h4>
                <p className='font-body text-(length:--text-sm) leading-(--line-height-normal)'>
                  Als zentral gelegenes Tattoo Studio am Marienplatz sind wir die perfekte Adresse für
                  Besucher Münchens. Kombinieren Sie Ihr Tattoo mit einem Bummel über den Viktualienmarkt
                  oder einer Tour durch die Altstadt.
                </p>
              </div>
            </div>

            {/* Keywords for SEO */}
            <div className='mt-8 pt-8 border-t border-luxury-text-inverse/10'>
              <div className='flex flex-wrap gap-0 font-body text-(length:--text-sm)'>
                <span className='bg-luxury-text-inverse/5 text-(--brand-accent) px-0 py-0 rounded-full border border-luxury-text-inverse/10'>
                  Tattoo Marienplatz
                </span>
                <span className='bg-luxury-text-inverse/5 text-(--brand-accent) px-0 py-0 rounded-full border border-luxury-text-inverse/10'>
                  Tattoo Studio Innenstadt
                </span>
                <span className='bg-luxury-text-inverse/5 text-(--brand-accent) px-0 py-0 rounded-full border border-luxury-text-inverse/10'>
                  Tattoo Zentrum München
                </span>
                <span className='bg-luxury-text-inverse/5 text-(--brand-accent) px-0 py-0 rounded-full border border-luxury-text-inverse/10'>
                  Tattoo Altheimer Eck
                </span>
                <span className='bg-luxury-text-inverse/5 text-(--brand-accent) px-0 py-0 rounded-full border border-luxury-text-inverse/10'>
                  Englischsprachiges Tattoo-Studio München
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
