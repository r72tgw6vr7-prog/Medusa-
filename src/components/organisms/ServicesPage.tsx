import React from 'react';
import { ServicesPageInteractive } from '../pages/ServicesPageInteractive';
import { MainNavigation } from '../molecules/MainNavigation';
import Footer from '../Footer';

interface ServicesPageProps {
  onBookService?: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBookService: _onBookService }) => {
  return (
    <div className='min-h-screen bg-[#1A1A1A]'>
      <MainNavigation />
      <div className='nav-offset-spacer h-24 md:h-32' aria-hidden='true' />
      <ServicesPageInteractive />
      <Footer />
    </div>
  );
};

export default ServicesPage;
