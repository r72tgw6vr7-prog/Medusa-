import React from 'react';

interface ArtistDetailHeroProps {
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  specialties: string[];
  experience: string;
}

export const ArtistDetailHero: React.FC<ArtistDetailHeroProps> = ({
  name,
  title,
  bio,
  photoUrl,
  specialties,
  experience,
}) => {
  return (
    <div className='relative h-[80vh] min-h-[600px] w-full overflow-hidden'>
      {/* Background Image with Overlay */}
      <div className='absolute inset-0'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: `url(${photoUrl})` }}
        />
        <div className='absolute inset-0 bg-linear-to-t from-brand-background via-brand-background/80 to-transparent' />
      </div>

      {/* Content */}
      <div className='absolute inset-0 flex items-end'>
        <div className='max-w-[1104px] mx-auto px-8 sm:px-8 lg:px-8 w-full pb-16'>
          <div className='max-w-3xl'>
            <h1 className='text-5xl sm:text-6xl font-headline text-brand-gold mb-8'>{name}</h1>
            <p className='text-xl text-brand-white mb-8'>{title}</p>
            <p className='text-brand-chrome text-lg mb-8 leading-relaxed'>{bio}</p>

            <div className='grid grid-cols-2 gap-8'>
              <div>
                <h2 className='text-brand-gold font-headline text-lg mb-0'>Spezialisierung</h2>
                <ul className='space-y-0'>
                  {specialties.map((specialty) => (
                    <li key={specialty} className='text-brand-white'>
                      {specialty}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className='text-brand-gold font-headline text-lg mb-0'>Erfahrung</h2>
                <p className='text-brand-white'>{experience}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
