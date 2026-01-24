import React from 'react';
import { Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface ReviewCardProps {
  rating: number; // Out of 5
  content: string;
  author: string;
  source: string;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  rating,
  content,
  author,
  source,
  className = '',
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Star
          key={i}
          className='w-6 h-6 fill-(--accent-chrome) text-(--accent-chrome)' 
          aria-label='star'
        />,
      );
    }
    return stars;
  };

  return (
    <Card
      variant="default"
      size="default"
      className={`w-card-sm ${className}`}
      asChild
    >
      <div className='flex flex-col items-start'>
        <div className='flex mb-2 mx-8'>{renderStars()}</div>
        <div className='flex flex-col items-center self-stretch mb-8 mx-8'>
          <span className='text-luxury-text-inverse text-sm-15 w-72'>{content}</span>
        </div>
        <div className='flex items-start ml-8 gap-0'>
          <span className='text-luxury-text-inverse text-sm-15'>— {author}</span>
          {source && <span className='text-luxury-text-inverse text-sm-15 ml-0'>, {source}</span>}
        </div>
      </div>
    </Card>
  );
};

export default ReviewCard;
