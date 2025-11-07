import React from 'react';
import { Badge } from '@/components/atoms/Badge/Badge';
import { ReviewCard } from '@/components/molecules/ReviewCard';

interface Partner {
  logo: string;
  name: string;
  description?: string;
}

interface Review {
  rating: number;
  content: string;
  author: string;
  source: string;
}

interface TrustSignalsSectionProps {
  title: string;
  subtitle: string;
  partners: Partner[];
  reviews: Review[];
  badges: Array<{
    iconUrl: string;
    text: string;
  }>;
  className?: string;
}

export const TrustSignalsSection: React.FC<TrustSignalsSectionProps> = ({
  title,
  subtitle,
  partners,
  reviews,
  badges,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className='flex flex-col items-center self-stretch  py-24'>
        <div className='flex flex-col items-center w-[1334px] pb-16'>
          {/* Partners Section */}
          <div className='flex flex-col items-center w-[1064px] px-72 mb-16 gap-0.5'>
            <div className='flex flex-col items-start'>
              <span className='text-brand-gold text-[35px] font-bold'>{title}</span>
            </div>
            <div className='flex flex-col items-start'>
              <span className='text-white text-[15px]'>{subtitle}</span>
            </div>
          </div>

          {/* Partner Logos */}
          <div className='flex items-start self-stretch mb-32 justify-between'>
            {partners.map((partner, index) => (
              <div key={index} className='flex flex-col items-center'>
                <img src={partner.logo} alt={partner.name} className='h-36 object-contain' />
                {partner.description && (
                  <span className='text-brand-gold text-[25px] mt-0'>{partner.description}</span>
                )}
              </div>
            ))}
          </div>

          {/* Reviews Section */}
          <div className='flex flex-col items-center self-stretch px-80 mx-8 gap-8'>
            <div className='flex flex-col items-start'>
              <span className='text-brand-gold text-[35px] font-bold'>Was Kunden sagen</span>
            </div>

            {/* Reviews Grid */}
            <div className='flex items-start gap-8'>
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  rating={review.rating}
                  content={review.content}
                  author={review.author}
                  source={review.source}
                />
              ))}
            </div>

            {/* Pagination Dots */}
            <div className='flex items-start'>
              {[true, false, false].map((isActive, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded ${
                    isActive ? 'bg-brand-gold' : 'bg-gray-600'
                  } ${index !== 2 ? 'mr-2' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className='flex flex-wrap justify-center gap-8 mt-16'>
            {badges.map((badge, index) => (
              <Badge key={index} iconUrl={badge.iconUrl} text={badge.text} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignalsSection;
