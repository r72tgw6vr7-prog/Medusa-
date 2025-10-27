import React from 'react';
import { Star } from 'lucide-react';

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
        <Star key={i} className='w-6 h-6 fill-[#D4AF37] text-[#D4AF37]' aria-label='star' />,
      );
    }
    return stars;
  };

  return (
    <div
      className={`flex flex-col items-start bg-[#222222CC] w-[340px] py-[25px] rounded-2xl border border-solid border-[#D4AF37] shadow-[0px_4px_12px_#0000004D] ${className}`}
    >
      <div className='flex mb-0.5 mx-[25px]'>{renderStars()}</div>
      <div className='flex flex-col items-center self-stretch mb-[17px] mx-[25px]'>
        <span className='text-white text-[15px] w-[280px]'>{content}</span>
      </div>
      <div className='flex items-start ml-[25px] gap-px'>
        <span className='text-white text-[15px]'>— {author}</span>
        {source && <span className='text-white text-[15px] ml-0'>, {source}</span>}
      </div>
    </div>
  );
};

export default ReviewCard;
