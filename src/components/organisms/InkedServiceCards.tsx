import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Diamond } from 'lucide-react';

interface ServiceCard {
  id: string;
  icon: 'crown' | 'diamond';
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  price: string;
  ctaText: string;
  ctaHref: string;
}

interface InkedServiceCardsProps {
  services?: ServiceCard[];
}

const DEFAULT_SERVICES: ServiceCard[] = [
  {
    id: 'tattoo',
    icon: 'crown',
    title: 'TATTOO ARTISTRY',
    subtitle: 'Custom Designs',
    description: 'Transform your vision into permanent art with our skilled tattoo artists who specialize in creating unique, personalized designs.',
    features: [
      'Custom Design Consultation',
      'Professional Artists',
      'Sterile Environment',
      'Aftercare Support'
    ],
    price: 'Starting at €180',
    ctaText: 'Book Tattoo Session',
    ctaHref: '/booking?service=tattoo'
  },
  {
    id: 'piercing',
    icon: 'diamond',
    title: 'PROFESSIONAL PIERCING',
    subtitle: 'Premium Jewelry',
    description: 'Expert piercing services with high-quality jewelry and professional techniques for a safe and stylish experience.',
    features: [
      'Premium Jewelry Selection',
      'Professional Consultation',
      'Hygiene Standards',
      'Aftercare Guidance'
    ],
    price: 'Starting at €60',
    ctaText: 'Book Piercing Session',
    ctaHref: '/booking?service=piercing'
  }
];

export const InkedServiceCards: React.FC<InkedServiceCardsProps> = ({ 
  services = DEFAULT_SERVICES 
}) => {
  const getIcon = (iconType: 'crown' | 'diamond') => {
    return iconType === 'crown' ? (
      <Crown className="w-8 h-8" />
    ) : (
      <Diamond className="w-8 h-8" />
    );
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-sm text-white/60 uppercase tracking-wider font-medium mb-8">
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 uppercase tracking-wide">
            What We Offer
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Professional tattoo and piercing services with the highest standards of artistry and safety
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Service Card */}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-500 group-hover:transform group-hover:scale-105 flex flex-col h-full">
                
                {/* Header */}
                <div className="p-8 pb-0">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white mb-8 group-hover:bg-white/20 transition-colors duration-300 flex-col h-full">
                    {getIcon(service.icon)}
                  </div>

                  {/* Title */}
                  <div className="mb-8">
                    <div className="text-sm text-white/60 uppercase tracking-wider font-medium mb-0">
                      {service.subtitle}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide leading-tight">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className="px-8 pb-8">
                  <ul className="space-y-0 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-0 text-white/80">
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full flex-shrink-0 flex-col h-full" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="text-xl font-bold text-white mb-8">
                    {service.price}
                  </div>

                  {/* CTA Button */}
                  <a
                    href={service.ctaHref}
                    className="w-full bg-white text-black py-8 px-8 rounded-full font-medium text-center hover:bg-white/90 transition-colors duration-300 flex items-center justify-center gap-0 group/btn flex-col h-full"
                  >
                    {service.ctaText}
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 mb-8">
            Not sure which service is right for you?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-0 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-8 rounded-full font-medium transition-all duration-300 group"
          >
            Get Professional Consultation
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InkedServiceCards;
