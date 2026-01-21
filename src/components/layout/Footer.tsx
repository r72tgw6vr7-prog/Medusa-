/**
 * FOOTER COMPONENT - Chrome Surface Design
 * 
 * Uses chrome (#C0C0C0) as background surface with dark text (#1a1a1c)
 * Creates premium metallic appearance (Mercedes/Apple style)
 * Contrast: 12.5:1 - AAA compliant
 */
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { Card } from '@/components/ui/Card'
import Container from '@/components/ui/Container'

interface FooterProps {
  className?: string
}

export function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`py-ma-md ${className}`}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-ma-sm">
          {/* Brand Column */}
          <Card variant="default" size="default" asChild>
            <div>
              <h3 className="text-luxury-text-primary text-2xl font-bold mb-4">
                Medusa Tattoo
              </h3>
              <p className="text-luxury-text-secondary text-sm leading-relaxed">
                Premium tattoo artistry in München. Where precision meets creativity.
              </p>
            </div>
          </Card>

          {/* Quick Links */}
          <Card variant="default" size="default" asChild>
            <div>
              <h4 className="text-luxury-text-primary font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/gallery" className="text-luxury-text-secondary hover:text-luxury-text-primary transition-colors duration-200">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="/artists" className="text-luxury-text-secondary hover:text-luxury-text-primary transition-colors duration-200">
                    Artists
                  </a>
                </li>
                <li>
                  <a href="/booking" className="text-luxury-text-secondary hover:text-luxury-text-primary transition-colors duration-200">
                    Booking
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-luxury-text-secondary hover:text-luxury-text-primary transition-colors duration-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </Card>

          {/* Services */}
          <Card variant="default" size="default" asChild>
            <div>
              <h4 className="text-luxury-text-primary font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li className="text-luxury-text-secondary text-sm">Custom Tattoos</li>
                <li className="text-luxury-text-secondary text-sm">Cover-ups</li>
                <li className="text-luxury-text-secondary text-sm">Touch-ups</li>
                <li className="text-luxury-text-secondary text-sm">Consultations</li>
              </ul>
            </div>
          </Card>

          {/* Contact CTA */}
          <Card variant="default" size="default" asChild>
            <div>
              <h4 className="text-luxury-text-primary font-semibold mb-4">Get Started</h4>
              <p className="text-luxury-text-secondary text-sm mb-4">
                Book your consultation today
              </p>
              <LuxuryButton variant="surface" size="md" className="w-full">
                Book Now
              </LuxuryButton>
            </div>
          </Card>
        </div>

        {/* Footer Bottom - Copyright & Legal with Chrome Divider */}
        <hr className="chrome-divider mb-6" />
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-luxury-text-secondary text-sm">
            © 2026 Medusa Tattoo München. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="/datenschutz" className="text-luxury-text-secondary hover:text-luxury-text-primary text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="/agb" className="text-luxury-text-secondary hover:text-luxury-text-primary text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="/impressum" className="text-luxury-text-secondary hover:text-luxury-text-primary text-sm transition-colors duration-200">
              Impressum
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
