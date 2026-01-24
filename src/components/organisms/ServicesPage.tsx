import React from 'react';
import { ServicesPageInteractive } from '@/components/pages/ServicesPageInteractive';
import { MainNavigation } from '@/components/molecules/MainNavigation';
import Footer from '@/components/pages/Footer';
import { RouteComponentProps } from '@/types/routes';

export interface ServicesPageProps extends RouteComponentProps {
  onBookService?: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBookService: _onBookService }) => {
  return (
    <div className='min-h-screen relative z-10 lg:pt-16 md:pt-24 max-md:pt-32'>
      <MainNavigation />
      <ServicesPageInteractive />
      <Footer />
    </div>
  );
};

export default ServicesPage;
