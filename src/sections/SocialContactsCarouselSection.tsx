import React from 'react';
import { Facebook, Instagram, Mail, MessageSquare, Phone, type LucideIcon } from 'lucide-react';
import Container from '@/components/ui/Container';
import InfiniteLogoCarousel, {
  type InfiniteLogoCarouselItem,
} from '@/components/organisms/InfiniteLogoCarousel';
import { SOCIAL_CONTACTS, type SocialContact } from '@/constants/socialContacts';
import { useLanguage } from '@/contexts/LanguageContext';

const ICON_MAP: Record<SocialContact['icon'], LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  email: Mail,
  phone: Phone,
  whatsapp: MessageSquare,
};

const socialItems: InfiniteLogoCarouselItem[] = SOCIAL_CONTACTS.map((contact) => {
  const Icon = ICON_MAP[contact.icon];

  return {
    id: contact.id,
    name: contact.name,
    icon: <Icon className='social-carousel-icon' aria-hidden='true' />,
    url: contact.url,
    ariaLabel: contact.ariaLabel,
  };
});

export const SocialContactsCarouselSection: React.FC = () => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  return (
    <section
      className='w-full bg-luxury-bg-dark'
      aria-label={isEnglish ? 'Contact and social media' : 'Kontakt & Social Media'}
    >
      <Container className='py-16 md:py-24 lg:py-24'>
        <div className='text-center mb-16'>
          <h3 className='font-headline text-(length:--text-h2) font-bold tracking-tight leading-tight text-brand-accent'>
            {isEnglish ? 'Contact & Social Media' : 'Kontakt & Social Media'}
          </h3>
        </div>
        <InfiniteLogoCarousel
          items={socialItems}
          ariaLabel='Social media and contact carousel'
          className='social-carousel'
        />
      </Container>
    </section>
  );
};

export default SocialContactsCarouselSection;
